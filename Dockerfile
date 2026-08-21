FROM node:20-slim AS build
WORKDIR /app
COPY wallet-app/package*.json ./wallet-app/
RUN cd wallet-app && npm ci
COPY wallet-app/ ./wallet-app/
RUN cd wallet-app && npm run build

FROM node:20-slim
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
RUN groupadd -r app && useradd -r -g app app
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm ci && npm rebuild sqlite3 --build-from-source
COPY server/ ./server/
COPY --from=build /app/wallet-app/dist ./server/dist
RUN chown -R app:app /app
USER app
WORKDIR /app/server
RUN node seed.js
ENV NODE_ENV=production
ENV TZ=Asia/Beirut
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD node -e "const p=process.env.PORT||3000;fetch('http://localhost:'+p).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "index.js"]
