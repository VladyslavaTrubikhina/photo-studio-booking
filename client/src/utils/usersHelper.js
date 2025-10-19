export function getCurrentUser() {
    if (typeof window === "undefined") return null;

    try {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    } catch (e) {
        console.error("Error parsing user data:", e);
        return null;
    }
}
