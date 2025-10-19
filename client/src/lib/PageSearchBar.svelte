<script>
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";
  import { Search } from '@lucide/svelte';
  import Input from "./Input.svelte";


  let { value = "", onSearch } = $props();

  const dispatch = createEventDispatcher();

  function handleInput(e) {
    value = e.target.value;
    dispatch("search", { value });
    onSearch?.(value);
  }

</script>

<div class="w-full flex items-center justify-between mb-6">
  <h2 class="text-2xl font-bold text-neutral-700">
    Photo zones
  </h2>

  <div class="w-full md:w-1/3">
    <div class="flex items-center gap-2 justify-between">
      <Input
        id="search-input"
        type="search"
        placeholder="Search..."
        value={value}
        on:input={handleInput}
      />
      <Button color="light" on:click={() => { dispatch("submit", { value }); onSearch?.(value); }}>
        <Search color="#525252"></Search>
      </Button>
    </div>
  </div>
</div>

