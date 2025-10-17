<script>
  import Counter from "../lib/Counter.svelte";
  import Button from "../lib/Button.svelte";
  
  let currentUser = null;
  
  // Get user info from localStorage if available
  if (typeof window !== 'undefined') {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        currentUser = JSON.parse(userData);
      }
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }

  function handleLogout() {}
</script>

<div class="min-h-screen bg-gray-50">
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <h1 class="text-xl font-semibold text-gray-900">My App</h1>
        </div>
        <nav class="flex space-x-8">
          <a href="/" class="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
          <a href="/about" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
          <a href="/example/testValue?key1=value1&key2=value2" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Example</a>
        </nav>
        <div class="flex items-center space-x-4">
          {#if currentUser}
            <span class="text-sm text-gray-700">Welcome, {currentUser.email}</span>
            <Button on:click={handleLogout}>Logout</Button>
          {:else}
            <a href="/login" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Login</a>
          {/if}
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <Counter />
        </div>
      </div>
    </div>
  </main>
</div>
