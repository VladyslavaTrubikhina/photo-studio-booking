<script>
    import Button from "./Button.svelte";
    import SummaryRow from "./SummaryRow.svelte";
    import {Ban} from "@lucide/svelte";

    let { activeTab = 'current', reservation, onCancel, user} = $props();

</script>

<div class="my-6 sm:px-0 flex-col justify-items-center">
    <div class="w-1/2 mb-8 p-7 rounded-xl bg-white shadow-md">
        <p class="text-neutral-700 text-lg font-medium">{reservation.name}</p>
        <div class="w-full mr-10 mt-6">
            <SummaryRow name="Email:">{user.email}</SummaryRow>
            <SummaryRow name="Date:">{reservation.date}</SummaryRow>
            <SummaryRow name="Start time:">{reservation.time}</SummaryRow>
            <SummaryRow name="Duration:">{reservation.duration} h</SummaryRow>
            <SummaryRow name="Date:">{reservation.total_price} €</SummaryRow>
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