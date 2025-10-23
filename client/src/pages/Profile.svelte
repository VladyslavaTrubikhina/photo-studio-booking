<script>
    import ProfileCard from "../lib/ProfileCard.svelte";
    import {getCurrentUser} from "../utils/usersHelper.js";

    const currentUser = getCurrentUser();
</script>

<div class="pt-12 min-h-screen bg-neutral-50">
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 class="w-full flex justify-center text-2xl font-medium text-neutral-700">Profile</h2>
        <ProfileCard user={currentUser} onDelete={() => {}}></ProfileCard>
    </main>
</div>
