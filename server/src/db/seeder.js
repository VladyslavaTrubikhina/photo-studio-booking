import {addUser, addPhotoZone, addReservation} from "./database-schema.js";

export async function seedDatabase() {
    try {
        // Add users
        await addUser("admin@photos.com", "adminpassword123", true);
        await addUser("user@photos.com", "userpassword123");
        // Add photo zones
        await addPhotoZone(
            "https://cdnb.artstation.com/p/assets/images/images/038/784/829/large/scene-unique-futuristic-studio-apartment.jpg?1624039595",
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
            "https://www.decorilla.com/online-decorating/wp-content/uploads/2017/10/halloween-decor-trends-haunted-house.jpg",
            "Halloween",
            "Spooky-scary",
            "Very good zone for halloween photo shoot",
            20,
            "Enschede, Enschede Kennispark 76"
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
            "https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_3840/vmt3oc8f6ocbysnrgqes",
            "Vintage",
            "Vintage, classic",
            "Step into a charming vintage-style photo studio featuring classic decor, warm lighting, and timeless furnishings. Perfect for portrait sessions, creative shoots, or capturing elegant, nostalgic moments in a cozy, stylish atmosphere.",
            60,
            "Deventer, Deventer Colmschate 19"
        );
        await addPhotoZone(
            "https://www.thespruce.com/thmb/GN8fjBvpHhng1MsSj2kvFig2Zdg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/interior-design-ideas-10-dazey-den-1-019aeca987c74e13bf298d291d368e1e.jpeg",
            "70's",
            "Old-fashioned, 70's, retro",
            "Step back into the vibrant 1970s with this retro-inspired photo studio featuring bold colors, patterned furniture, and nostalgic decor. Perfect for funky, playful shoots or capturing the essence of a groovy, old-school vibe.",
            45,
            "Deventer, Deventer Colmschate 19"
        );
        await addPhotoZone(
            "https://www.hsdbackdrops.com/cdn/shop/products/WHM217AHandsomeonephotobackdrop_1800x1800.jpg?v=1733956358",
            "Mickey",
            "Disney, Mickey-mouse",
            "Bring the magic of Disney to your photos with this playful Mickey Mouse-themed studio. Bright, cheerful, and full of classic Disney charm, it’s perfect for family portraits, kids’ shoots, or fun, whimsical sessions that capture joyful memories.",
            30,
            "Eindhoeven, Eindhoeven Centraal 23B"
        );
        // Add reservations
        await addReservation(2, 1, "Futuro", "01-09-2020", "12:00", 3);
        await addReservation(2, 3, "Haloween", "05-01-2023", "10:00", 2);
        await addReservation(2, 6, "70's", "06-12-2024", "9:00", 2);
    } catch (error) {
        console.error("Database seeding failed:", error);
        throw error;
    }
}
