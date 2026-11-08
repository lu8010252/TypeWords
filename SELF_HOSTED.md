# 自建版说明(多孩子同步 + AI 加词)

在上游 TypeWords 基础上增加:

- **多设备同步**:自带服务端,不再依赖 Supabase。每个孩子一个「档案」,进度互不影响,多台设备填同一个档案密钥即可共用。
- **AI 加词**:左侧「AI 加词」页。说一个主题,或粘贴单词/英文,AI 生成单词卡、逐句练习的文章/句子集,一键加入自己的词典。AI 由服务端代理,密钥不会出现在浏览器里。

## 部署

```bash
mkdir typewords && cd typewords
# 把本仓库的 docker-compose.yml 放进来,改好 ADMIN_TOKEN 和 AI_* 三项
docker compose up -d
```

默认端口 8040,数据在 `./data`(备份这个目录即可)。镜像:`ghcr.io/lu8010252/typewords:latest`(amd64 / arm64)。

| 环境变量 | 说明 |
| --- | --- |
| `ADMIN_TOKEN` | 管理口令,用于 `/admin` 创建档案。不设置则无法创建档案 |
| `AI_BASE_URL` / `AI_API_KEY` / `AI_MODEL` | OpenAI 兼容接口(`{AI_BASE_URL}/chat/completions`)。不设置则 AI 加词不可用 |
| `PORT` / `DATA_DIR` | 默认 3000 / `/data` |

## 使用

1. 打开 `http://服务器:8040/admin`,输入管理口令,为每个孩子创建档案,得到「档案密钥」。
2. 每台设备打开站点 → 设置 → 数据同步,服务器地址默认是当前网站,填档案密钥,保存。也可以直接打开 `http://服务器:8040/setting?key=档案密钥` 自动带入。
3. 第一台设备选「本地推送」,其余设备选「拉取远程」。之后各设备自动同步。
4. 「AI 加词」页需要先完成第 2 步(用档案密钥验证身份)。

> 注意:同一个档案不要在两台设备上同时练习,后写入的会覆盖先写入的。
> 密钥泄露可在 `/admin` 「换新密钥」。删除档案不会删磁盘数据,在 `data/profiles/` 下手动清理。

## 与上游的差异(便于合并上游更新)

`app/core/utils/syncClient.ts`(新增,仿 supabase 接口的客户端)、`app/core/utils/supabase.ts`、`app/core/composables/useDataSyncPersistence.ts`、`app/pages/setting.vue`、`app/pages/ai.vue`(新增)、`app/layouts/default.vue`(导航入口)、`server/`(新增)。
