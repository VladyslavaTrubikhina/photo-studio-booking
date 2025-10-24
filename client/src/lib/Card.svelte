<script>
    let {zone, style = "normal"} = $props();

    const styles = {
        normal: "bg-white overflow-hidden shadow rounded-xl",
    };
</script>

<div class={styles[style] || styles.normal}>
    {#if zone.picture}
        <img
                src={zone.picture}
                alt={zone.name || 'Zone picture'}
                class="w-full h-48 object-cover"
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
        <div class="mt-4 flex gap-2 justify-end">
            <slot></slot>
        </div>
    </div>
</div>
