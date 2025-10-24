<script>
    import Button from "./Button.svelte";
    import router from "page";
    import {LogOut, LogIn, UserPlus} from "@lucide/svelte";
    import {isLoggedIn, logout, login} from "../utils/authHelper.js";

    let {pages} = $props();

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
                {#if $isLoggedIn}
                    {#each pages as page (page.name)}
                        <Button color="light_link" onClick={() => router(page.route)}>{page.name}</Button>
                    {/each}
                {/if}
            </div>
            <div class="flex items-center space-x-4">
                {#if $isLoggedIn}
                    <Button onClick={logout} color="light">
                        Logout
                        <LogOut color="#525252" class="ml-2 w-4 h-4"/>
                    </Button>
                {:else}
                    <Button onClick={login} color="light">
                        Login
                        <LogIn color="#525252" class="ml-2 w-4 h-4"/>
                    </Button>
                    <Button onClick={() => {router("/register")}} color="light">
                        Register
                        <UserPlus color="#525252" class="ml-2 w-4 h-4"/>
                    </Button>
                {/if}
            </div>
        </div>
    </div>
</header>
