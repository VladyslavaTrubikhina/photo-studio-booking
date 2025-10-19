import {User} from "../db/database-schema.js"

export const isAdmin = async (req, res, next) => {

    if (!req.user?.id) return res.status(403).json({ message: 'Access denied.' });

    try {
        const user = await User.findByPk(req.user.id);

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!user.is_admin) return res.status(403).json({ message: 'Access denied.' });

        next();
    } catch (err) {
        console.error('Admin check failed:', err);
        res.status(500).json({ message: 'Server error verifying admin access.' });
    }
};
