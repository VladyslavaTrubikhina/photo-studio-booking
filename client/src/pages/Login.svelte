<script>
    import Button from "../lib/Button.svelte";
    import Input from "../lib/Input.svelte";
    import router from "page";
    import Error from "../lib/Error.svelte";
    import {login} from "../utils/authHelper.js";

    let email;
    let password;
    let error;

    async function handleLogin() {
        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            const data = await res.json();

            if (!res.ok) {
                error = data.error || "Login failed";
            }
            if (res.ok) {
                if (data?.accessToken) {
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("isAdmin", data.user.is_admin);
                }
                login();
            }

        } catch (err) {
            error = "Unable to reach the server";
            console.error(err);
        }
    }
</script>

<div class="flex justify-center items-center min-h-screen bg-neutral-100">
    <form class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-medium mb-6 text-center text-neutral-800">Login</h2>
        {#if error}
            <Error fullWidth>{error}</Error>
        {/if}
        <div class="mb-4">
            <Input
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    bind:value={email}
            />
        </div>
        <div class="mb-4">
            <Input
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="********"
                    bind:value={password}
            />
        </div>
        <Button
                fullWidth
                onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>
            Log In
        </Button>
        <Button fullWidth color="dark_link" onClick={() => {router("/register")}}>
            <span class="border-b-1 border-b-neutral-700">Register new account</span>
        </Button>
    </form>
</div>
