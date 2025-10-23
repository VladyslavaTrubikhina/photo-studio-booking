<script>
    import Button from "./Button.svelte";
    import router from "page";
    import {LogOut} from "@lucide/svelte";

    let {pages} = $props();

    function handleLogout() {
        localStorage.removeItem("accessToken");
        router("/login");
    }
</script>

<header class="bg-neutral-700 shadow-md sticky top-0 z-10">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
                <button class="text-xl font-semibold text-neutral-200 cursor-pointer" onclick={() => router("/")}>Lumio
                    studio
                </button>
            </div>
            <div class="flex space-x-8">
                {#each pages as page (page.name)}
                    <Button color="light_link" onClick={() => router(page.route)}>{page.name}</Button>
                {/each}
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
