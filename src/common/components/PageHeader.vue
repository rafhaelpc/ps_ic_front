<template>
  <div class="page-header">
    <div>
      <h2 class="page-title">{{ title }}</h2>

      <button class="btn btn-link" v-if="showBackOption">
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

    showBackOption: {
      type: Boolean,
      default: false
    }
  }
};
</script>
