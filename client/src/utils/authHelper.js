// src/lib/stores/auth.js
import {writable} from "svelte/store";
import router from "page";

// initialize from localStorage
export const isLoggedIn = writable(!!localStorage.getItem("accessToken"));

export function login() {
    router("/login");
    isLoggedIn.set(true);
}

export function logout() {
    localStorage.removeItem("accessToken");
    router("/");
    isLoggedIn.set(false);
}
