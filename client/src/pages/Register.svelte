<script>
    import Button from "../lib/Button.svelte";
    import Input from "../lib/Input.svelte";
    import Error from "../lib/Error.svelte";
    import router from "page";

    let email;
    let password;
    let confirmedPassword;
    let error;

    async function handleRegister() {
        try {
            if (password !== confirmedPassword) {
                error = "Passwords do not match";
                return;
            }

            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            const data = await res.json();

            if (!res.ok) {
                error = data.error || "Register failed";
            }
            if (res.ok) {
                router("/login");
            }
        } catch (err) {
            error = "Unable to reach the server";
            console.error(err);
        }
    }
</script>

<div class="flex justify-center items-center min-h-screen bg-neutral-100">
    <form class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-medium mb-6 text-center text-neutral-800">Register</h2>
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
        <div class="mb-4">
            <Input
                    id="confirmPassword"
                    label="Confirm password"
                    type="password"
                    placeholder="********"
                    bind:value={confirmedPassword}
            />
        </div>
        <Button
                fullWidth
                onClick={(e) => {
                    e.preventDefault();
                    handleRegister();
                }}>
            Continue
        </Button>
    </form>
</div>
