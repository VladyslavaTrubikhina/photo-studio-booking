/* eslint-disable no-console */
import {DataTypes, Sequelize} from "sequelize";

const nodeEnv = process.env.NODE_ENV || 'dev';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `../../db/database.${nodeEnv}.sqlite`
});

try {
    await sequelize.authenticate();
    console.log(`Connection has been established successfully. ${process.env.NODE_ENV}`);
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export const Users = sequelize.define("Users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export const Locations = sequelize.define('Locations', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.TEXT,
});

export const PhotoZones = sequelize.define("PhotoZones", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    style: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.TEXT,
    max_duration_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max_reservations_per_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price_per_hour: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export const Reservations = sequelize.define("Reservations", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    duration_hours: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

// Locations <-> PhotoZones (one-to-many)
Locations.hasMany(PhotoZones, {onDelete: 'CASCADE'});
PhotoZones.belongsTo(Locations);

// PhotoZones <-> Reservations (one-to-many)
PhotoZones.hasMany(Reservations, {onDelete: 'CASCADE'});
Reservations.belongsTo(PhotoZones);

// Users <-> Reservations (one-to-many)
Users.hasMany(Reservations, {onDelete: 'CASCADE'});
Reservations.belongsTo(Users);

await sequelize.sync({ force: true });

export async function addUser(email, password, is_admin = false) {
    const user = await Users.create({ email, password, is_admin });
    console.log("Created user:", user.email);
    return user;
}

await addUser("admin@photos.com", "adminpassword123", true);
await addUser("user@photos.com", "userpassword123");

export default {
    Users,
    Locations,
    PhotoZones,
    Reservations,
};