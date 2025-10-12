import { User } from "../db/database-schema.js";

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

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        return res.json({
            message: "Login successful",
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

