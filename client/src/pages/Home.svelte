<script>
    import Card from "../lib/Card.svelte";
    import Error from "../lib/Error.svelte";
    import Button from "../lib/Button.svelte";
    import SearchBar from "../lib/SearchBar.svelte";
    import {onMount} from "svelte";
    import {createSearchStore, searchHandler} from "../utils/stores/searchStore.js";
    import DetailsPopup from "../lib/DetailsPopup.svelte";
    import BookingPopup from "../lib/BookingPopup.svelte";
    import {isLoggedIn} from "../utils/authHelper.js";

    let photoZones = [];
    let searchableZones;
    let loading = true;
    let error;
    let searchStore;
    let clickedZone;
    let detailsPopup = false;
    let bookingPopup = false;

    async function fetchPhotoZones() {
        try {
            loading = true;

            const response = await fetch("http://localhost:3000/zones", {
                method: "GET"
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
            searchStore.subscribe((model) => searchHandler(model));
        } catch (err) {
            console.error("Error fetching photo zones:", err);
            error = "Failed to load photo zones";
        } finally {
            loading = false;
        }
    }

    function handleDetails(zone) {
        clickedZone = zone;
        detailsPopup = !detailsPopup;
    }

    function handleBooking(zone) {
        clickedZone = zone;
        bookingPopup = !bookingPopup;
    }

    onMount(fetchPhotoZones);
</script>

<div class="pt-15 min-h-screen bg-neutral-100">
    {#if detailsPopup}
        <DetailsPopup zone={clickedZone} onClick={() => {handleDetails(null)}}/>
    {/if}
    {#if bookingPopup}
        <BookingPopup zone={clickedZone} onClick={() => {handleBooking(null)}}/>
    {/if}
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {#if searchStore}
            <div class="w-full flex items-center justify-between mb-6">
                <h2 class="text-2xl font-medium text-neutral-700">Photo zones</h2>
                <SearchBar bind:value={$searchStore.search}/>
            </div>
            {#if loading}
                <div class="text-center py-8">
                    <p class="text-gray-500">Loading photo zones...</p>
                </div>
            {:else if error}
                <div class="text-center py-8">
                    <Error fullWidth>{error}</Error>
                </div>
            {:else if photoZones.length === 0}
                <div class="text-center py-8">
                    <p class="text-neutral-500">No photo zones available</p>
                </div>
            {:else if $searchStore.filtered.length === 0}
                <div class="text-center py-8">
                    <p class="text-neutral-500">No photo zones with this name / style / description</p>
                </div>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {#each $searchStore.filtered as zone (zone.id)}
                        <Card {zone}>
                            <Button color="light" onClick={() => {handleDetails(zone)}}>Details</Button>
                            {#if $isLoggedIn}
                                <Button onClick={() => {handleBooking(zone)}}>Book now</Button>
                            {/if}
                        </Card>
                    {/each}
                </div>
            {/if}
        {/if}
    </main>
</div>
