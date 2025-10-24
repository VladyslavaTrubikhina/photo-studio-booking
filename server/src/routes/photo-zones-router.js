import express from "express";
import {getAllPhotoZones, getAvailablePhotoZones} from "../controllers/photo-zones-controller.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";

const router = express.Router();

router.get("/", getAllPhotoZones);
router.get("/available", isLoggedIn, getAvailablePhotoZones);

export default router;
