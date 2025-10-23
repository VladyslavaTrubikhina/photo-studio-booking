<script>
    import router from "page";
    import Login from "./pages/Login.svelte";
    import Home from "./pages/Home.svelte";
    import ExampleWithParams from "./pages/ExampleWithParams.svelte";
    import MyReservations from "./pages/MyReservations.svelte";
    import Profile from "./pages/Profile.svelte";
    import Header from "./lib/Header.svelte";

    let currentRoute = $state("/");
    let Page = $state();
    let context = $state({});

    router("/login", () => {
        Page = Login;
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

    router("/example/:id", (ctx) => {
        Page = ExampleWithParams;
        currentRoute = ctx.pathname;
        // The entire context is added. It contains the parameters
        // as well as a wealth of information about the request.
        context = ctx;
    });

    router("/login");
    router.start();
</script>

{#if Page !== Login}
    <Header
        pages={[
            {route: "/", name: "Home"},
            {route: "/reservations", name: "My reservations"},
            {route: "/users", name: "Profile"},
            {route: "/example/testValue?key1=value1&key2=value2", name: "Example"},
        ]}
    />
{/if}
<Page {context}/>