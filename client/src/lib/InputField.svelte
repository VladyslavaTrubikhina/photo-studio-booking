<script>
    export let id = "";
    export let label = "";
    export let type = "text";
    export let placeholder = "";
    export let value = "";
</script>

<div class="mb-4">
    {#if label}
        <label class="block text-neutral-700 mb-2" for={id}>{label}</label>
    {/if}
    <input
            id={id}
            type={type}
            bind:value
            placeholder={placeholder}
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
    />
</div>
