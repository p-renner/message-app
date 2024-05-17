FROM --platform=linux/amd64 node:18-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
RUN npm install -g pnpm
ENV NODE_ENV=production

WORKDIR /app

COPY dist/server.js ./server.js
COPY package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY chat.db ./chat.db

RUN chown -R node:node /app

USER node
RUN pnpm install --frozen-lockfile --prod

EXPOSE 8000
CMD ["dumb-init", "node", "server.js"]
