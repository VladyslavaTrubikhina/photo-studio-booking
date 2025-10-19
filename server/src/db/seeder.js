import { addUser, addPhotoZone } from "./database-schema.js";

export async function seedDatabase() {
  try {
    // Add users
    await addUser("admin@photos.com", "adminpassword123", true);
    await addUser("user@photos.com", "userpassword123");
    // Add photo zones
    await addPhotoZone("https://photo-trips.com/wp-content/uploads/2024/11/Photo-Trips-Studio-Cyberpunk-Photoshoot-in-Tokyo-10-800x600.jpg", "Futuro", "Futuristic", "Very good zone", 50);
    await addPhotoZone("https://www.canonoutsideofauto.ca/wp-content/uploads/2024/10/inspiring-home-photo-studio.jpeg", "Simplicity space", "Minimalistic", "Very good zone", 30);
    await addPhotoZone("https://www.canonoutsideofauto.ca/wp-content/uploads/2024/10/inspiring-home-photo-studio.jpeg", "Simplicity space", "Minimalistic", "Very good zone", 30);
    await addPhotoZone("https://images.squarespace-cdn.com/content/v1/598201b7cd0f685ac66e10d7/1565382677345-TZMAN40CP1OF9CT4740D/_Cute_0004_Leonid_Furmansky_5127791695_Galveston+7.jpg?format=2500w", "Cutie-patootie", "Cute", "Very good zone", 40);
    await addPhotoZone("https://photo-trips.com/wp-content/uploads/2024/11/Photo-Trips-Studio-Cyberpunk-Photoshoot-in-Tokyo-10-800x600.jpg", "Futuro", "Futuristic", "Very good zone", 50);
    await addPhotoZone("https://photo-trips.com/wp-content/uploads/2024/11/Photo-Trips-Studio-Cyberpunk-Photoshoot-in-Tokyo-10-800x600.jpg", "Futuro", "Futuristic", "Very good zone", 50);
    await addPhotoZone("https://photo-trips.com/wp-content/uploads/2024/11/Photo-Trips-Studio-Cyberpunk-Photoshoot-in-Tokyo-10-800x600.jpg", "Futuro", "Futuristic", "Very good zone", 50);
  } catch (error) {
    console.error("Database seeding failed:", error);
    throw error;
  }
}
