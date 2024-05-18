FROM --platform=linux/amd64 node:18-bullseye-slim as builder
WORKDIR /app

COPY shared shared
COPY backend backend

RUN cd backend && npm install
RUN cd backend && npm run build

FROM --platform=linux/amd64 node:18-bullseye-slim as server
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/backend/package.json /app/backend/package-lock.json ./
COPY --from=builder /app/backend/dist/ ./dist/

RUN mkdir -p /app/db
RUN chown -R node:node /app

USER node
RUN npm ci --only=production --omit=dev

EXPOSE 8000
CMD ["dumb-init", "node", "dist/server.js"]
