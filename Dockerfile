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

COPY --from=builder /app ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]