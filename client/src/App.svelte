<script>
    import router from "page";
    import Login from "./pages/Login.svelte";
    import Home from "./pages/Home.svelte";
    import MyReservations from "./pages/MyReservations.svelte";
    import Profile from "./pages/Profile.svelte";
    import Header from "./lib/Header.svelte";
    import Register from "./pages/Register.svelte";
    import {getCurrentUserIsAdmin} from "./utils/usersHelper.js";

    let currentRoute = $state("/");
    let Page = $state();
    let context = $state({});

    router("/login", () => {
        Page = Login;
    });

    router("/register", () => {
        Page = Register;
    });

    router("/", () => {
        Page = Home;
    });

    router("/reservations", () => {
        Page = MyReservations;
    });

    router("/users", () => {
        Page = Profile;
    });


    router("/");
    router.start();
</script>

{#if Page !== Login && Page !== Register}
    {#if getCurrentUserIsAdmin()}
        <Header pages={[
            {route: "/", name: "Photo zones"},
            {route: "/reservations", name: "Reservations"},
            {route: "/users", name: "Users"},
        ]}/>
    {:else}
        <Header pages={[
            {route: "/", name: "Home"},
            {route: "/reservations", name: "My reservations"},
            {route: "/users", name: "Profile"},
        ]}/>
    {/if}
{/if}
<Page {context}/>