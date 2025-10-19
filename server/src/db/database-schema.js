/* eslint-disable no-console */
import {Sequelize} from "sequelize";
import {UserModel} from "./models/User.js";
import {LocationModel} from "./models/Location.js";
import {PhotoZoneModel} from "./models/PhotoZone.js";
import {ReservationModel} from "./models/Reservation.js";
import bcrypt from "bcrypt";

const nodeEnv = process.env.NODE_ENV || 'dev';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `db/database.${nodeEnv}.sqlite`
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
    await sequelize.sync({force: true});
    console.log(`Connection has been established successfully.`);
} catch (error) {
    console.error('Unable to connect to the database:', error.message);
}

async function addUser(email, password, is_admin = false) {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create(
        { email,
            password: passwordHash,
            is_admin
        });
    console.log("Created user:", user.email);
    return user;
}

async function addPhotoZone(picture, name, style, description, price_per_hour) {
    const photoZone = await PhotoZone.create(
        { picture,
            name,
            style,
            description,
            price_per_hour
        });
    console.log("Created user:", photoZone.name);
    return photoZone;
}


export {
    User,
    Location,
    PhotoZone,
    Reservation,
    addUser,
    addPhotoZone,
};