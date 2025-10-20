<script>
  import Button from "./Button.svelte";

  function handleLogout() {}
</script>

<header class="mb-12 bg-neutral-700 shadow-md sticky top-0 z-10">
  <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <div class="flex items-center">
        <h1 class="text-xl font-semibold text-neutral-200">Lumio studio</h1>
      </div>
      <nav class="flex space-x-8">
        <a href="/">Home</a>
        <a href="/reservations">My reservations</a>
        <a href="/example/testValue?key1=value1&key2=value2">Example</a>
      </nav>
      <div class="flex items-center space-x-4">
        <Button on:click={handleLogout} color="light">Logout</Button>
      </div>
    </div>
  </div>
</header>

<style>
  a {
    color: #e5e5e5;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }
  a:hover {
    color: #a1a1a1;
  }
</style>