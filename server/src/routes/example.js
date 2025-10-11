import express from 'express';
const router = express.Router();

// /users
 /**
 * @openapi
 * /users:
 *   post:
 *     summary: Register a new user account
 *     description: Creates a new user in the system.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: newuser@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               isAdmin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid input or user already exists
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users. Typically restricted to admins.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 550e8400-e29b-41d4-a716-446655440000
 *                   email:
 *                     type: string
 *                     example: user@example.com
 *                   isAdmin:
 *                     type: boolean
 *                     example: false
 *       403:
 *         description: Forbidden — only admins can access this route
 */

// /users/{id}
/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves detailed information about a specific user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the user
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 550e8400-e29b-41d4-a716-446655440000
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 isAdmin:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: User not found
 *
 *   put:
 *     summary: Update a user's details
 *     description: Updates the email, password, or admin status of a user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               isAdmin:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User successfully updated
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Delete a user
 *     description: Permanently removes a user from the system.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

// /photo-zones
/**
 * @openapi
 * /photo-zones:
 *   get:
 *     summary: Get a list of all Lumio photo zones
 *     tags:
 *       - Photo zones
 *     responses:
 *       200:
 *         description: List of available photo zones
 */

// /photo-zones/{id}
/**
 * @openapi
 * /photo-zones/{id}:
 *   get:
 *     summary: Get details of a specific photo zone
 *     tags:
 *       - Photo zones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Photo zone details
 *       404:
 *         description: Photo zone not found
 */

// /reservations
/**
 * @openapi
 * /reservations:
 *   get:
 *     summary: Get all reservations for the logged-in user
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: List of reservations
 *   post:
 *     summary: Create a new reservation (user only)
 *     tags:
 *       - Reservations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               locationId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *                 format: time
 *               endTime:
 *                 type: string
 *                 format: time
 *     responses:
 *       201:
 *         description: Reservation created
 */

// /reservations/{id}
/**
 * @openapi
 * /reservations/{id}:
 *   get:
 *     summary: Get details of a reservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation details
 *       404:
 *         description: Reservation not found
 *   delete:
 *     summary: Cancel a reservation (user only)
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Reservation cancelled
 *       404:
 *         description: Reservation not found
 */

export default router;