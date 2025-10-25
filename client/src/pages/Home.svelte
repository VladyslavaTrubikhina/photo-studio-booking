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
    import {getCurrentUserIsAdmin} from "../utils/usersHelper.js";
    import {CalendarPlus, Pencil, Plus, Trash2} from "@lucide/svelte";

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

    onMount(fetchPhotoZones);
</script>

<div class="pt-15 min-h-screen bg-neutral-100">
    {#if detailsPopup}
        <DetailsPopup zone={clickedZone} onClick={() => {handleDetails(null)}}/>
    {/if}
    {#if bookingPopup}
        <BookingPopup onClose={() => {bookingPopup = false}}/>
    {/if}
    <main class="max-w-7xl mx-auto py-6 px-6 lg:px-8">
        {#if searchStore}
            <div class="w-full mb-6">
                <h2 class="text-2xl font-medium text-neutral-700 mb-6">Photo zones</h2>
                <div class="w-full md:flex md:items-center md:justify-between">
                    <SearchBar bind:value={$searchStore.search}/>
                    {#if $isLoggedIn && !getCurrentUserIsAdmin()}
                        <div class="flex justify-end mt-6 md:mt-0">
                            <Button color="dark" onClick={() => {bookingPopup = true}}>
                                <CalendarPlus color="#f5f5f5" class="mr-2 w-4 h-4"/>
                                Make reservation
                            </Button>
                        </div>
                    {:else if $isLoggedIn && getCurrentUserIsAdmin()}
                        <div class="flex justify-end mt-6 md:mt-0">
                            <Button color="dark" onClick={() => {bookingPopup = true}}>
                                <Plus color="#f5f5f5" class="mr-2 w-4 h-4"/>
                                Add new photo zone
                            </Button>
                        </div>
                    {/if}
                </div>
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
                            <div class="w-full flex justify-between">
                                <div class="flex justify-center gap-2">
                                    {#if $isLoggedIn && getCurrentUserIsAdmin()}
                                        <Button color="delete" onClick={() => {handleDetails(zone)}}>
                                            <Trash2 class="h-4 w-4"/>
                                        </Button>
                                        <Button color="dark" onClick={() => {handleDetails(zone)}}>
                                            <Pencil class="h-4 w-4"/>
                                        </Button>
                                    {/if}
                                </div>
                                <Button color="light" onClick={() => {handleDetails(zone)}}>Details</Button>
                            </div>
                        </Card>
                    {/each}
                </div>
            {/if}
        {/if}
    </main>
</div>
