import express from "express";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {
    cancelReservation,
    createReservation,
    getAllReservations,
    getUserReservations
} from "../controllers/reservations-controller.js";
import {isAdmin} from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", isLoggedIn, getUserReservations);
router.get("/all", isLoggedIn, isAdmin, getAllReservations);
router.post("/", isLoggedIn, createReservation);
router.delete("/:id", isLoggedIn, cancelReservation);

export default router;
