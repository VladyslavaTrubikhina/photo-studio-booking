import {addUser, addPhotoZone, addReservation} from "./database-schema.js";

export async function seedDatabase() {
    try {
        // Add users
        await addUser("admin@photos.com", "adminpassword123", true);
        await addUser("user@photos.com", "userpassword123");
        // Add photo zones
        await addPhotoZone(
            "https://photo-trips.com/wp-content/uploads/2024/11/Photo-Trips-Studio-Cyberpunk-Photoshoot-in-Tokyo-10-800x600.jpg",
            "Futuro",
            "Futuristic",
            "Step into a neon-lit world of chrome, glass, and reflections. Perfect for cyberpunk portraits, tech-inspired shoots, and fashion editorials with a futuristic edge.",
            50,
            "Enschede, Enschede Kennispark 76"
        );
        await addPhotoZone(
            "https://photo-trips.com/wp-content/uploads/2024/11/Photo-Trips-Studio-Cyberpunk-Photoshoot-in-Tokyo-10-800x600.jpg",
            "Futuro",
            "Futuristic",
            "Step into a neon-lit world of chrome, glass, and reflections. Perfect for cyberpunk portraits, tech-inspired shoots, and fashion editorials with a futuristic edge.",
            50,
            "Deventer, Deventer Colmschate 19"
        );
        await addPhotoZone(
            "https://www.canonoutsideofauto.ca/wp-content/uploads/2024/10/inspiring-home-photo-studio.jpeg",
            "Simplicity space",
            "Minimalistic",
            "A calm, modern studio with clean lines and soft natural lighting. Ideal for portraits, product photography, and lifestyle shoots with a minimalist aesthetic.",
            30,
            "Enschede, Enschede Kennispark 76"
        );
        await addPhotoZone(
            "https://www.canonoutsideofauto.ca/wp-content/uploads/2024/10/inspiring-home-photo-studio.jpeg",
            "Simplicity space",
            "Minimalistic",
            "A calm, modern studio with clean lines and soft natural lighting. Ideal for portraits, product photography, and lifestyle shoots with a minimalist aesthetic.",
            30,
            "Deventer, Deventer Colmschate 19"
        );
        await addPhotoZone(
            "https://www.canonoutsideofauto.ca/wp-content/uploads/2024/10/inspiring-home-photo-studio.jpeg",
            "Simplicity space",
            "Minimalistic",
            "A calm, modern studio with clean lines and soft natural lighting. Ideal for portraits, product photography, and lifestyle shoots with a minimalist aesthetic.",
            30,
            "Eindhoeven, Eindhoeven Centraal 23B"
        );
        await addPhotoZone(
            "https://images.squarespace-cdn.com/content/v1/598201b7cd0f685ac66e10d7/1565382677345-TZMAN40CP1OF9CT4740D/_Cute_0004_Leonid_Furmansky_5127791695_Galveston+7.jpg?format=2500w",
            "Cutie-patootie",
            "Cute",
            "A charming pastel-themed studio filled with cozy props and soft lighting. Perfect for family portraits, baby photography, or playful fashion sessions.",
            40,
            "Eindhoeven, Eindhoeven Centraal 23B"
        );
        await addPhotoZone(
            "https://images.squarespace-cdn.com/content/v1/598201b7cd0f685ac66e10d7/1565382677345-TZMAN40CP1OF9CT4740D/_Cute_0004_Leonid_Furmansky_5127791695_Galveston+7.jpg?format=2500w",
            "Cutie-patootie",
            "Cute",
            "A charming pastel-themed studio filled with cozy props and soft lighting. Perfect for family portraits, baby photography, or playful fashion sessions.",
            40,
            "Deventer, Deventer Colmschate 19"
        );
        // Add reservations
        await addReservation(2, 1, "Futuro", "01-09-2020", "12:00", 3);
        await addReservation(2, 3, "Simplicity space", "05-01-2023", "10:00", 2);
        await addReservation(2, 6, "Cutie-patootie", "06-12-2024", "9:00", 2);
    } catch (error) {
        console.error("Database seeding failed:", error);
        throw error;
    }
}
