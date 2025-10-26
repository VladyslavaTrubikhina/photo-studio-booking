<script>
    import router from "page";
    import Login from "./pages/Login.svelte";
    import Home from "./pages/Home.svelte";
    import Reservations from "./pages/Reservations.svelte";
    import Users from "./pages/Users.svelte";
    import Header from "./lib/Header.svelte";
    import Register from "./pages/Register.svelte";
    import {getCurrentUserIsAdmin} from "./utils/usersHelper.js";

    let currentRoute = $state("/");
    let Page = $state();
    let context = $state({});

    router("/login", (ctx) => {
        Page = Login;
        currentRoute = ctx.pathname;
    });

    router("/register", (ctx) => {
        Page = Register;
        currentRoute = ctx.pathname;
    });

    router("/", (ctx) => {
        Page = Home;
        currentRoute = ctx.pathname;
    });

    router("/reservations", (ctx) => {
        Page = Reservations;
        currentRoute = ctx.pathname;
    });

    router("/users", (ctx) => {
        Page = Users;
        currentRoute = ctx.pathname;
    });


    router("/");
    router.start();
</script>

{#if Page !== Login && Page !== Register}
    {#if getCurrentUserIsAdmin()}
        <Header
                pages={[
                    {route: "/", name: "Photo zones"},
                    {route: "/reservations", name: "Reservations"},
                    {route: "/users", name: "Users"}
                ]}
                active={currentRoute}
        />
    {:else}
        <Header
                pages={[
                    {route: "/", name: "Home"},
                    {route: "/reservations", name: "My reservations"},
                    {route: "/users", name: "Profile"},
                ]}
                active={currentRoute}
        />
    {/if}
{/if}
<Page {context}/>