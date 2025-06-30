# Usa una imagen base oficial de Node.js (ajusta la versión si es necesario)
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que corre la app (ajusta si es necesario)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]