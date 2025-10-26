import {addUser, Reservation, User} from "../db/database-schema.js";
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
        res.status(500).json({error: "Internal server error" + error});
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await User.findAll();
        const mappedUsers = await Promise.all(
            users.map(async (u) => {
                const reservations = await Reservation.findAll({where: {UserId: u.id}});
                return {
                    ...u.toJSON(),
                    reservations: reservations
                };
            })
        );
        res.status(200).json(mappedUsers);
    } catch (error) {
        res.status(500).json({error: "Internal server error" + error});
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
        res.status(500).json({error: "Internal server error" + error});
    }
}


export async function createUser(req, res) {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({error: "All fields required"});
        }

        if (!validateEmail(email)) {
            return res.status(400).json({error: "Invalid email format"})
        }
        if (!validatePassword(password)) {
            return res.status(400).json({error: "Password is required to be at least eight characters long"})
        }

        let user = await User.findOne({where: {email}});
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
        res.status(500).json({error: "Internal server error" + error});
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
            if (!validatePassword(password)) {
                return res.status(400).json({error: "Password must be at least 8 characters long"})
            } else {
                updatedData.password = await bcrypt.hash(password, 12);
            }
        }

        await user.update(updatedData);

        return res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        res.status(500).json({error: "Internal server error" + error});
    }
}

function validateEmail(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}