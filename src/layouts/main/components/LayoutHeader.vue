<template>
  <header>
    <img alt="logo" src="@/assets/logo.jpg" />
    <user-info></user-info>
  </header>
</template>

<script>
import UserInfo from './UserInfo.vue';

export default {
  components: { UserInfo },
  name: 'LayoutHeader'
};
</script>
