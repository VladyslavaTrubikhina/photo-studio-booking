<script>
    export let color = "dark";
    export let fullWidth = false;
    export let onClick;

    const colors = {
        dark: "text-neutral-100 bg-neutral-700 cursor-pointer hover:bg-neutral-800 focus:outline-none",
        light: "text-neutral-600 bg-neutral-300 cursor-pointer hover:bg-neutral-400 focus:outline-none",
        link: "text-neutral-200 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-neutral-400 focus:outline-none",
    };

    let colorSettings = colors[color];
</script>


{#if color !== "link"}
    <button
            on:click={onClick}
            class={`px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${colorSettings} ${fullWidth ? 'w-full' : 'w-auto'}`}
    >
        <slot>Button</slot>
    </button>
{:else if color === "link"}
    <button
            on:click={onClick}
            class={`${colorSettings}`}
    ><span><slot></slot></span></button>
{/if}
