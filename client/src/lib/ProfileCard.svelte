<script>
    import Button from "./Button.svelte";
    import {Trash2, Pencil, ArrowDownToLine} from "@lucide/svelte";
    import Input from "./Input.svelte";
    import {getCurrentUserId, getCurrentUserToken} from "../utils/usersHelper.js";
    import {onMount} from "svelte";
    import router from "page";
    import Error from "./Error.svelte";
    import {logout} from "../utils/authHelper.js";

    let disabled = true;
    let passwordLabel = "Password";
    let user;
    let newPassword = "********";
    let error;

    async function getUser() {
        const userId = getCurrentUserId();
        const token = getCurrentUserToken();

        try {
            const res = await fetch(`http://localhost:3000/users/${userId}`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`,},
            });

            const data = await res.json();

            if (!res.ok) {
                error = data.error || "Getting user failed";
            }
            if (res.ok) {
                user = data.user;
            }
        } catch (err) {
            error = "Unable to reach the server";
            console.error(err);
        }
    }

    async function handleDelete() {
        const userId = getCurrentUserId();
        const token = getCurrentUserToken();
        try {
            const res = await fetch(`http://localhost:3000/users/${userId}`, {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${token}`,},
            });

            const data = await res.json();

            if (!res.ok) {
                error = data.error || "Deleting user failed";
            }
            if (res.ok) {
                logout();
                router("/");
            }
        } catch (err) {
            error = "Unable to reach the server";
            console.error(err);
        }
    }

    async function updateUser() {
        const userId = getCurrentUserId();
        const token = getCurrentUserToken();
        try {
            console.log("EMAIL", user.email);
            console.log("PASSWORD", newPassword);
            const res = await fetch(`http://localhost:3000/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email,
                    password: newPassword
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                error = data.error || "Updating user failed";
            }
            if (res.ok) {
                await getUser();
            }
        } catch (err) {
            error = "Unable to reach the server";
            console.error(err);
        }
    }

    function handleEditClick() {
        disabled = false;
        newPassword = "";
        passwordLabel = "New password"
    }

    function handleSaveClick() {
        disabled = true;
        passwordLabel = "Password"
        updateUser();
        newPassword = "********";
    }

    onMount(getUser)
</script>

<div class="my-6 sm:px-0 flex-col justify-items-center">
    <div class="w-1/2 mb-8 p-7">
        {#if error}
            <Error fullWidth>{error}</Error>
        {:else if user}
            <div class="w-full mt-6 space-y-4">
                <Input
                        id="email"
                        label="Email"
                        type="email"
                        disabled={disabled}
                        bind:value={user.email}
                />
                <Input
                        id="password"
                        label={passwordLabel}
                        type="text"
                        placeholder="********"
                        disabled={disabled}
                        bind:value={newPassword}
                />
            </div>
            <div class="flex items-center justify-end mt-6 gap-4">
                {#if disabled}
                    <Button color="light" onClick={() => {handleEditClick()}}>
                        <Pencil class="h-4 w-4 mr-2"></Pencil>
                        Edit profile
                    </Button>
                {:else }
                    <Button color="light" onClick={() => {handleSaveClick()}}>
                        <ArrowDownToLine class="h-4 w-4 mr-2"></ArrowDownToLine>
                        Save changes
                    </Button>
                {/if}
                <Button color="delete" onClick={() => {handleDelete()}}>
                    <Trash2 class="h-4 w-4 mr-2"></Trash2>
                    Delete profile
                </Button>
            </div>
        {/if}
    </div>
</div>