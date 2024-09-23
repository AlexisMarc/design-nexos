# Usa una imagen base de Node.js v18
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todos los archivos del proyecto al directorio de trabajo
COPY . .

# Expone el puerto en el que correrá la aplicación (puerto 4200 en este caso)
EXPOSE 4200

# Comando por defecto para correr el proyecto Angular (desarrollo)
CMD ["npm","run","start"]
