import {addReservation, Reservation, User} from "../db/database-schema.js";

export async function getUserReservations(req, res) {
    try {
        const {userId} = req.query;

        if (!userId) {
            return res.status(400).json({error: "Bad request"});
        }

        const user = await User.findByPk(userId);
        const reservations = await Reservation.findAll({where: {userId}});

        return res.status(200).json({
            userEmail: user.email,
            reservations
        });
    } catch (error) {
        console.error("Error getting reservations:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function cancelReservation(req, res) {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({error: "Reservation ID is required"});
        }

        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({error: "Reservation not found"});
        }

        await reservation.destroy();

        return res.status(200).json({message: "Reservation canceled successfully"});
    } catch (error) {
        console.error("Error canceling reservation:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function createReservation(req, res) {
    try {
        const { userId, photoZoneId, name, date, time, duration_hours } = req.body;

        if (!userId || !photoZoneId || !name || !date || !time || !duration_hours) {
            return res.status(400).json({ error: "Bad request" });
        }

        const reservation = await addReservation(
            userId,
            photoZoneId,
            name,
            date,
            time,
            duration_hours
        );

        return res.status(201).json({
            message: "Reservation created successfully",
            reservation
        });

    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).json({ error: "Internal server error"});
    }
}