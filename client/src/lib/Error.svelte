<script>
    export let fullWidth = false;
</script>

<p class={`text-red-600 mb-4 text-center  ${fullWidth ? 'w-full' : 'w-auto'}`}><slot></slot></p>