<script>
  import router from "page";
  import Login from "./pages/Login.svelte";
  import Home from "./pages/Home.svelte";
  import ExampleWithParams from "./pages/ExampleWithParams.svelte";

  let currentRoute = $state("/");
  let Page = $state();
  let context = $state({});

  router("/login", (ctx) => {
      Page = Login;
      currentRoute = ctx.pathname;
  });

  router("/", (ctx) => {
      Page = Home;
      currentRoute = ctx.pathname;
  });

  router("/example/:id", (ctx) => {
    Page = ExampleWithParams;
    currentRoute = ctx.pathname;
    // The entire context is added. It contains the parameters
    // as well as a wealth of information about the request.
    context = ctx;
  });

  router("/login");
  router.start();
</script>

<Page {context} />
