<template>
  <main-layout></main-layout>

  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
</template>

<script>
import MainLayout from '@/layouts/main';

export default {
  components: { MainLayout },
  name: 'App'
};
</script>
