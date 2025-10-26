<script>
    import ProfileCard from "../lib/ProfileCard.svelte";
    import {getCurrentUserId, getCurrentUserIsAdmin, getCurrentUserToken} from "../utils/usersHelper.js";
    import {onMount} from "svelte";
    import Error from "../lib/Error.svelte";
    import Button from "../lib/Button.svelte";
    import {Pencil, Trash2} from "@lucide/svelte";
    import {logout} from "../utils/authHelper.js";
    import {createSearchStore, searchHandler} from "../utils/stores/searchStore.js";
    import SearchBar from "../lib/SearchBar.svelte";

    let users = [];
    let searchableUsers;
    let searchStore;
    let error;
    let profileOpen = false;
    let clickedUser;
    let user;

    async function fetchUsers() {
        const userId = getCurrentUserId();
        const token = getCurrentUserToken();
        try {
            const response = await fetch(`http://localhost:3000/users?userId=${userId}`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`,},
            });

            const data = await response.json();

            if (!response.ok) {
                error = data.error || "Failed to fetch users";
            }

            if (response.ok) {
                users = data;
                searchableUsers = users.map((user) => ({
                    ...user,
                    searchable: `${user.email} ${user.id}`
                }));
                searchStore = createSearchStore(searchableUsers);
                searchStore.subscribe((model) => searchHandler(model));
            }
        } catch (err) {
            console.error("Error fetching photo users:", err);
            error = "Failed to load photo users";
        }
    }

    async function handleDelete(clickedUser) {
        const userId = getCurrentUserId();
        const token = getCurrentUserToken();
        try {
            const res = await fetch(`http://localhost:3000/users/${clickedUser.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userId}),
            });

            const data = await res.json();

            if (!res.ok) {
                error = data.error || "Deleting user failed";
            }
            if (res.ok) {
                if (clickedUser.id === userId) {
                    logout();
                } else {
                    await fetchUsers();
                }
            }
        } catch (err) {
            error = "Unable to reach the server";
            console.error(err);
        }
    }


    async function getCurrentUser() {
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
                return data.user;
            }
        } catch (err) {
            error = "Unable to reach the server";
            console.error(err);
        }
    }

    onMount(async () => {user = await getCurrentUser()});
    onMount(fetchUsers);
</script>

<div class="pt-12 min-h-screen bg-neutral-50">
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {#if !getCurrentUserIsAdmin() || profileOpen}
            <h2 class="w-full flex justify-center text-2xl font-medium text-neutral-700">Profile</h2>
            <ProfileCard user={getCurrentUserIsAdmin() ? clickedUser : user}></ProfileCard>
        {:else if getCurrentUserIsAdmin()}
            <h2 class="w-full mb-5 flex justify-center text-2xl font-medium text-neutral-700">Users</h2>
            {#if error}
                <Error>{error}</Error>
            {/if}
            {#if users && searchStore}
                <div class="flex justify-center my-5 ml-6">
                    <SearchBar bind:value={$searchStore.search}/>
                </div>
                <div class="my-6 sm:px-0 flex-col justify-items-center">
                    {#each $searchStore.filtered as user (user.id)}
                        <div class="w-1/2 my-5 p-5 rounded-xl bg-white shadow-md">
                            {#if user.is_admin}
                                <div class="w-full flex items-center justify-center">
                                    <span class="text-neutral-700 text-xl">Admin</span>
                                    <span class="text-neutral-700 text-xl ml-2">(you)</span>
                                </div>
                            {/if}
                            <div class="flex items-center justify-between">
                                <div class="flex flex-col">
                                    <span class="text-neutral-600">ID: {user.id}</span>
                                    <span class="text-neutral-600">Email: {user.email}</span>
                                    {#if !user.is_admin}
                                        <span class="text-neutral-600">Reservations: {user.reservations.length}</span>
                                    {/if}
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button color="delete" onClick={() => {handleDelete(user)}}>
                                        <Trash2 class="h-4 w-4"/>
                                    </Button>
                                    <Button onClick={() => {
                                        clickedUser = user;
                                        profileOpen = true
                                    }}>
                                        <Pencil class="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}

        {/if}
    </main>
</div>
