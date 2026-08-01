# ---- build ----
FROM node:24-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

ARG DATABASE_URL=postgresql://user:pass@localhost:5432/db?schema=public
ENV DATABASE_URL=$DATABASE_URL

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

# ---- production ----
FROM node:22-alpine AS production

RUN apk add --no-cache openssl

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

ARG DATABASE_URL=postgresql://user:pass@localhost:5432/db?schema=public
ENV DATABASE_URL=$DATABASE_URL

RUN npm ci --omit=dev \
  && npx prisma generate \
  && npm cache clean --force

COPY --from=builder /app/dist ./dist

ENV DATABASE_URL=

USER node

EXPOSE 8080

CMD ["node", "dist/main.js"]
