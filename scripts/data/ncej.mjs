import { ncej1aWords } from "./ncej-1a.mjs"
import { ncej1bWords } from "./ncej-1b.mjs"
// 新概念英语青少版 1A / 1B 生词与例句（按课次整理，非官方数据，个别词条可能与教材略有出入）
// 每条：[单词, 英音, 美音, 词性, 中文释义, 例句, 例句翻译]
export const ncejBooks = [
  {
    name: "新概念英语青少版 1A",
    enName: "ncej-1a",
    url: "NCEJ_1A.json",
    description: "新概念英语青少版 1A 全册词汇（按教材顺序），含音标、释义与例句。",
    lessons: [
      { title: "1A 全册词汇", cn: "按教材出现顺序", words: ncej1aWords },
    ],
  },
  {
    name: "新概念英语青少版 1B",
    enName: "ncej-1b",
    url: "NCEJ_1B.json",
    description: "新概念英语青少版 1B 全册词汇（按教材顺序），含音标、释义与例句。",
    lessons: [
      { title: "1B 全册词汇", cn: "按教材出现顺序", words: ncej1bWords },
    ],
  },
]
