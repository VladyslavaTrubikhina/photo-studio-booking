import express from "express";
import {
    createPhotoZone,
    deleteZone,
    getAllPhotoZones,
    getAvailablePhotoZones
} from "../controllers/photo-zones-controller.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {isAdmin} from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", getAllPhotoZones);
router.get("/available", isLoggedIn, getAvailablePhotoZones);
router.delete("/:id", isLoggedIn, isAdmin, deleteZone);
router.post("/", isLoggedIn, isAdmin, createPhotoZone);

export default router;
