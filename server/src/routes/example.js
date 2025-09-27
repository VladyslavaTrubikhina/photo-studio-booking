/**
 * This is an example route file demonstrating OpenAPI documentation.
 * PLEASE REMOVE THIS FILE ONCE YOU HAVE YOUR OWN ROUTES!!!
 */
import express from 'express';
const router = express.Router();

/**
 * @openapi
 * /example/{id}:
 *   get:
 *     summary: Get an example object by ID
 *     description: Returns an example object if the ID is `1`, otherwise returns an error.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the example object
 *     responses:
 *       200:
 *         description: Example object returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 value:
 *                   type: string
 *                   example: "Hello World"
 *       404:
 *         description: Example object not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Example not found"
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (id === 1) {
    return res.json({ id: 1, value: 'Hello World' });
  } else {
    return res.status(404).json({ error: 'Example not found' });
  }
});

/**
 * @openapi
 * /locations:
 *   get:
 *     summary: Get a list of all Lumio photo studio locations
 *     responses:
 *       200:
 *         description: List of available locations
 *   post:
 *     summary: Create a new location (admin only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Location created
 *
 * /locations/{id}:
 *   get:
 *     summary: Get details of a specific location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location details
 *       404:
 *         description: Location not found
 *   put:
 *     summary: Update a location (admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Location updated
 *   delete:
 *     summary: Delete a location (admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Location deleted
 *       404:
 *         description: Location not found
 *
 * /reservations:
 *   get:
 *     summary: Get all reservations for the logged-in user
 *     responses:
 *       200:
 *         description: List of reservations
 *   post:
 *     summary: Create a new reservation (user only)
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
 *
 * /reservations/{id}:
 *   get:
 *     summary: Get details of a reservation
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
 *   put:
 *     summary: Update a reservation (user only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *       200:
 *         description: Reservation updated
 *   delete:
 *     summary: Cancel a reservation (user only)
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