# LyEP2026-Grupo18

Panel de Control de Clientes: frontend en React + Vite, backend propio en Node.js + Express, y base de datos Firestore (Firebase).

## Arquitectura

El frontend (client/, puerto 5173) consume una API REST propia (server/, puerto 3001), que lee y escribe en Cloud Firestore a través de firebase-admin. Antes, el frontend consumía la API pública de prueba FakeStoreAPI; ahora todos los datos de clientes persisten en nuestra propia base.

Diagrama:

client (React + Vite, :5173)
   |  HTTP (axios)
   v
server (Node + Express, :3001)  ->  /api/clientes
   |  firebase-admin
   v
Firestore (coleccion "clientes")

## Requisitos

- Node.js 20 o superior
- Un proyecto de Firebase con Firestore habilitado y su clave de cuenta de servicio (serviceAccountKey.json)

## Instalación y ejecución

### Backend

cd server
npm install
npm run seed
npm run dev

Queda escuchando en http://localhost:3001

### Frontend

En otra terminal:

cd client
npm install
npm run dev

Queda escuchando en http://localhost:5173

## Configuración

- server/serviceAccountKey.json: la clave de la cuenta de servicio de Firebase. Nunca se sube al repositorio (está en .gitignore). Se comparte entre el equipo por un medio privado.
- client/.env (opcional): permite apuntar el frontend a otra dirección del backend, por ejemplo al correr dentro de un Codespace:

VITE_API_URL=https://TU-CODESPACE-3001.app.github.dev/api/clientes

Si no se define, el frontend usa http://localhost:3001/api/clientes por defecto.

## Endpoints de la API

| Método | Ruta | Qué hace |
|--------|------|----------|
| GET | /api/clientes | Lista todos los clientes |
| GET | /api/clientes/:id | Devuelve un cliente |
| POST | /api/clientes | Crea un cliente (responde 201) |
| PUT | /api/clientes/:id | Actualiza un cliente |
| DELETE | /api/clientes/:id | Elimina un cliente |

## Capturas de pantalla

Ver las capturas adjuntas en la descripción del Pull Request #4.

## Integrantes y ramas

| Integrante | Parte | Rama |
|---|---|---|
| Lucas Gaspar | Parte 3 — Conexión a Firestore | feature/firestore-gaspar-lucas |
| Agustín Parraga | Parte 4 — API REST de clientes | feature/api-clientes-parraga-agustin |
| Luis Vilca | Parte 5 — Integración del frontend y documentación | feature/integracion-docs-vilca-luis |