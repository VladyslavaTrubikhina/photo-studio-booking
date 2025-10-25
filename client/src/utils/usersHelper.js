import {jwtDecode} from "jwt-decode";

export function getCurrentUserId() {
    const token = getCurrentUserToken();
    if (token) {
        const decoded = jwtDecode(token);
        return decoded.id;
    } else {
        console.log("No token found");
    }
}

export function getCurrentUserToken(){
    return localStorage.getItem("accessToken");
}

export function getCurrentUserIsAdmin() {
    const token = getCurrentUserToken();
    if (token) {
        const decoded = jwtDecode(token);
        return decoded.is_admin;
    } else {
        console.log("No token found");
    }
}