<script>
  import Counter from "../lib/Counter.svelte";
  import Button from "../lib/Button.svelte";
  
  let currentUser = null;
  let photoZones = [];
  let loading = true;
  let error = "";
  
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

  async function fetchPhotoZones() {
    try {
      loading = true;
      const token = localStorage.getItem("accessToken");

      if (!token) {
        error = "Please log in again.";
      }
      
      const response = await fetch("http://localhost:3000/zones", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        error = data.error || "Failed to fetch zones";
      }
      
      photoZones = data;
    } catch (err) {
      console.error("Error fetching photo zones:", err);
      error = "Failed to load photo zones";
    } finally {
      loading = false;
    }
  }

  function handleLogout() {}
  
  fetchPhotoZones();
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
          <a href="/reservations" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">My reservations</a>
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
      
      <!-- Photo Zones Section -->
      <div class="mt-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Photo Zones</h2>
        
        {#if loading}
          <div class="text-center py-8">
            <p class="text-gray-500">Loading photo zones...</p>
          </div>
        {:else if error}
          <div class="text-center py-8">
            <p class="text-red-500">{error}</p>
            <Button on:click={fetchPhotoZones}>Retry</Button>
          </div>
        {:else if photoZones.length === 0}
          <div class="text-center py-8">
            <p class="text-gray-500">No photo zones available</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each photoZones as zone (zone.id)}
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg font-medium text-gray-900">{zone.name || 'Unnamed Zone'}</h3>
                  {#if zone.description}
                    <p class="mt-2 text-sm text-gray-600">{zone.description}</p>
                  {/if}
                  {#if zone.location}
                    <p class="mt-1 text-sm text-gray-500">📍 {zone.location}</p>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </main>
</div>
