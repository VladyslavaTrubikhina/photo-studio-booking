import express from "express";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {createUser, deleteUser, getAllUsers, getUser, updateUser} from "../controllers/users-controller.js";

const router = express.Router();

router.get("/:id", isLoggedIn, getUser);
router.get("/", isLoggedIn, getAllUsers);
router.delete("/:id", isLoggedIn, deleteUser);
router.post("/", isLoggedIn, createUser);
router.put("/:id", isLoggedIn, updateUser);

export default router;
