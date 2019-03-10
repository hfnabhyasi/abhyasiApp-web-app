<template lang="pug">
f7-app(:params='f7params')
  // Current View/Router, initial page will be loaded from home.vue component
  f7-view(main='' url='/')
</template>

<script>
import routes from "./routes";

export default {
  data() {
    return {
      f7params: {
        name: "My App",
        id: "com.myapp.test",
        routes
      }
    };
  }
};
</script>
