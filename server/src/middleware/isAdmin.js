import { User } from "../db/database-schema.js";

export const isAdmin = async (req, res, next) => {
    const userId = req.body?.userId ?? req.query?.userId;

    if (!userId) return res.status(403).json({ error: 'Access denied.' });

    try {
        const user = await User.findByPk(Number(userId));

        if (!user) return res.status(404).json({ error: 'User not found' });
        if (!user.is_admin) return res.status(403).json({ error: 'Access denied.' });

        next();
    } catch (err) {
        console.error('Admin check failed:', err);
        res.status(500).json({ message: 'Server error verifying admin access.' });
    }
};
