<template>
  <div class="page-header">
    <div>
      <div class="title-section">
        <h2 class="page-title">{{ title }}</h2>
        <small v-if="subtitle" class="page-subtitle">{{ subtitle }}</small>
      </div>

      <button class="btn btn-link" v-if="showBackOption" @click="handleBackNavigation">
        <span class="icon material-symbols-outlined"> arrow_back_ios </span>
        Voltar
      </button>
    </div>

    <div class="page-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',

  props: {
    title: {
      type: String,
      required: true
    },

    subtitle: {
      type: String,
      default: null
    },

    showBackOption: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleBackNavigation() {
      this.$router.go(-1);
    }
  }
};
</script>
