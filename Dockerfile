# Etapa 1: Build
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias y los instala
COPY package*.json ./
RUN npm install

# Copia todo el proyecto al contenedor
COPY . .

# Construye la app de Next.js
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine AS runner

# Establece el directorio de trabajo
WORKDIR /app

# Establece el entorno de producción
ENV NODE_ENV=production

# Copia solo lo necesario desde el builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/ ./src/

# Expone el puerto por defecto de Next.js
EXPOSE 3000

# Comando de arranque
CMD ["npm", "start"]
