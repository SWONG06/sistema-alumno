# Etapa 1: Construcción
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . . 
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src  # ✅ NECESARIO si usas App Router y src/

EXPOSE 3000

CMD ["npm", "start"]
