import {User} from "../db/database-schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({error: "Email and password are required"});
    }

    try {
        const user = await User.findOne({where: {email: email}});
        if (!user) return res.status(401).json({error: "Invalid email or password"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({error: "Invalid email or password"});

        const accessToken = jwt.sign(
            {id: user.id, email: user.email, is_admin: user.is_admin},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1h'}
        )

        return res.json({
            message: "Login successful",
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                is_admin: user.is_admin,
            },
        });
    } catch (err) {
        res.status(500).json({error: "Internal server error" + err});
    }
}

