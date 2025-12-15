const express = require('express');
const router = express.Router();
const {
  getReservas,
  getReserva,
  createReserva,
  cancelReserva
} = require('../controllers/reservas.controller');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtener todas las reservas del usuario (o todas si es admin)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
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
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: No autorizado
 */
router.get('/', protect, getReservas);

/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Información de la reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No autorizado para ver esta reserva
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', protect, getReserva);

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sala
 *               - fechaInicio
 *               - fechaFin
 *             properties:
 *               sala:
 *                 type: string
 *                 description: ID de la sala a reservar
 *                 example: 507f1f77bcf86cd799439011
 *               fechaInicio:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-12-15T10:00:00
 *               fechaFin:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-12-15T12:00:00
 *               motivo:
 *                 type: string
 *                 example: Estudio en grupo
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Error de validación (sala no disponible, fechas inválidas, etc.)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Sala no encontrada
 */
router.post('/', protect, createReserva);

/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Cancelar una reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva cancelada exitosamente
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
 *                   example: Reserva cancelada correctamente
 *                 data:
 *                   $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No autorizado para cancelar esta reserva
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/:id', protect, cancelReserva);

module.exports = router;
