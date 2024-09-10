# Reservify Frontend

Este es el frontend del sistema de reservas Reservify, construido con Angular y Tailwind CSS.

## Tecnologías Utilizadas

- **Angular**
- **Tailwind CSS**
- **TypeScript**

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Neider-Urbano/reservify-frontend
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd reservify-frontend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura las variables de entorno. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

   ```bash
    export const environment = {
        production: false,
        API_URL: 'http://localhost:3000/api',
    };
   ```

5. Construye el proyecto:

   ```bash
   npm run build
   ```

6. Inicia el projecto:

   ```bash
   npm run start
   ```

## Despliegue

Puedes ver el despliegue en producción del frontend en el siguiente enlace:

[Reservify Frontend - Vercel](https://reservify-frontend.vercel.app/)

## Backend

El repositorio del backend para el sistema de reservas está disponible aquí: [Reservify Backend](https://github.com/Neider-Urbano/reservify-backend.git)

# Diagrama de Arquitectura de Reservify

Este diagrama ilustra la arquitectura del sistema Reservify, que incluye el frontend, el backend, y la base de datos.

```plaintext
+--------------------+
|    Frontend        |
|--------------------|
| Angular            |
| Tailwind CSS       |
|                    |
|  +--------------+  |
|  | Interfaz de  |  |
|  | Usuario      |  |
|  |              |  |
|  | +----------+ |  |
|  | | Servicio | |  |
|  | +----------+ |  |
|  +--------------+  |
+---------+----------+
          |
          |
          v
+--------------------+   HTTP Requests   +--------------------+
|     Backend        | <--------------> |   Base de Datos    |
|--------------------|                  |--------------------|
| Node.js            |                  | MongoDB            |
| Express            |                  |                    |
| TypeScript         |                  |                    |
|                    |                  |                    |
|  +--------------+  |                  |                    |
|  | API REST     |  |                  |                    |
|  | (Controllers,|  |                  |                    |
|  |  Services)   |  |                  |                    |
|  +--------------+  |                  |                    |
|                    |                  |                    |
|  +--------------+  |                  |                    |
|  | Auth          | |                  |                    |
|  | (JWT)         | |                  |                    |
|  +--------------+  |                  |                    |
|                    |                  |                    |
|  +--------------+  |                  |                    |
|  | Swagger       | |                  |                    |
|  | Documentation | |                  |                    |
|  +--------------+  |                  |                    |
+--------------------+                  +--------------------+
```
