<script>
    import Button from "./Button.svelte";
    import {Plus, X} from "@lucide/svelte";
    import Input from "./Input.svelte";
    import Error from "./Error.svelte";
    import router from "page";
    import {getCurrentUserToken, getCurrentUserId} from "../utils/usersHelper.js";

    let {style = "normal", onClose} = $props();

    const styles = {
        normal: "p-5 bg-white overflow-auto shadow-2xl rounded-xl w-200 m-10 max-h-[90vh]",
    };

    let error = $state();
    let picture = $state();
    let name = $state();
    let zoneStyle = $state();
    let description = $state();
    let pricePerHour = $state();
    let location = $state();

    async function handleCreateZone() {
        const userId = getCurrentUserId();
        const token = getCurrentUserToken();
        try {
            const res = await fetch("http://localhost:3000/zones", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    picture,
                    name,
                    zoneStyle,
                    description,
                    pricePerHour,
                    location
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                error = data.error || "Zone creation failed failed";
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
            <h3 class="text-lg font-medium text-neutral-700 mb-5">Add zone</h3>
            {#if error}
                <Error>{error}</Error>
            {/if}
            <div class="flex flex-col gap-5">
                <Input
                        label="Picture link"
                        placeholder="https://..."
                        bind:value={picture}
                />
                <Input
                        label="Name"
                        placeholder="Name..."
                        bind:value={name}
                />
                <Input
                        label="Style"
                        placeholder="Style..."
                        bind:value={zoneStyle}
                />
                <Input
                        label="Description"
                        placeholder="Description..."
                        bind:value={description}
                />
                <Input
                        label="Price per hour"
                        placeholder="Price per hour..."
                        bind:value={pricePerHour}
                />
                <Input
                        label="Location"
                        placeholder="Location..."
                        bind:value={location}
                />
            </div>
            <div class="my-5 flex justify-end">
                <Button fullWidth onClick={() => {handleCreateZone()}}>
                    <Plus color="#f5f5f5" class="mr-2 w-4 h-4"/>
                    Create zone
                </Button>
            </div>
        </div>
    </div>
</div>