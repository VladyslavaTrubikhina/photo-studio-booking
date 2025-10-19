<script>
  import Button from "./Button.svelte";
  
  let { currentUser, onLogout, appName } = $props();
  let linkStyle = "text-neutral-200 hover:text-neutral-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
</script>

<header class="bg-neutral-700 shadow-sm sticky top-0">
  <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <div class="flex items-center">
        <h1 class="text-xl font-semibold text-neutral-200">{appName}</h1>
      </div>
      <nav class="flex space-x-8">
        <a href="/" class="{linkStyle}">Home</a>
        <a href="/reservations" class="{linkStyle}">My reservations</a>
        <a href="/example/testValue?key1=value1&key2=value2" class="{linkStyle}">Example</a>
      </nav>
      <div class="flex items-center space-x-4">
        {#if currentUser}
          <span class="text-sm text-neutral-200">Welcome, {currentUser.email}</span>
        {/if}
        <Button on:click={onLogout} color="light">Logout</Button>
      </div>
    </div>
  </div>
</header>
