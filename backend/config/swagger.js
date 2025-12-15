const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Reservas de Biblioteca',
      version: '1.0.0',
      description: 'API RESTful para gestionar reservas de salas en una biblioteca. Permite a los usuarios registrarse, iniciar sesión, consultar disponibilidad de salas y realizar reservas.',
      license: {
        name: 'ISC',
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingrese el token JWT obtenido al iniciar sesión'
        }
      },
      schemas: {
        Usuario: {
          type: 'object',
          required: ['nombre', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'ID auto-generado del usuario'
            },
            nombre: {
              type: 'string',
              description: 'Nombre completo del usuario',
              example: 'Daniel Guaman'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario (único)',
              example: 'adguaman4@espe.edu.ec'
            },
            password: {
              type: 'string',
              format: 'password',
              minLength: 6,
              description: 'Contraseña del usuario (mínimo 6 caracteres)',
              example: 'usuario123'
            },
            rol: {
              type: 'string',
              enum: ['usuario', 'admin'],
              default: 'usuario',
              description: 'Rol del usuario en el sistema'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del usuario'
            }
          }
        },
        Sala: {
          type: 'object',
          required: ['nombre', 'capacidad', 'ubicacion'],
          properties: {
            id: {
              type: 'string',
              description: 'ID auto-generado de la sala'
            },
            nombre: {
              type: 'string',
              description: 'Nombre de la sala',
              example: 'Sala de Estudio 1'
            },
            capacidad: {
              type: 'number',
              minimum: 1,
              description: 'Capacidad máxima de personas',
              example: 6
            },
            ubicacion: {
              type: 'string',
              description: 'Ubicación física de la sala',
              example: 'Piso 1, Ala Norte'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción de la sala',
              example: 'Sala tranquila ideal para estudio en grupo'
            },
            equipamiento: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Lista de equipamiento disponible',
              example: ['Pizarra', 'Proyector', 'WiFi']
            },
            disponible: {
              type: 'boolean',
              default: true,
              description: 'Indica si la sala está disponible para reservas'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación de la sala'
            }
          }
        },
        Reserva: {
          type: 'object',
          required: ['sala', 'fechaInicio', 'fechaFin'],
          properties: {
            id: {
              type: 'string',
              description: 'ID auto-generado de la reserva'
            },
            usuario: {
              type: 'string',
              description: 'ID del usuario que realiza la reserva'
            },
            sala: {
              type: 'string',
              description: 'ID de la sala reservada'
            },
            fechaInicio: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de inicio de la reserva',
              example: '2025-12-15T10:00:00'
            },
            fechaFin: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de fin de la reserva',
              example: '2025-12-15T12:00:00'
            },
            estado: {
              type: 'string',
              enum: ['pendiente', 'confirmada', 'cancelada'],
              default: 'confirmada',
              description: 'Estado actual de la reserva'
            },
            motivo: {
              type: 'string',
              description: 'Motivo o propósito de la reserva',
              example: 'Estudio en grupo'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación de la reserva'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Mensaje de error'
            },
            error: {
              type: 'string',
              example: 'Detalles del error'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Autenticación',
        description: 'Endpoints para registro y autenticación de usuarios'
      },
      {
        name: 'Salas',
        description: 'Gestión de salas de la biblioteca'
      },
      {
        name: 'Reservas',
        description: 'Gestión de reservas de salas'
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
