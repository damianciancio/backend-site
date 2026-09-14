FROM node:24 as build

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:24

COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
RUN pnpm install --prod
COPY --from=build /app/dist ./dist

CMD ["node", "dist/server.js"]