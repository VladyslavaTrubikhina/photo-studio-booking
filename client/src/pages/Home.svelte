<script>
  import Card from "../lib/Card.svelte";
  import Error from "../lib/Error.svelte";
  import Header from "../lib/Header.svelte";
  import Button from "../lib/Button.svelte";
  import PageSearchBar from "../lib/PageSearchBar.svelte";
  import {onDestroy, onMount} from "svelte";
  import {createSearchStore, searchHandler} from "../utils/stores/searchStore.js";

  let photoZones = [];
  let searchableZones;
  let loading = true;
  let error = "";
  let searchStore;
  let unsubscribe;

  async function fetchPhotoZones() {
    try {
      loading = true;
      const token = localStorage.getItem("accessToken");

      if (!token) {
        error = "Please log in again.";
      }
      
      const response = await fetch("http://localhost:3000/zones", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        error = data.error || "Failed to fetch zones";
      }
      
      photoZones = data;
      searchableZones = photoZones.map((zone) => ({
        ...zone,
        searchable: `${zone.name} ${zone.location} ${zone.style}`
      }));
      searchStore = createSearchStore(searchableZones);
      unsubscribe = searchStore.subscribe((model) => searchHandler(model));
    } catch (err) {
      console.error("Error fetching photo zones:", err);
      error = "Failed to load photo zones";
    } finally {
      loading = false;
    }
  }

  onMount(fetchPhotoZones);
  onDestroy(unsubscribe);
</script>

<div class="min-h-screen bg-neutral-50">
  <Header/>
  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    {#if searchStore}
      <div class="px-4 py-6 sm:px-0">
        <div class="w-full flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-neutral-700">Photo zones</h2>
          <PageSearchBar bind:value={$searchStore.search}/>
        </div>
        {#if loading}
          <div class="text-center py-8">
            <p class="text-gray-500">Loading photo zones...</p>
          </div>
        {:else if error}
          <div class="text-center py-8">
            <Error message="{error}"/>
          </div>
        {:else if photoZones.length === 0}
          <div class="text-center py-8">
            <p class="text-neutral-500">No photo zones available</p>
          </div>
        {:else if $searchStore.filtered.length === 0}
          <div class="text-center py-8">
            <p class="text-neutral-500">No photo zones with this name</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each $searchStore.filtered as zone (zone.id)}
              <Card {zone}>
                <Button color="light">Details</Button>
                <Button>Book now</Button>
              </Card>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </main>
</div>
