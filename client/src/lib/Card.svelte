<script>
  import Button from "./Button.svelte";

  let { zone, style = "normal" } = $props();

  const styles = {
    normal: "bg-white overflow-hidden shadow rounded-xl",
  };
</script>

<div class={styles[style] || styles.normal}>
  {#if zone.picture}
    <div class="overflow-hidden">
        <img
          src={zone.picture}
          alt={zone.name || 'Zone picture'}
          class="w-full h-48 object-cover hover:opacity-90 transition duration-200"
          loading="lazy"
        />
    </div>
  {/if}
  <div class="px-4 py-5 sm:p-6">
    <h3 class="text-lg font-medium text-neutral-900">{zone.name || 'Unnamed Zone'}</h3>
    {#if zone.description}
      <p class="mt-2 text-sm text-neutral-600">{zone.description}</p>
    {/if}
    {#if zone.location}
      <p class="mt-1 text-sm text-neutral-500">📍 {zone.location}</p>
    {/if}
    <div class="mt-5 flex gap-2" >
      <slot><Button color="light">Details</Button></slot>
    </div>
  </div>
</div>
