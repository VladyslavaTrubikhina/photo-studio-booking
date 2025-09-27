<script>
  /**
   * Any properties (or attributes) must be retrieved
   * using the `$props()` function. It returns an object
   * that can be destructured
   *
   * @see https://svelte.dev/tutorial/svelte/declaring-props
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring
   *
   */
  let { active } = $props();
</script>

<nav>
  <ul class="flex flex-row gap-4">
    <li><a class:active={active === "/"} href="/">Home</a></li>
    <li><a class:active={active === "/about"} href="/about">About</a></li>
    <li>
      <a
        class:active={active.match("^/example")}
        href="/example/testValue?key1=value1&key2=value2"
        >Example with query parameters</a
      >
    </li>
  </ul>
</nav>

<style>
  ul {
    list-style-type: none;
  }

  a.active {
    font-weight: bold;
  }
</style>
