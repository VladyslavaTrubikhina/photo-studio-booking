<script>
    import Button from "./Button.svelte";
    import {X, Calendar, Check} from "@lucide/svelte";
    import Input from "./Input.svelte";
    import SummaryRow from "./SummaryRow.svelte";
    import Error from "./Error.svelte";
    import {formatDate} from "../utils/datesHelper.js";
    import {getCurrentUserId, getCurrentUserToken} from "../utils/usersHelper.js";
    import Card from "./Card.svelte";
    import router from "page";

    export let style = "normal";
    export let onClose;

    const styles = {
        normal: "p-5 pb-10 bg-white overflow-auto shadow-2xl rounded-xl w-200 m-10 max-h-[90vh]",
    };

    let selectedZone;
    let date;
    $: formattedDate = formatDate(date);
    let time;
    let duration;
    $: totalPrice = selectedZone ? duration * selectedZone.price_per_hour : 0;
    let error;
    let availableZones = [];
    let disabledInputs = false;

    async function fetchPhotoZones() {
        const token = getCurrentUserToken();

        try {
            const response = await fetch(`http://localhost:3000/zones/available?date=${formattedDate}&time=${time}&duration_hours=${duration}`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`,},
            });

            const data = await response.json();

            if (!response.ok) {
                error = data.error || "Failed to fetch zones";
            }

            availableZones = data;
            disabledInputs = true;
        } catch (err) {
            console.error("Error fetching photo zones:", err);
            error = "Failed to load photo zones";
        }
    }

    async function handleCreateReservation() {
        const userId = getCurrentUserId();
        const token = getCurrentUserToken();

        try {
            const response = await fetch(`http://localhost:3000/reservations`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    photoZoneId: selectedZone.id,
                    name: selectedZone.name,
                    date: formattedDate,
                    time: time,
                    duration_hours: duration
                })
            });

            const data = await response.json();

            if (!response.ok) {
                error = data.error || "Failed to create reservation";
            }
            if (response.ok) {
                router("/reservations")
            }
        } catch (err) {
            console.error("Error creating reservation:", err);
            error = "Failed to load photo zones";
        }
    }

    $: if (date && time && duration) {
        fetchPhotoZones();
    }
</script>

<div class="fixed inset-0 bg-neutral-950 opacity-70 z-20"></div>
<div class="fixed inset-0 flex items-center justify-center z-30">
    <div class={styles[style] || styles.normal}>
        <div class="flex justify-end">
            <Button onClick={onClose} color="light">
                <X class="w-5 h-5"/>
            </Button>
        </div>
        <div class="px-5">
            <h3 class="text-lg font-medium text-neutral-700">Choose date and time</h3>
            <div class="mt-5 flex flex-col md:flex-row items-center gap-2">
                <Input
                        type="date"
                        label="Date"
                        bind:value={date}
                        disabled={disabledInputs}
                />
                <Input
                        type="time"
                        label="Start time"
                        bind:value={time}
                        disabled={disabledInputs}
                />
                <Input
                        type="number"
                        label="Duration (hours)"
                        placeholder="..."
                        bind:value={duration}
                        disabled={disabledInputs}
                />
            </div>
        </div>
        {#if date && time && selectedZone}
            <div class="p-5">
                <h3 class="text-lg font-medium text-neutral-900 mb-2">Summary</h3>
                <SummaryRow name="Zone:">{selectedZone.name}</SummaryRow>
                <SummaryRow name="Date:">{formattedDate}</SummaryRow>
                <SummaryRow name="Start time:">{time}</SummaryRow>
                <SummaryRow name="Duration hours:">{duration || 0} h</SummaryRow>
                <SummaryRow name="Total price:">{totalPrice} €</SummaryRow>
            </div>
            <div class="pr-5 flex justify-end">
                <Button onClick={() => {handleCreateReservation()}}>
                    <Check class="h-4 w-4 mr-2"></Check>
                    Confirm
                </Button>
            </div>
        {/if}
        {#if error}
            <div class="mt-5">
                <Error fullWidth>{error}</Error>
            </div>
        {/if}
        {#if availableZones.length > 0}
            <div class="w-full flex justify-center mt-10 mb-5">
                <h3 class="text-lg font-medium text-neutral-700">These zones are available at selected time</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                {#each availableZones as zone (zone.id)}
                    <Card {zone}>
                        <Button fullWidth onClick={() => {
                            selectedZone = zone;
                            availableZones = [];
                        }}>
                            <Calendar class="h-4 w-4 mr-2"></Calendar>
                            Book for specified date and time
                        </Button>
                    </Card>
                {/each}
            </div>
        {/if}
    </div>
</div>