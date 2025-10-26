import express from 'express';

const router = express.Router();

// Auth
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with email and password, returning a JWT access token.
 *     tags:
 *       - Auth
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
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MySecurePassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 accessToken:
 *                   type: string
 *                   description: JWT token valid for 1 hour
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     is_admin:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */

// Users
/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users (admin only).
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users with their reservations
 *       401:
 *         description: Unauthorized (User not logged in)
 *       403:
 *         description: Forbidden (User not admin)
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user in the system.
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
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 user:
 *                   type: object
 *       400:
 *         description: Bad request (missing or invalid data)
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 * /users/{id}:
 *   get:
 *     summary: Get a single user
 *     description: Retrieves details of a specific user by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *       400:
 *         description: Bad request (missing or invalid ID)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a user
 *     description: Updates user details such as email or password.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "updated.email@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 user:
 *                   type: object
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// Reservations
/**
 * @openapi
 * /reservations:
 *   get:
 *     summary: Get reservations for the logged-in user
 *     description: Retrieves all reservations associated with the logged-in user.
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user whose reservations are being fetched
 *     responses:
 *       200:
 *         description: List of user's reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userEmail:
 *                   type: string
 *                 reservations:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Bad request (missing userId)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new reservation
 *     description: Creates a new reservation for a user.
 *     tags:
 *       - Reservations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - photoZoneId
 *               - name
 *               - date
 *               - time
 *               - duration_hours
 *             properties:
 *               userId:
 *                 type: integer
 *               photoZoneId:
 *                 type: integer
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               duration_hours:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reservation:
 *                   type: object
 *       400:
 *         description: Bad request (missing fields)
 *       500:
 *         description: Internal server error
 * /reservations/all:
 *   get:
 *     summary: Get all reservations (Admin only)
 *     description: Retrieves all reservations in the system. Admin access required.
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: List of all reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   photoZoneId:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   date:
 *                     type: string
 *                   time:
 *                     type: string
 *                   duration_hours:
 *                     type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 * /reservations/{id}:
 *   delete:
 *     summary: Cancel a reservation
 *     description: Deletes a reservation by ID.
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reservation ID to delete
 *     responses:
 *       200:
 *         description: Reservation canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request (missing reservation ID)
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Internal server error
 */

// PhotoZones
/**
 * @openapi
 * /zones:
 *   get:
 *     summary: Get all photo zones
 *     description: Retrieves all photo zones in the system.
 *     tags:
 *       - PhotoZones
 *     responses:
 *       200:
 *         description: List of all photo zones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   picture:
 *                     type: string
 *                   name:
 *                     type: string
 *                   zoneStyle:
 *                     type: string
 *                   description:
 *                     type: string
 *                   pricePerHour:
 *                     type: number
 *                   location:
 *                     type: string
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new photo zone
 *     description: Creates a new photo zone (admin only).
 *     tags:
 *       - PhotoZones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - picture
 *               - name
 *               - zoneStyle
 *               - description
 *               - pricePerHour
 *               - location
 *             properties:
 *               picture:
 *                 type: string
 *               name:
 *                 type: string
 *               zoneStyle:
 *                 type: string
 *               description:
 *                 type: string
 *               pricePerHour:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Photo zone created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 zone:
 *                   type: object
 *       400:
 *         description: All fields required
 *       409:
 *         description: Zone with this name already exists
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *
 * /zones/available:
 *   get:
 *     summary: Get available photo zones
 *     description: Retrieves photo zones available for a specific date, time, and duration.
 *     tags:
 *       - PhotoZones
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to check availability (DD-MM-YYYY)
 *       - in: query
 *         name: time
 *         required: true
 *         schema:
 *           type: string
 *           example: "14:00"
 *         description: Time to start reservation
 *       - in: query
 *         name: duration_hours
 *         required: true
 *         schema:
 *           type: integer
 *         description: Duration in hours
 *     responses:
 *       200:
 *         description: List of available photo zones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   picture:
 *                     type: string
 *                   name:
 *                     type: string
 *                   zoneStyle:
 *                     type: string
 *                   description:
 *                     type: string
 *                   pricePerHour:
 *                     type: number
 *                   location:
 *                     type: string
 *       400:
 *         description: Missing required parameters or invalid date/time
 *       500:
 *         description: Internal server error
 *
 * /zones/{id}:
 *   delete:
 *     summary: Delete a photo zone
 *     description: Deletes a photo zone by ID (admin only).
 *     tags:
 *       - PhotoZones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the photo zone to delete
 *     responses:
 *       200:
 *         description: Photo zone deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request (missing ID)
 *       404:
 *         description: Photo zone not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *   put:
 *     summary: Update a photo zone
 *     description: Updates a photo zone by ID (admin only).
 *     tags:
 *       - PhotoZones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the photo zone to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               picture:
 *                 type: string
 *               name:
 *                 type: string
 *               zoneStyle:
 *                 type: string
 *               description:
 *                 type: string
 *               pricePerHour:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Photo zone updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 zone:
 *                   type: object
 *       400:
 *         description: Bad request (missing ID)
 *       404:
 *         description: Photo zone not found
 *       409:
 *         description: Zone with this name already exists
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */

export default router;