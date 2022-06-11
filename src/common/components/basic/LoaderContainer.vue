<template>
  <div class="loader" :class="{'absolute': absolute}">
    <button v-if="hasCancelListener && loading" class="p-message-close p-link" type="button" @click="handleCancel">
      <i class="p-message-close-icon pi pi-times" />
    </button>

    <div v-if="loading" class="loading" :class="{'background': showBackground}">
      <div class="load-image">
        <div class="lds-spinner">
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
        </div>
        Carregando...
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  name: 'LoaderContainer',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    showBackground: {
      type: Boolean,
      default: true
    },
    absolute: {
      type: Boolean,
      default: false
    }
  },

  emits: ['cancel'],

  computed: {
    hasCancelListener() {
      return typeof this.$attrs.onCancel === 'function';
    }
  },
  watch: {
    loading: {
      immediate: true,
      handler(val) {
        if (this.absolute) {
          document.documentElement.style.overflow = val ? 'hidden' : 'auto';
        }
      }
    }
  },

  methods: {
    handleCancel() {
      this.$emit('cancel');
    }
  }

};
</script>
