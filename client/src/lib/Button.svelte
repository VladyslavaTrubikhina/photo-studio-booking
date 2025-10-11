<script>
    export let color = "dark";

    const colors = {
        dark: "text-neutral-100 bg-neutral-700 cursor-pointer hover:bg-neutral-800",
        light: "text-neutral-600 bg-neutral-300 cursor-pointer hover:bg-neutral-400 hover:text-neutral-700",
    };

    let colorSettings = colors[color] || colors.blue;
</script>

<button
        class={`w-full py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${colorSettings}`}
>
    <slot>Button</slot>
</button>
