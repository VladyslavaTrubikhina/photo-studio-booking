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

await addUser("admin@photos.com", "adminpassword123", true);
await addUser("user@photos.com", "userpassword123");
await addPhotoZone("https://www.google.com/url?sa=i&url=https%3A%2F%2Fphoto-trips.com%2Fexperience%2Fcyberpunk-studio-photoshoot-futuristic%2F&psig=AOvVaw14smdoD7zDT2Wq7R4uk2kF&ust=1760811578434000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLDttLfsq5ADFQAAAAAdAAAAABAU", "Zone 1", "Futuristic", "Very good zone", 50);
await addPhotoZone("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.canonoutsideofauto.ca%2F2024%2F10%2F21%2F7-inspiring-home-photography-studio-ideas-to-ignite-your-creativity%2F&psig=AOvVaw2NB0DYOOGZ5gkhE56NJUeN&ust=1760811706100000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKjz7vLsq5ADFQAAAAAdAAAAABAE", "Zone 2", "Minimalistic", "Very good zone", 30);
await addPhotoZone("https://www.google.com/url?sa=i&url=https%3A%2F%2Funhingedstudioatx.com%2Fcute&psig=AOvVaw3ewMgk0sFb2KxTxkdTAq1j&ust=1760811746740000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIjpq4btq5ADFQAAAAAdAAAAABAE", "Zone 3", "Cute", "Very good zone", 40);

export {
    User,
    Location,
    PhotoZone,
    Reservation,
    addUser,
};