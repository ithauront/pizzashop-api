# Etapa de build
FROM oven/bun:1.1.13 as build

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

# Etapa final
FROM oven/bun:1.1.13

WORKDIR /app

COPY --from=build /app .

ENV NODE_ENV=production

CMD ["bun", "src/http/server.ts"]
