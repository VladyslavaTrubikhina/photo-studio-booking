import express from "express";
import {getAllPhotoZones} from "../controllers/photo-zones-controller.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";

const router = express.Router();

router.get("/", isLoggedIn, getAllPhotoZones);

export default router;
