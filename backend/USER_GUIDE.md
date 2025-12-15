# 📖 Guía de Uso - Sistema de Gestión de Reservas de Biblioteca

Esta guía te ayudará a utilizar la API de gestión de reservas paso a paso.

## 🔷 Opción 1: Usar Swagger

1. Abre tu navegador en:

http://localhost:5000/api-docs

2. Iniciar Sesión:
Busca el endpoint POST /api/auth/login
Haz clic en "Try it out"
Usa estas credenciales:

```json
{"email": "adguaman4@espe.edu.ec",  "password": "admin123"}
```

Haz clic en "Execute"
Copia el token de la respuesta

3. Autenticarte:
Haz clic en el botón "Authorize"
Pega el token en el campo
Haz clic en "Authorize"

4. Probar Endpoints:
Ahora puedes probar cualquier endpoint:

Ver todas las salas:
GET /api/salas 

Crear una reserva:
POST /api/reservas 

Ver mis reservas:
GET /api/reservas 

## 🔷 Opción 2: Usar Postman

1. **Obtener el Token:**

**Request:**
- Método: `POST`
- URL: `http://localhost:5000/api/auth/login`
- Headers:
  ```
  Content-Type: application/json
  ```
- Body (raw JSON):
  ```json
  {
    "email": "adguaman4@espe.edu.ec",
    "password": "admin123"
  }
  ```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "...",
    "nombre": "Daniel Guaman",
    "email": "adguaman4@espe.edu.ec",
    "rol": "admin"
  }
}
```

### 2. **Configurar Autorización:**

**En cada Request:**
- Ve a la pestaña **"Headers"**
- Agrega:
  ```
  Key: Authorization
  Value: Bearer TU_TOKEN_AQUI
  ```