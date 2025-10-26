import {addPhotoZone, PhotoZone, Reservation} from "../db/database-schema.js";
import {Op} from "sequelize";


export async function getAllPhotoZones(req, res) {
    try {
        const zones = await PhotoZone.findAll();
        return res.status(200).json(zones);
    } catch (error) {
        console.error("Error fetching photo zones:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function getAvailablePhotoZones(req, res) {
    try {
        const {date, time, duration_hours} = req.query;

        if (!date || !time || !duration_hours) {
            return res.status(400).json({error: "Missing required parameters"});
        }

        const [day, month, year] = date.split("-").map(Number);
        const [hours, minutes] = time.split(":").map(Number);
        const requestedStart = new Date(year, month - 1, day, hours, minutes);
        const requestedEnd = new Date(requestedStart.getTime() + duration_hours * 60 * 60 * 1000);

        const now = new Date();
        if (requestedStart < now) {
            return res.status(400).json({ error: "Reservation date and time cannot be in the past" });
        }

        const reservationsOnDate = await Reservation.findAll({
            where: {date}
        });

        const overlappingReservations = reservationsOnDate.filter(r => {
            const [resHours, resMinutes] = r.time.split(":").map(Number);
            const resStart = new Date(year, month - 1, day, resHours, resMinutes);
            const resEnd = new Date(resStart.getTime() + r.duration_hours * 60 * 60 * 1000);

            return requestedStart < resEnd && requestedEnd > resStart;
        });

        const reservedZoneIds = overlappingReservations.map(r => r.PhotoZoneId);

        const availableZones = await PhotoZone.findAll({
            where: reservedZoneIds.length
                ? {id: {[Op.notIn]: reservedZoneIds}}
                : {},
        });

        return res.status(200).json(availableZones);

    } catch (error) {
        console.error("Error fetching available photo zones:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function deleteZone(req, res) {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({error: "Bad request"});
        }

        const zone = await PhotoZone.findByPk(id);
        if (!zone) {
            return res.status(404).json({error: "Photo zone not found"});
        }

        await zone.destroy();

        return res.status(200).json({message: "Photo zone deleted successfully"});
    } catch (error) {
        console.error("Error deleting photo zone:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function createPhotoZone(req, res) {
    try {
        const {picture, name, zoneStyle, description, pricePerHour, location} = req.body;

        if (!picture || !name || !zoneStyle || !description || !pricePerHour || !location) {
            return res.status(400).json({error: "All fields required"});
        }

        let zone = await PhotoZone.findOne({ where: { name } });
        if (zone) {
            return res.status(409).json({error: "Zone with this name already exists"});
        } else {
            zone = await addPhotoZone(picture, name, zoneStyle, description, pricePerHour, location);
        }

        return res.status(200).json({
            message: "Zone created successfully",
            zone
        });
    } catch (error) {
        console.error("Error creating zone:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function updatePhotoZone(req, res) {
    try {
        const { id } = req.params;
        const { picture, name, zoneStyle, description, pricePerHour, location } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Zone ID is required" });
        }

        const zone = await PhotoZone.findByPk(id);
        if (!zone) {
            return res.status(404).json({ error: "Photo zone not found" });
        }

        if (name && name !== zone.name) {
            const existing = await PhotoZone.findOne({ where: { name } });
            if (existing) {
                return res.status(409).json({ error: "Zone with this name already exists" });
            }
        }

        await zone.update({
            picture: picture ?? zone.picture,
            name: name ?? zone.name,
            zoneStyle: zoneStyle ?? zone.zoneStyle,
            description: description ?? zone.description,
            pricePerHour: pricePerHour ?? zone.pricePerHour,
            location: location ?? zone.location,
        });

        return res.status(200).json({
            message: "Photo zone updated successfully",
            zone,
        });
    } catch (error) {
        console.error("Error updating photo zone:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
