<script>
    import Counter from "../lib/Counter.svelte";
    import Header from "../lib/Header.svelte";
</script>

<div class="min-h-screen bg-neutral-50">
    <Header/>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
            <Counter></Counter>
        </div>
    </main>
</div>

