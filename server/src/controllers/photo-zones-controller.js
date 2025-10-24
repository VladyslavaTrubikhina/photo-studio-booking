import {PhotoZone} from "../db/database-schema.js";

export async function getAllPhotoZones(req, res) {
    try {
        const studios = await PhotoZone.findAll();
        return res.status(200).json(studios);
    } catch (error) {
        console.error("Error fetching photo zones:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

