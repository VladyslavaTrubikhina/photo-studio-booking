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

try {
    await sequelize.authenticate();
    console.log(`Connection has been established successfully. ${process.env.NODE_ENV}`);
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const User = UserModel(sequelize);
const Location = LocationModel(sequelize);
const PhotoZone = PhotoZoneModel(sequelize);
const Reservation = ReservationModel(sequelize);

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

async function addUser(email, password, is_admin = false) {
    const user = await User.create({ email, password, is_admin });
    console.log("Created user:", user.email);
    return user;
}

await addUser("admin@photos.com", "adminpassword123", true);
await addUser("user@photos.com", "userpassword123");

export {
    User,
    Location,
    PhotoZone,
    Reservation,
    addUser,
};