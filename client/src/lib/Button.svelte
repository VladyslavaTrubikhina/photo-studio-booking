<script>
    export let color = "dark";
    export let fullWidth = false;
    export let onClick;

    const colors = {
        dark: "text-neutral-100 bg-neutral-700 cursor-pointer hover:bg-neutral-800 focus:outline-none",
        light: "text-neutral-600 bg-neutral-300 cursor-pointer hover:bg-neutral-400 focus:outline-none",
        delete: "text-white bg-red-700 cursor-pointer hover:bg-red-900 focus:outline-none",
        light_link: "text-neutral-200 px-2 py-2 font-medium transition-colors hover:text-neutral-400 focus:outline-none",
        dark_link: "text-neutral-700 px-2 py-2 font-medium transition-colors hover:text-neutral-400 focus:outline-none",
    };

    let colorSettings = colors[color];
</script>


{#if color !== "link"}
    <button
            on:click={onClick}
            class={`flex items-center justify-center px-3 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${colorSettings} ${fullWidth ? 'w-full' : 'w-auto'}`}
    >
        <slot>Button</slot>
    </button>
{:else if color.includes('link')}
    <button
            on:click={onClick}
            class={`${colorSettings}`}
    ><slot></slot></button>
{/if}
