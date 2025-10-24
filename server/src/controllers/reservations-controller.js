import {Reservation, User} from "../db/database-schema.js";

export async function getUserReservations(req, res) {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: "Bad request" });
        }

        const user = await User.findByPk(userId);
        const reservations = await Reservation.findAll({ where: { userId } });

        return res.json({
            userEmail: user.email,
            reservations
        });
    } catch (error) {
        console.error("Error getting reservations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


