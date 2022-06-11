<template>
  <prime-vue-toast group="top-right" />
</template>

<script>
import Toast from 'primevue/toast';

export default {
  name: 'CustomToast',
  components: {
    PrimeVueToast: Toast
  }
};
</script>
