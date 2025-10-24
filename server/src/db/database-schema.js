/* eslint-disable no-console */
import {Sequelize} from "sequelize";
import {UserModel} from "./models/User.js";
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
const PhotoZone = PhotoZoneModel(sequelize);
const Reservation = ReservationModel(sequelize);

// Relations
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
        {
            email,
            password: passwordHash,
            is_admin
        });
    console.log("Created user:", user.email);
    return user;
}

async function addPhotoZone(picture, name, style, description, price_per_hour, location) {
    const photoZone = await PhotoZone.create(
        {
            picture,
            name,
            style,
            description,
            price_per_hour,
            location,
        });
    console.log("Created zone:", photoZone.name);
    return photoZone;
}

async function addReservation(userId, photoZoneId, name, date, time, duration_hours) {
    try {
        const photoZone = await PhotoZone.findByPk(photoZoneId);
        if (!photoZone) throw new  Error("PhotoZone not found");
        const user = await User.findByPk(userId);
        if (!user) throw new Error("User not found");

        if (!user.is_admin) {
            const total_price = duration_hours * photoZone.price_per_hour;

            const reservation = await Reservation.create({
                name,
                date,
                time,
                duration_hours,
                total_price,
                UserId: userId,
                PhotoZoneId: photoZoneId,
            });

            console.log(`Created reservation for ${name} on ${date} at ${time}`);
            return reservation;
        } else {
            throw new Error("Admins can't make reservations")
        }
    } catch (err) {
        console.error("Error creating reservation:", err.message);
        throw err;
    }
}


export {
    User,
    PhotoZone,
    Reservation,
    addUser,
    addPhotoZone,
    addReservation,
};