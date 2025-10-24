import express from "express";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {cancelReservation, getUserReservations} from "../controllers/reservations-controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getUserReservations);
router.delete("/:id", isLoggedIn, cancelReservation);

export default router;
