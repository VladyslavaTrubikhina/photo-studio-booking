import express from "express";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {createUser, deleteUser, getAllUsers, getUser, updateUser} from "../controllers/users-controller.js";
import {isAdmin} from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/:id", isLoggedIn, getUser);
router.get("/", isLoggedIn, isAdmin, getAllUsers);
router.delete("/:id", isLoggedIn, deleteUser);
router.post("/", createUser);
router.put("/:id", isLoggedIn, updateUser);

export default router;
