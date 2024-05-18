FROM --platform=linux/amd64 node:18-bullseye-slim as builder
WORKDIR /app

COPY . .
COPY ../shared/ ../shared/

RUN npm install
RUN npm run build

FROM --platform=linux/amd64 node:18-bullseye-slim as server
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist/ ./dist/

RUN chown -R node:node /app

USER node
RUN npm ci --only=production

EXPOSE 8000
CMD ["dumb-init", "node", "dist/server.js"]
