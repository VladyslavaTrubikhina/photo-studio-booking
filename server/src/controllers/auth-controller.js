import { User } from "../db/database-schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     description: Authenticates a user with email and password, returns an access token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: userpassword123
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid email or password
 */

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await User.findOne({where: {email: email}});
        if (!user) return res.status(401).json({ error: "Invalid email or password" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: "Invalid email or password" });

        const accessToken = jwt.sign(
            { id: user.id, email: user.email, is_admin: user.is_admin },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        )

        const refreshToken = jwt.sign(
            { id: user.id, email: user.email, is_admin: user.is_admin },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '7d'}
        )

        // TODO: See why refresh token isn't visible in database connection tool
        // TODO: See why i am back at login page after refreshing the tab (Cmd + R)
        await user.update({refresh_token: refreshToken});
        await user.reload(); // reload from DB
        console.log();
        console.log(user.refresh_token); // Prints the correct token but in my db resource in intellij i don't see it

        return res.json({
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                is_admin: user.is_admin,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

