import express from "express";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {getUserReservations} from "../controllers/reservations-controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getUserReservations);

export default router;
