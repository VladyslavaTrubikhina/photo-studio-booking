<script>
    import Button from "../lib/Button.svelte";
    import Input from "../lib/Input.svelte";
    import router from "page";
    import Error from "../lib/Error.svelte";

    let email = "";
    let password = "";
    let error = "";

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
                }
                router("/");
            }

        } catch (err) {
            error = "Unable to reach the server";
            console.error(err);
        }
    }
</script>

<div class="flex justify-center items-center min-h-screen bg-neutral-200">
    <form class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm" on:submit|preventDefault={handleLogin}>
        <h2 class="text-2xl font-bold mb-6 text-center text-neutral-800">Login</h2>
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
        {#if error}
            <Error>{error}</Error>
        {/if}
        <Button fullWidth onClick={() => {}}>Log In</Button>
    </form>
</div>
