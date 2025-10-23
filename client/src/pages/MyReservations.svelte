<script>
    import ReservationCard from "../lib/ReservationCard.svelte";
    import Button from "../lib/Button.svelte";
    import Error from "../lib/Error.svelte";
    import {getCurrentUser} from "../utils/usersHelper.js";

    let activeTab = 'current'
    let reservations = [
        {
            id: "1",
            name: "Simplicity space",
            date: "01-12-2025",
            time: "15:00",
            duration: 2,
            total_price: 60
        },
        {
            id: "2",
            name: "Futuro",
            date: "02-11-2025",
            time: "12:00",
            duration: 3,
            total_price: 120
        }
    ];
    let error;
    let user = getCurrentUser();

    function handleCancel(id) {
        reservations = reservations.filter(r => r.id !== id);
    }
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
                        user={user}
                        onCancel={() => {handleCancel(reservation.id)}}
                ></ReservationCard>
            {/each}
        {/if}
    </main>
</div>

