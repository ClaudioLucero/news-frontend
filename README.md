# News Frontend

Este proyecto es la aplicación frontend para gestionar y visualizar noticias. Está construida con **React** y se conecta a la API backend para obtener y gestionar datos de noticias.

## Requisitos

- Node.js v19.9.0
- npm o Yarn
- (Opcional) Docker para ejecutar la aplicación junto con el backend

## Librerías

Este proyecto utiliza las siguientes librerías:

- **React** v18.3.1
- **@mui/material** v6.1.4
- **Axios** v1.7.7
- **Prop-Types** v15.8.1
- **@emotion/react** v11.13.3
- **@emotion/styled** v11.13.0
- **Sass** v1.79.5

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ClaudioLucero/news-frontend.git
   ```

### 2. Configurar el archivo `.env`

```bash│
PORT=3001
REACT_APP_API_NEWS=http://localhost:3000/api
REACT_APP_NEWS_CATEGORIES=Technology,Health,Sports,Entertainment
REACT_APP_API_KEY=abc123xyz
```

### 3. Ejecución Modo local

npm install
npm start

## Estructura del Proyecto

```bash│
├── public/          # Archivos estáticos y el HTML principal
├── src/             # Código fuente de la aplicación
│   ├── components/  # Componentes reutilizables
│   ├── context/     # Estado Global
|   ├── styles/      # Estilos
│   ├── App.js       # Componente principal de la aplicación
│   ├── index.js     # Punto de entrada de la aplicación
└── package.json     # Dependencias del proyecto

```

## Ejecución con Docker

Si el backend se está ejecutando en Docker, asegúrate de que esté configurado correctamente y en funcionamiento. La aplicación frontend podrá comunicarse con el backend a través de la URL especificada en el archivo .env.

Para ejecutar ambos servicios (frontend y backend) con Docker, usa el siguiente comando en el directorio del backend:

```bash│
docker-compose up --build

```

## Uso

Al iniciar la aplicación, se conectará automáticamente a la API backend y podrá gestionar las noticias disponibles.

## Prueba de la Aplicación

Visita http://localhost:3001 en tu navegador para interactuar con la aplicación y ver las noticias gestionadas a través de la API.

## Decisiones de Diseño

-Uso de Context API: Se eligió la Context API para manejar el estado global de la aplicación, lo cual es ideal para una aplicación pequeña. Esto facilita la gestión de componentes como snacks y loaders.

-Diseño Visual: Se optó por implementar un diseño en formato de cards con imágenes y más campos, creando un sitio visualmente atractivo y mejorando la experiencia del usuario.

-Modo Nocturno: Se aprovechó la oportunidad para incluir un modo nocturno, un elemento que siempre había querido implementar, ofreciendo a los usuarios una opción más cómoda para la lectura en entornos oscuros.

## Versión 2

- Utilización clave API: REACT_APP_API_KEY=abc123xyz
- Implementación de paginación.
- Implementación de filtros: Por categorías y más recientes/más antiguos.
- Framer Motion: Para mostrar formulario.
- Testing de componentes.

Desplegado en Vercel:
https://news-frontend-alpha.vercel.app/

## Consideraciones a Mejorar para una V3

- Testing más profundo.
- -Ver con mas profundidad el comportamiento de las paginas cuando se aplican filtros y aplicar soluciones correspondientes.
- Mejorar cómo se está usando el loader y llamando desde varios componentes.
- Optimizar rendimiento.
- Llamados a la API cuando realmente sea necesario en relación al paginador, evaluar uso de react-cache.
- Implementar un buscador por títulos.
