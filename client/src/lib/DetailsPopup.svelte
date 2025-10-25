<script>
    import Button from "./Button.svelte";
    import {X} from "@lucide/svelte";

    let {zone, style = "normal", onClose} = $props();

    const styles = {
        normal: "bg-white overflow-auto shadow-2xl rounded-xl w-200 m-10 max-h-[90vh] relative",
    };

</script>

<div class="fixed inset-0 bg-neutral-950 opacity-70 z-20"></div>
<div class="fixed inset-0 flex items-center justify-center z-30">
    <div class={styles[style] || styles.normal}>
        <div class="absolute top-4 right-4 z-10">
            <Button onClick={onClose} color="light">
                <X class="w-5 h-5"/>
            </Button>
        </div>
        {#if zone.picture}
            <img
                    src={zone.picture}
                    alt={zone.name || 'Zone picture'}
                    class="w-full h-100 object-cover"
                    loading="lazy"
            />
        {/if}
        <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-neutral-900">{zone.name || 'Unnamed Zone'}</h3>
                <h3 class="text-xl font-medium text-neutral-900">{zone.price_per_hour} €</h3>
            </div>
            {#if zone.location}
                <p class="mt-1 text-sm text-neutral-500">📍 {zone.location}</p>
            {/if}
            {#if zone.style}
                <p class="mt-2 text-sm text-neutral-600">{zone.style}</p>
            {/if}
            {#if zone.description}
                <p class="mt-2 text-sm text-neutral-600">{zone.description}</p>
            {/if}
        </div>
    </div>
</div>