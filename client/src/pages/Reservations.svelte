<script>
    import ReservationCard from "../lib/ReservationCard.svelte";
    import Button from "../lib/Button.svelte";
    import Error from "../lib/Error.svelte";
    import {getCurrentUserId, getCurrentUserToken, getCurrentUserIsAdmin} from "../utils/usersHelper.js";
    import {filterReservations} from "../utils/reservationsHelper.js";
    import {onMount} from "svelte";
    import {createSearchStore, searchHandler} from "../utils/stores/searchStore.js";
    import SearchBar from "../lib/SearchBar.svelte";

    let activeTab = 'current'
    let reservations = [];
    let searchableReservations;
    let searchStore;
    let error;
    let userEmail;

    $: filteredReservations = (searchStore ? $searchStore.filtered : reservations).length
        ? (activeTab === 'current'
            ? filterReservations(searchStore ? $searchStore.filtered : reservations, (resEnd, now) => resEnd >= now)
            : filterReservations(searchStore ? $searchStore.filtered : reservations, (resEnd, now) => resEnd < now))
        : [];

    async function getReservations() {
        const userId = getCurrentUserId();
        const token = getCurrentUserToken();
        if (!getCurrentUserIsAdmin()) {
            try {
                const res = await fetch(`http://localhost:3000/reservations?userId=${userId}`, {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`,},
                });

                const data = await res.json();

                if (!res.ok) {
                    error = data.error || "Getting reservations failed";
                }
                if (res.ok) {
                    userEmail = data.userEmail;
                    reservations = data.reservations;
                }

            } catch (err) {
                error = "Unable to reach the server";
                console.error(err);
            }
        } else if (getCurrentUserIsAdmin()) {
            try {
                const res = await fetch(`http://localhost:3000/reservations/all?userId=${userId}`, {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`},
                });

                const data = await res.json();

                if (!res.ok) {
                    error = data.message || "Getting reservations failed";
                }
                if (res.ok) {
                    userEmail = "";
                    reservations = data;
                    searchableReservations = reservations.map((r) => ({
                        ...r,
                        searchable: `${r.email} ${r.name} ${r.id}`
                    }));
                    searchStore = createSearchStore(searchableReservations);
                    searchStore.subscribe((model) => searchHandler(model));
                }
            } catch (err) {
                error = "Unable to reach the server";
                console.error(err);
            }
        }
    }

    async function handleCancel(id) {
        const token = getCurrentUserToken();
        try {
            const res = await fetch(`http://localhost:3000/reservations/${id}`, {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${token}`,},
            });

            const data = await res.json();

            if (!res.ok) {
                error = data.error || "Canceling reservation failed";
            }
            if (res.ok) {
                await getReservations();
            }
        } catch (err) {
            error = "Unable to reach the server";
            console.error(err);
        }
    }

    onMount(getReservations);
</script>

<div class="pt-12 min-h-screen bg-neutral-50">
    <main class="max-w-7xl mx-auto py-6 px-6 lg:px-8">
        {#if getCurrentUserIsAdmin()}
            <h2 class="w-full flex justify-center text-2xl font-medium text-neutral-700 mb-5">Reservations</h2>
            {#if searchStore}
                <div class="flex justify-center my-5 ml-6">
                    <SearchBar bind:value={$searchStore.search}/>
                </div>
            {/if}
        {:else}
            <h2 class="w-full flex justify-center text-2xl font-medium text-neutral-700 mb-5">My reservations</h2>
        {/if}
        {#if error}
            <Error fullWidth>{error}</Error>
        {:else if reservations.length === 0}
            <p class="text-neutral-500 text-center">No reservations yet</p>
        {:else }
            <div class="w-full flex items-center justify-center">
                <Button color="dark_link" onClick={() => {activeTab = 'current'}}>
                    <span
                            class={`text-xl ${ activeTab === 'current' ? "" : "text-neutral-400 hover:text-neutral-700"}`}>
                        Current
                    </span>
                </Button>
                <Button color="dark_link" onClick={() => {activeTab = 'expired'}}>
                    <span
                            class={`text-xl ${ activeTab === 'expired' ? "" : "text-neutral-400 hover:text-neutral-700"}`}>
                        Expired
                    </span>
                </Button>
            </div>
            {#if searchStore && filteredReservations.length === 0}
                <p class="text-neutral-500 text-center mt-5">No {activeTab} reservations with this name / email / id</p>
            {:else if !searchStore && filteredReservations.length === 0}
                <p class="text-neutral-500 text-center mt-5">No {activeTab} reservations yet</p>
            {/if}
            {#each filteredReservations as reservation (reservation.id)}
                <ReservationCard
                        activeTab={activeTab}
                        reservation={reservation}
                        userEmail={userEmail || reservation.email}
                        onCancel={() => {handleCancel(reservation.id)}}
                ></ReservationCard>
            {/each}
        {/if}
    </main>
</div>

