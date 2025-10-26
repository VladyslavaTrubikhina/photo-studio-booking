import {addReservation, Reservation, User} from "../db/database-schema.js";

export async function getAllReservations(req, res) {
    try {
        const reservations = await Reservation.findAll();

        const mappedReservations = await Promise.all(
            reservations.map(async (r) => {
                const user = await User.findByPk(r.UserId);
                return {
                    ...r.toJSON(),
                    email: user.email
                };
            })
        );

        return res.status(200).json(mappedReservations);
    } catch (error) {
        return res.status(500).json({error: "Internal server error" + error});
    }
}

export async function getUserReservations(req, res) {
    try {
        const {userId} = req.query;

        if (!userId) {
            return res.status(400).json({error: "Bad request"});
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({error: "User zone not found"});
        }
        const reservations = await Reservation.findAll({where: {userId}});

        return res.status(200).json({
            userEmail: user.email,
            reservations
        });
    } catch (error) {
        res.status(500).json({error: "Internal server error" + error});
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
        res.status(500).json({error: "Internal server error" + error});
    }
}

export async function createReservation(req, res) {
    try {
        const {userId, photoZoneId, name, date, time, duration_hours} = req.body;

        if (!userId || !photoZoneId || !name || !date || !time || !duration_hours) {
            return res.status(400).json({error: "Bad request"});
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
        res.status(500).json({error: "Internal server error" + error});
    }
}