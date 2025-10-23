import express from "express";
import {getAllPhotoZones} from "../controllers/photo-zones-controller.js";

const router = express.Router();

router.get("/", getAllPhotoZones);

export default router;
