<template>
  <pv-overlay-panel ref="op">
    <slot></slot>
  </pv-overlay-panel>
</template>

<script>
import OverlayPanel from 'primevue/overlaypanel';

export default {
  name: 'OverlayPanel',

  components: {
    PvOverlayPanel: OverlayPanel
  },

  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    }
  }
};
</script>
