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
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD node -e "const p=process.env.PORT||3000;fetch('http://localhost:'+p).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "index.js"]
