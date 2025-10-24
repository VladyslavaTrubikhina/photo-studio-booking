<script>
    import ReservationCard from "../lib/ReservationCard.svelte";
    import Button from "../lib/Button.svelte";
    import Error from "../lib/Error.svelte";
    import {getCurrentUserId, getCurrentUserToken} from "../utils/usersHelper.js";
    import {onMount} from "svelte";

    let activeTab = 'current'
    let reservations = [];
    let error;
    let userEmail;

    async function getReservations() {

        const userId = getCurrentUserId();
        const token = getCurrentUserToken();


        console.log(token)
        try {
            const res = await fetch(`http://localhost:3000/reservations?userId=${userId}`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`,},
            });

            const data = await res.json();

            console.log(data)
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
    }

    function handleCancel(id) {
        reservations = reservations.filter(r => r.id !== id);
    }

    onMount(getReservations);
</script>

<div class="pt-12 min-h-screen bg-neutral-50">
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 class="w-full flex justify-center text-2xl font-medium text-neutral-700 mb-5">My reservations</h2>
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
            {#each reservations as reservation (reservation.id)}
                <ReservationCard
                        activeTab={activeTab}
                        reservation={reservation}
                        userEmail={userEmail}
                        onCancel={() => {handleCancel(reservation.id)}}
                ></ReservationCard>
            {/each}
        {/if}
    </main>
</div>

