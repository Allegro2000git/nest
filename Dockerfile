FROM node:20-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN PNPM_CONFIG_STRICT_DEP_BUILDS=false pnpm install

COPY . .

CMD ["pnpm", "run", "start:dev"]
