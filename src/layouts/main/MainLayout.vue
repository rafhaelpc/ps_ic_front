<template>
  <layout-header></layout-header>

  <div class="layout-container">
    <div class="page-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import LayoutHeader from './components/LayoutHeader.vue';

export default {
  components: { LayoutHeader },
  name: 'MainLayout'
};
</script>

<style lang="scss">
@import "./assets/scss/main-layout.scss";
</style>
