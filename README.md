# LyEP2026-Grupo18

Panel de Control de Clientes: frontend en React + Vite, backend propio en Node.js + Express, y base de datos Firestore (Firebase).

## Arquitectura

El frontend (`client/`, puerto 5173) consume una API REST propia (`server/`, puerto 3001), que lee y escribe en Cloud Firestore a través de `firebase-admin`. Antes, el frontend consumía la API pública de prueba FakeStoreAPI; ahora todos los datos de clientes persisten en nuestra propia base.