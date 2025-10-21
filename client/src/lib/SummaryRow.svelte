<script>
    export let name = ""
</script>

<div class="flex items-center mb-2">
    <span class="text-neutral-600">{name}</span>
    <span class="flex-grow border-b-2 border-dotted border-neutral-600 mx-3"></span>
    <p class="text-neutral-600"><slot></slot></p>
</div>