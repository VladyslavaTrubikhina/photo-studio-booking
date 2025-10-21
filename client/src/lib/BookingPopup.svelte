<script>
    import Button from "./Button.svelte";
    import {X} from "@lucide/svelte";

    let {zone, style = "normal", onClick} = $props();

    const styles = {
        normal: "bg-white overflow-hidden shadow-2xl rounded-xl w-200 h-150 m-20 relative",
    };

</script>

<div class="fixed inset-0 bg-neutral-950 opacity-70 z-20"></div>
<div class="fixed inset-0 flex items-center justify-center z-30">
    <div class={styles[style] || styles.normal}>
        <div class="flex justify-end m-4">
            <Button onClick={onClick} color="light">
                <X class="w-5 h-5"/>
            </Button>
        </div>
        <div class="px-4 py-5 sm:px-6 sm:py-5">
            <h3 class="text-lg font-medium text-neutral-900">{zone.name || 'Unnamed Zone'}</h3>
            <h3 class="text-xl font-medium text-neutral-900">{zone.price_per_hour} €</h3>
        </div>
    </div>
</div>