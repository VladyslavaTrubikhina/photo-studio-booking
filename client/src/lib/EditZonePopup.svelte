<script>
    import Button from "./Button.svelte";
    import {ArrowDownToLine, X} from "@lucide/svelte";
    import Input from "./Input.svelte";
    import Error from "./Error.svelte";
    import {getCurrentUserId, getCurrentUserToken} from "../utils/usersHelper.js";
    import router from "page";

    let {zone, style = "normal", onClose} = $props();

    const styles = {
        normal: "p-5 bg-white overflow-auto shadow-2xl rounded-xl w-200 m-10 max-h-[90vh]",
    };

    let error = $state();

    async function handleUpdateZone() {
        const userId = getCurrentUserId();
        const token = getCurrentUserToken();
        try {
            const res = await fetch(`http://localhost:3000/zones/${zone.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    picture: zone.picture,
                    name: zone.name,
                    zoneStyle: zone.style,
                    description: zone.description,
                    pricePerHour: zone.price_per_hour,
                    location: zone.location
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                error = data.error || "Zone update failed";
            }
            if (res.ok) {
                onClose();
                router("/");
            }
        } catch (err) {
            error = "Unable to reach the server";
            console.error(err);
        }
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
            <h3 class="text-lg font-medium text-neutral-700 mb-5">Edit zone</h3>
            {#if error}
                <Error>{error}</Error>
            {/if}
            {#if zone}
                <div class="flex flex-col gap-5">
                    <Input
                            label="Picture link"
                            placeholder="https://..."
                            bind:value={zone.picture}
                    />
                    <Input
                            label="Name"
                            placeholder="Name..."
                            bind:value={zone.name}
                    />
                    <Input
                            label="Style"
                            placeholder="Style..."
                            bind:value={zone.style}
                    />
                    <Input
                            label="Description"
                            placeholder="Description..."
                            bind:value={zone.description}
                    />
                    <Input
                            type="number"
                            label="Price per hour"
                            placeholder="Price per hour..."
                            bind:value={zone.price_per_hour}
                    />
                    <Input
                            label="Location"
                            placeholder="Location..."
                            bind:value={zone.location}
                    />
                </div>
                <div class="my-5 flex justify-end">
                    <Button fullWidth onClick={() => {handleUpdateZone()}}>
                        <ArrowDownToLine class="h-4 w-4 mr-2"/>
                        Save changes
                    </Button>
                </div>
            {/if}
        </div>
    </div>
</div>