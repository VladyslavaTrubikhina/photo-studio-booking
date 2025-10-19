<script>
    export let color = "dark";
    export let fullWidth = false;

    const colors = {
        dark: "text-neutral-100 bg-neutral-700 cursor-pointer hover:bg-neutral-800",
        light: "text-neutral-600 bg-neutral-300 cursor-pointer hover:bg-neutral-400",
    };

    let colorSettings = colors[color];
</script>

<button
        class={`px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${colorSettings} ${fullWidth ? 'w-full' : 'w-auto'}`}
>
    <slot>Button</slot>
</button>
