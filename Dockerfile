# ====================
# Build Stage
# ====================
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# ====================
# Run Stage
# ====================
FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

# standalone app
COPY --from=builder /app/.next/standalone ./

# static files
COPY --from=builder /app/.next/static ./.next/static

# public files
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]