FROM oven/bun:1 AS base
WORKDIR /app

COPY package*.json ./
RUN bun install
COPY . .
ARG PUBLIC_PB_URL
ENV PUBLIC_PB_URL=$PUBLIC_PB_URL
RUN bun --bun run build

FROM oven/bun:1
WORKDIR /app
COPY --from=base /app/build build/

COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "bun", "./build/index.js" ]