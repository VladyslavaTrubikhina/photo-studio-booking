import {addUser, User} from "../db/database-schema.js";
import bcrypt from "bcrypt";

export async function getUser(req, res) {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({error: "Bad request"});
        }

        const user = await User.findByPk(id);

        return res.status(200).json({user});
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function deleteUser(req, res) {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({error: "Bad request"});
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        await user.destroy();

        return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({error: "Internal server error"});
    }
}


export async function createUser(req, res) {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({error: "Bad request"});
        }

        if (!validateEmail(email)) {
            return res.status(400).json({error: "Invalid email format"})
        }

        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(409).json({error: "User with this email already exists"});
        } else {
            user = await addUser(email, password, false);
        }

        return res.status(200).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export async function updateUser(req, res) {
    try {
        const {id} = req.params;
        const {email, password} = req.body;
        const updatedData = {};

        if (!id) return res.status(400).json({error: "Bad request"});

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({error: "User not found"});

        if (email) {
            if (!validateEmail(email)) {
                return res.status(400).json({error: "Invalid email format"})
            } else {
                updatedData.email = email;
            }
        }
        if (password) {
            updatedData.password = await bcrypt.hash(password, 12);
        }

        await user.update(updatedData);

        return res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({error: "Internal server error"});
    }
}


function validateEmail(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
}