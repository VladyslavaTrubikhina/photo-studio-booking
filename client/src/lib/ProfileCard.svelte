<script>
    import Button from "./Button.svelte";
    import {Trash2, Pencil, ArrowDownToLine} from "@lucide/svelte";
    import Input from "./Input.svelte";

    let {user, onDelete} = $props()

    let disabled = $state(true);
    let passwordLabel = $state("Password");

    function handleEdit(){
        disabled = !disabled;
        passwordLabel = passwordLabel === "Password" ? "New password" : "Password"
    }

</script>

<div class="my-6 sm:px-0 flex-col justify-items-center">
    <div class="w-1/2 mb-8 px-7 py-7">
        <div class="w-full mt-6 space-y-4">
            <Input
                    id="email"
                    label="Email"
                    type="email"
                    disabled={disabled}
                    bind:value={user.email}
            />
            <Input
                    id="password"
                    label={passwordLabel}
                    type="text"
                    placeholder="********"
                    disabled={disabled}
                    value={disabled ? "********" : " "}
            />
        </div>
        <div class="flex items-center justify-end mt-6 gap-4">
            <Button color="light" onClick={() => {handleEdit()}}>
                {#if disabled}
                    <Pencil class="h-4 w-4 mr-2"></Pencil>
                    Edit profile
                {:else }
                    <ArrowDownToLine class="h-4 w-4 mr-2"></ArrowDownToLine>
                    Save changes
                {/if}
            </Button>
            <Button color="delete" onClick={() => {onDelete}}>
                <Trash2 class="h-4 w-4 mr-2"></Trash2>
                Delete profile
            </Button>
        </div>
    </div>
</div>