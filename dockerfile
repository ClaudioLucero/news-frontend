# Etapa de construcción (build)
FROM node:19 AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa de producción (sirviendo la app con Nginx)
FROM nginx:alpine

# Copia los archivos generados durante el build de React a Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto en el que Nginx servirá la app
EXPOSE 80

# Inicia Nginx para servir la aplicación
CMD ["nginx", "-g", "daemon off;"]
