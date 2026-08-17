FROM node:20 AS build
WORKDIR /app
COPY wallet-app/package*.json ./wallet-app/
RUN cd wallet-app && npm ci
COPY wallet-app/ ./wallet-app/
RUN cd wallet-app && npm run build

FROM node:20
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm ci && npm rebuild sqlite3 --build-from-source
COPY server/ ./server/
COPY --from=build /app/wallet-app/dist ./server/dist
WORKDIR /app/server
RUN node seed.js
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "index.js"]
