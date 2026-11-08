# ---- 构建前端静态文件 ----
FROM node:22-alpine AS build
WORKDIR /src
RUN npm i -g pnpm@10.28.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# 补充人教版 PEP 小学（三年级起点）词库：三年级上 ~ 六年级下
RUN node scripts/fetch-pep-dicts.mjs
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN pnpm run generate

# ---- 运行:静态站点 + 同步/AI 服务(零依赖 Node 服务) ----
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 DATA_DIR=/data STATIC_DIR=/app/public
COPY --from=build /src/.output/public /app/public
COPY server /app/server
VOLUME /data
EXPOSE 3000
CMD ["node", "server/server.mjs"]
