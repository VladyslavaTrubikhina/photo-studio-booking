import {writable} from "svelte/store";
import router from "page";

export const isLoggedIn = writable(!!localStorage.getItem("accessToken"));

export function goToLogin() {
    router("/login");
    isLoggedIn.set(true);
}

export function login() {
    router("/");
    isLoggedIn.set(true);
}

export function logout() {
    localStorage.removeItem("accessToken");
    router("/");
    isLoggedIn.set(false);
}
