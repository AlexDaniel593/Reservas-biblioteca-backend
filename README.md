# Sistema de Gestión de Reservas de Biblioteca

Backend para una aplicación web de gestión de reservas de salas de biblioteca.

## 🚀 Tecnologías

- Node.js
- Express.js
- MongoDB
- Docker & Docker Compose
- JWT para autenticación

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- Docker y Docker Compose
- npm o yarn

## ⚙️ Instalación

1. Clonar el repositorio

2. Iniciar MongoDB con Docker:
```bash
docker-compose up -d
```

3. navegar a la carpeta backend
```bash
cd backend
```

4. Instalar dependencias:
```bash
npm install
```

5. Configurar variables de entorno:
```bash
cp .env.example .env
```

6. Cargar datos de prueba
```bash
node data/seed.js -i
```

6. Iniciar el servidor:
```bash
# Desarrollo
npm run dev
```

## 🐳 Docker

El archivo `docker-compose.yml` incluye:
- **MongoDB**: Base de datos en puerto 27017

### Comandos Docker útiles:

```bash
# Iniciar contenedores
docker-compose up -d

# Detener contenedores
docker-compose down

# Ver logs
docker-compose logs -f

# Detener y eliminar volúmenes (⚠️ elimina datos)
docker-compose down -v
```

## 📡 Endpoints API

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual (requiere token)

### Salas
- `GET /api/salas` - Listar todas las salas
- `GET /api/salas/:id` - Obtener sala por ID
- `POST /api/salas` - Crear sala (admin)
- `PUT /api/salas/:id` - Actualizar sala (admin)
- `DELETE /api/salas/:id` - Eliminar sala (admin)
- `GET /api/salas/:id/disponibilidad` - Consultar disponibilidad

### Reservas
- `GET /api/reservas` - Listar mis reservas
- `GET /api/reservas/:id` - Obtener reserva por ID
- `POST /api/reservas` - Crear nueva reserva
- `DELETE /api/reservas/:id` - Cancelar reserva

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens). Para acceder a rutas protegidas, incluye el token en el header:

```
Authorization: Bearer <token>
```

## 📊 Modelos de Datos

### Usuario
- nombre
- email (único)
- password (encriptado)
- rol (usuario/admin)

### Sala
- nombre
- capacidad
- ubicacion
- descripcion
- equipamiento
- disponible

### Reserva
- usuario
- sala
- fechaInicio
- fechaFin
- estado (pendiente/confirmada/cancelada)

## 🌐 Variables de Entorno

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/biblioteca
JWT_SECRET=biblioteca_secret_key_2025
JWT_EXPIRE=7d
NODE_ENV=development
```

## 📝 Notas

- El puerto por defecto es 5000
- MongoDB corre en el puerto 27017
- La documentacion de la API con Swagger http://localhost:5000/api-docs
