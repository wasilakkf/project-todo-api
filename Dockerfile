FROM node:18-alpine

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm build

CMD ["pnpm", "run", "dev"]