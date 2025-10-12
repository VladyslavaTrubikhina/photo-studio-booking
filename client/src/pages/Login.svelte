<script>
    import Button from "../lib/Button.svelte";
    import InputField from "../lib/InputField.svelte";
    import router from "page";

    let email = "";
    let password = "";
    let error = "";

    async function handleLogin() {
        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                error = data.error || "Login failed";
            }
            if (res.ok) {
                router("/");
            }

        } catch (err) {
            error = "Unable to reach the server";
            console.error(err);
        }
    }
</script>

<div class="flex justify-center items-center min-h-screen bg-neutral-300">
    <form class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm" on:submit|preventDefault={handleLogin}>
        <h2 class="text-2xl font-bold mb-6 text-center text-neutral-800">Login</h2>
        <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                bind:value={email}
        />
        <InputField
                id="password"
                label="Password"
                type="password"
                placeholder="********"
                bind:value={password}
        />
        {#if error}
            <p class="text-red-400 mb-4 text-center">{error}</p>
        {/if}
        <Button>
            Log In
        </Button>
    </form>
</div>
