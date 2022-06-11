<template>
  <custom-toast />
  <application-modal />
  <main-layout></main-layout>
</template>

<script>
import MainLayout from '@/layouts/main';
import ApplicationModal from './common/components/basic/ApplicationModal.vue';

export default {
  components: { MainLayout, ApplicationModal },
  name: 'App'
};
</script>
