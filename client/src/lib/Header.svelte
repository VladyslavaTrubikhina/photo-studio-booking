<script>
    import Button from "./Button.svelte";
    import router from "page";
    import {LogOut} from "@lucide/svelte";

    function handleLogout() {
        localStorage.removeItem("accessToken");
        router("/login");
    }
</script>

<header class="mb-12 bg-neutral-700 shadow-md sticky top-0 z-10">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
                <button class="text-xl font-semibold text-neutral-200 cursor-pointer" on:click={() => router("/")}>Lumio
                    studio
                </button>
            </div>
            <div class="flex space-x-8">
                <Button color="link" onClick={() => router("/")}>Home</Button>
                <Button color="link" onClick={() => router("/reservations")}>My reservations</Button>
                <Button color="link" onClick={() => router("/example/testValue?key1=value1&key2=value2")}>Example
                </Button>
            </div>
            <div class="flex items-center space-x-4">
                <Button onClick={handleLogout} color="light">
                    Logout
                    <LogOut color="#525252" class="ml-2 w-4 h-4"/>
                </Button>
            </div>
        </div>
    </div>
</header>
