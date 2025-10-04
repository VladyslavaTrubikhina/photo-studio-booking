/* eslint-disable no-console */
import {DataTypes, Sequelize} from "sequelize";

const nodeEnv = process.env.NODE_ENV || 'dev';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `db/database.${nodeEnv}.sqlite`
});

try {
    await sequelize.authenticate();
    console.log(`Connection has been established successfully. ${process.env.NODE_ENV}`);
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const User = sequelize.define("User", {
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
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

const Location = sequelize.define('Location', {
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

const PhotoZone = sequelize.define("PhotoZone", {
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
    maxDurationHours: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    maxReservationsPerUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pricePerHour: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

const Reservation = sequelize.define("Reservation", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    durationHours: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

// Location <-> PhotoZone (one-to-many)
Location.hasMany(PhotoZone, {onDelete: 'CASCADE'});
PhotoZone.belongsTo(Location);

// PhotoZone <-> Reservation (one-to-many)
PhotoZone.hasMany(Reservation, {onDelete: 'CASCADE'});
Reservation.belongsTo(PhotoZone);

// User <-> Reservation (one-to-many)
User.hasMany(Reservation, {onDelete: 'CASCADE'});
Reservation.belongsTo(User);

await sequelize.sync({ force: true });

export async function addUser(email, password, isAdmin = false) {
    const user = await User.create({ email, password, isAdmin });
    console.log("Created user:", user.email);
    return user;
}

addUser("admin@photos.com", "adminpassword123", true);
addUser("user@photos.com", "userpassword123");
