/* eslint-disable no-console */
import {Sequelize} from "sequelize";
import {UserModel} from "./models/User.js";
import {LocationModel} from "./models/Location.js";
import {PhotoZoneModel} from "./models/PhotoZone.js";
import {ReservationModel} from "./models/Reservation.js";

const nodeEnv = process.env.NODE_ENV || 'dev';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `../../db/database.${nodeEnv}.sqlite`
});

// Models
const User = UserModel(sequelize);
const Location = LocationModel(sequelize);
const PhotoZone = PhotoZoneModel(sequelize);
const Reservation = ReservationModel(sequelize);

// Relations
Location.hasMany(PhotoZone, {onDelete: 'CASCADE'});
PhotoZone.belongsTo(Location);

PhotoZone.hasMany(Reservation, {onDelete: 'CASCADE'});
Reservation.belongsTo(PhotoZone);

User.hasMany(Reservation, {onDelete: 'CASCADE'});
Reservation.belongsTo(User);

// Connect to DB + recreate tables
try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`Connection has been established successfully.`);
} catch (error) {
    console.error('Unable to connect to the database:', error.message);
}

export {
    User,
    Location,
    PhotoZone,
    Reservation,
};