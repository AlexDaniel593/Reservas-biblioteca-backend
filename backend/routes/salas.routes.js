const express = require('express');
const router = express.Router();
const {
  getSalas,
  getSala,
  createSala,
  updateSala,
  deleteSala,
  checkDisponibilidad
} = require('../controllers/salas.controller');
const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /api/salas:
 *   get:
 *     summary: Obtener todas las salas
 *     tags: [Salas]
 *     responses:
 *       200:
 *         description: Lista de todas las salas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sala'
 */
router.get('/', getSalas);

/**
 * @swagger
 * /api/salas/{id}:
 *   get:
 *     summary: Obtener una sala por ID
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala
 *     responses:
 *       200:
 *         description: Información de la sala
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Sala'
 *       404:
 *         description: Sala no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getSala);

/**
 * @swagger
 * /api/salas/{id}/disponibilidad:
 *   get:
 *     summary: Consultar disponibilidad de una sala
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala
 *       - in: query
 *         name: fechaInicio
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha y hora de inicio
 *         example: 2025-12-15T10:00:00
 *       - in: query
 *         name: fechaFin
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha y hora de fin
 *         example: 2025-12-15T12:00:00
 *     responses:
 *       200:
 *         description: Disponibilidad de la sala
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     sala:
 *                       type: string
 *                       example: Sala de Estudio 1
 *                     disponible:
 *                       type: boolean
 *                       example: true
 *                     reservasConflictivas:
 *                       type: number
 *                       example: 0
 *                     reservas:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Parámetros faltantes
 *       404:
 *         description: Sala no encontrada
 */
router.get('/:id/disponibilidad', checkDisponibilidad);

/**
 * @swagger
 * /api/salas:
 *   post:
 *     summary: Crear una nueva sala (Admin)
 *     tags: [Salas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - capacidad
 *               - ubicacion
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Sala Multimedia
 *               capacidad:
 *                 type: number
 *                 example: 20
 *               ubicacion:
 *                 type: string
 *                 example: Piso 1, Ala Oeste
 *               descripcion:
 *                 type: string
 *                 example: Sala equipada con tecnología multimedia
 *               equipamiento:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Computadoras, Proyector, WiFi]
 *               disponible:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Sala creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Sala'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado (solo admin)
 */
router.post('/', protect, authorize('admin'), createSala);

/**
 * @swagger
 * /api/salas/{id}:
 *   put:
 *     summary: Actualizar una sala (Admin)
 *     tags: [Salas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sala'
 *     responses:
 *       200:
 *         description: Sala actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Sala'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado (solo admin)
 *       404:
 *         description: Sala no encontrada
 */
router.put('/:id', protect, authorize('admin'), updateSala);

/**
 * @swagger
 * /api/salas/{id}:
 *   delete:
 *     summary: Eliminar una sala (Admin)
 *     tags: [Salas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala
 *     responses:
 *       200:
 *         description: Sala eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sala eliminada correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado (solo admin)
 *       404:
 *         description: Sala no encontrada
 */
router.delete('/:id', protect, authorize('admin'), deleteSala);

module.exports = router;
