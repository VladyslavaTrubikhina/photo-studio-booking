<script>
    import {Search} from "@lucide/svelte";

    export let value = "";
</script>

<div class="w-full md:w-1/2 lg:w-1/3 md:pr-6">
    <div class="flex items-center rounded-xl bg-white border border-neutral-400">
        <div class="pl-3 py-2 ">
            <Search color="#737373" class="w-5 h-5"/>
        </div>
        <input
                id="search-input"
                type="search"
                placeholder="Search name, location or style..."
                class="w-full px-3 py-2 rounded-r-xl bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none"
                bind:value
        />
    </div>
</div>
