<script>
    import Button from "./Button.svelte";
    import SummaryRow from "./SummaryRow.svelte";
    import {Ban} from "@lucide/svelte";

    let { activeTab = 'current', reservation, onCancel, userEmail} = $props();

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { // e.g., "30/04/2023"
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
</script>

<div class="my-6 sm:px-0 flex-col justify-items-center">
    <div class="w-1/2 mb-8 p-7 rounded-xl bg-white shadow-md">
        <p class="text-neutral-700 text-lg font-medium">{reservation.name}</p>
        <div class="w-full mr-10 mt-6">
            <SummaryRow name="Reservation id:">{reservation.id}</SummaryRow>
            <SummaryRow name="Email:">{userEmail}</SummaryRow>
            <SummaryRow name="Date:">{formatDate(reservation.date)}</SummaryRow>
            <SummaryRow name="Start time:">{reservation.time}</SummaryRow>
            <SummaryRow name="Duration:">{reservation.duration_hours} h</SummaryRow>
            <SummaryRow name="Total price:">{reservation.total_price} €</SummaryRow>
        </div>
        {#if activeTab === 'current'}
            <div class="flex justify-end mt-6">
                <Button color="light" onClick={onCancel}>
                    <Ban class="h-4 w-4 mr-2"></Ban>
                    Cancel reservation
                </Button>
            </div>
        {/if}
    </div>
</div>