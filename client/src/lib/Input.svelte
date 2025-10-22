<script>
    export let id = "";
    export let label = "";
    export let type = "text";
    export let placeholder = "";
    export let value = "";
    export let disabled = false;
</script>

<div class="w-full">
    {#if label}
        <label class="block text-neutral-700 mb-2" for={id}>{label}</label>
    {/if}
    <input
            id={id}
            type={type}
            bind:value
            placeholder={placeholder}
            disabled={disabled}
            class="w-full px-4 py-2 rounded-xl border border-neutral-400 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 disabled:text-neutral-400"
    />
</div>
