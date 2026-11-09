#!/usr/bin/env python3
"""把 lilinji/English 仓库的词书 Excel 转成本项目用的 JSON（scripts/data/vocab/）。
用法：python3 scripts/tools/xlsx_to_vocab.py <lilinji/English 仓库根目录>
Excel 格式：单词 | 英音 | 美音 | 释义（多行，每行「词性. 中文」）。
词表来源：https://github.com/lilinji/English （CC BY-NC-SA 4.0，仅限非商业使用，改编需同样方式共享）。
"""
import json, re, sys, pathlib, openpyxl

SRC = pathlib.Path(sys.argv[1])
OUT = pathlib.Path(__file__).resolve().parent.parent / 'data' / 'vocab'
PEP_DIR = SRC / '1.全国各大教材版本中小学同步' / '人教版'
NCE_DIR = SRC / '8.新概念英语'

OTHER_DIR = SRC / '9.其他（更多）'
# (输出文件名, 源文件, 书名, 英文名, 类型, 词典 id, 标签)
BOOKS = []
for g, gn in [(3, '三'), (4, '四'), (5, '五'), (6, '六')]:
    for t, tn in [(1, '上'), (2, '下')]:
        i = (g - 3) * 2 + (t - 1)
        BOOKS.append((f'PEP3Q_{g}_{t}', PEP_DIR / f'人教版三年级起点{gn}年级{tn}.xlsx',
                      f'人教版PEP三起·{gn}年级{tn}册词表', f'pep3q-{g}-{t}', 'textbook', 420 + i, '人教版'))
# 其他出版社（三年级起点 3~6 年级）：(前缀, 文件夹, 文件名模板, id 起点)
TEXT_DIR = SRC / '1.全国各大教材版本中小学同步'
for prefix, folder, tpl, base, tag in [
    ('WY3Q', '外研版', '外研版三年级起点{gn}年级{tn}', 430, '外研版'),
    ('BSD3Q', '北师大', '北师大版三年级起点{gn}年级{tn}', 440, '北师大版'),
    ('YL3Q', '译林版', '译林版三年级起点{gn}年级{tn}', 450, '译林版'),
    ('NJSH', '牛津版', '牛津上海版{gn}年级{tn}册', 460, '牛津上海版'),
]:
    for g, gn in [(3, '三'), (4, '四'), (5, '五'), (6, '六')]:
        for t, tn in [(1, '上'), (2, '下')]:
            i = (g - 3) * 2 + (t - 1)
            label = tag + ('三起' if prefix.endswith('3Q') else '')
            BOOKS.append((f'{prefix}_{g}_{t}', TEXT_DIR / folder / (tpl.format(gn=gn, tn=tn) + '.xlsx'),
                          f'{label}·{gn}年级{tn}册词表', f'{prefix.lower()}-{g}-{t}', 'textbook', base + i, tag))
for key, label in [('入门级A', '入门级 A'), ('入门级B', '入门级 B'), ('1A', '1A'), ('1B', '1B'), ('2A', '2A'),
                   ('2B', '2B'), ('3A', '3A'), ('3B', '3B'), ('4A', '4A'), ('4B', '4B'), ('5A', '5A'), ('5B', '5B')]:
    stem = {'入门级A': '0A', '入门级B': '0B'}.get(key, key)
    ids = {'0A': 402, '0B': 403, '1A': 400, '1B': 401}
    nid = ids.get(stem) or 404 + ['2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B'].index(stem)
    BOOKS.append((f'NCEJ_{stem}', NCE_DIR / f'新概念英语青少版{key}.xlsx', f'新概念英语青少版 {label}', f'ncej-{stem.lower()}', 'ncej', nid, '新概念青少版'))
# 拓展词表（剑桥 KET、朗文常用词）
for stem, fn, name, en, did, tag in [
    ('KET_14', '14天攻克KET核心词汇', '剑桥KET核心词汇（14天攻克）', 'ket-14', 470, '剑桥KET'),
    ('KET_QJ', 'KET核心词 巧记速练', '剑桥KET核心词（巧记速练）', 'ket-qj', 471, '剑桥KET'),
    ('LW3000', '朗文3000常用交流词汇', '朗文3000常用交流词汇', 'longman-3000', 472, '朗文3000'),
]:
    BOOKS.append((stem, OTHER_DIR / f'{fn}.xlsx', name, en, 'other', did, tag))

POS_RE = re.compile(r'^([A-Za-z]+\.(?:\s*[&/]\s*[A-Za-z]+\.)*)\s*(.*)$')
MAX_LINES, MAX_SENSES = 3, 3  # 小学生用：每个词最多 3 个词性，每个词性最多 3 个义项


def ipa(s):
    """'[ˈpens(ə)l; xx]' -> 'ˈpens(ə)l'（取第一个读音）"""
    if not s:
        return ''
    s = str(s).strip().strip('[]').strip()
    return s.split(';')[0].strip()


def trans(s):
    out = []
    for line in str(s or '').split('\n'):
        line = line.strip()
        if not line:
            continue
        m = POS_RE.match(line)
        pos, cn = (m.group(1), m.group(2)) if m else ('', line)
        senses = [x.strip() for x in re.split(r'[；;]', cn) if x.strip()][:MAX_SENSES]
        if senses:
            out.append({'pos': pos, 'cn': '；'.join(senses)})
        if len(out) >= MAX_LINES:
            break
    return out


def clean_word(w):
    w = re.sub(r'\s+', ' ', str(w).strip())
    return re.sub(r'[!?,]+$', '', w).strip()


report = {}
manifest = []
for stem, path, name, en, kind, did, tag in BOOKS:
    ws = openpyxl.load_workbook(path, read_only=True).active
    rows = [r for r in ws.iter_rows(values_only=True)][1:]
    words, seen, dup, skipped = [], set(), [], []
    for r in rows:
        if not r or not r[0]:
            continue
        w = clean_word(r[0])
        t = trans(r[3] if len(r) > 3 else '')
        if not w or not t:
            skipped.append(str(r[0]))
            continue
        k = w.lower()
        if k in seen:
            # 同一个词在表里出现两次（常是不同词性/义项）：合并释义，不丢
            dup.append(w)
            cur = next(x for x in words if x['word'].lower() == k)
            for item in t:
                if len(cur['trans']) < 4 and not any(item['cn'] == y['cn'] for y in cur['trans']):
                    cur['trans'].append(item)
            continue
        seen.add(k)
        words.append({'word': w, 'phonetic0': ipa(r[1]), 'phonetic1': ipa(r[2]), 'trans': t})
    (OUT / f'{stem}.json').write_text(json.dumps({'name': name, 'enName': en, 'words': words}, ensure_ascii=False, indent=0), encoding='utf8')
    report[stem] = (len(rows), len(words), dup, skipped)
    manifest.append({'file': stem, 'id': did, 'kind': kind, 'tag': tag})
    print(f'{stem:12} {name:22} 行{len(rows):4} -> 词{len(words):4}  重复{len(dup)} 跳过{len(skipped)}  {dup[:6]} {skipped[:4]}')

(OUT / 'index.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf8')
print('合计', len(manifest), '本')
