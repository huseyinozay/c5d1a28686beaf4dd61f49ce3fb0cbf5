<template>
  <div>
    <Header />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
  components: {
    Header,
  },
};
</script>
