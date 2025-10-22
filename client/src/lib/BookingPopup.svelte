<script>
    import Button from "./Button.svelte";
    import {X} from "@lucide/svelte";
    import Input from "./Input.svelte";
    import SummaryRow from "./SummaryRow.svelte";
    import Error from "./Error.svelte";

    export let zone;
    export let style = "normal";
    export let onClick;

    const styles = {
        normal: "p-5 bg-white overflow-hidden shadow-2xl rounded-xl w-200 m-20 relative",
    };

    let date;
    let time;
    let duration;
    $: totalPrice = duration * zone.price_per_hour;
    let error;

</script>

<div class="fixed inset-0 bg-neutral-950 opacity-70 z-20"></div>
<div class="fixed inset-0 flex items-center justify-center z-30">
    <div class={styles[style] || styles.normal}>
        <div class="flex justify-end">
            <Button onClick={onClick} color="light">
                <X class="w-5 h-5"/>
            </Button>
        </div>
        <h3 class="text-lg font-medium text-neutral-900">{zone.name || 'Unnamed Zone'}</h3>
        <h3 class="text-xl font-medium text-neutral-900">{zone.price_per_hour}€</h3>
        <div class="my-10 flex flex-col md:flex-row items-center gap-2">
            <Input
                    type="date"
                    label="Date"
                    bind:value={date}
            />
            <Input
                    type="time"
                    label="Start time"
                    bind:value={time}
            />
            <Input
                    type="number"
                    label="Duration (hours)"
                    placeholder="..."
                    bind:value={duration}
            />
        </div>
        <div class="px-5">
            {#if date && time}
                <h3 class="text-lg font-medium text-neutral-900 mb-2">Summary</h3>
                <SummaryRow name="Date:">{date}</SummaryRow>
                <SummaryRow name="Start time:">{time}</SummaryRow>
                <SummaryRow name="Duration hours:">{duration || 0} h</SummaryRow>
                <SummaryRow name="Total price:">{totalPrice} €</SummaryRow>
            {/if}
        </div>
        <Error>{error}</Error>
        <div class="flex justify-end pt-10">
            <Button onClick={() => {}}>Book for
                specified date and time
            </Button>
        </div>
    </div>
</div>