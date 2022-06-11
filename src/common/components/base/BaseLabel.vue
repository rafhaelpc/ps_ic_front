<template>
  <div v-if="!!label" class="d-flex justify-content-between">
    <div>
      <label class="form-label" :class="labelClass" :for="id">
        {{ label }}
      </label>
      <i v-if="hint" class="hint-icon pi pi-info-circle" @click="showPopoverHint" />
      <i v-if="loading" class="label-loading-icon pi pi-spin pi-spinner" />
    </div>

    <slot name="labelActions" />

    <overlay-panel ref="op" class="popover-hint" :show-close-icon="false">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="hint" />
    </overlay-panel>
  </div>
</template>

<script>
import baseLabelMixin from './../mixins/baseLabelMixin';

export default {
  name: 'BaseLabel',
  mixins: [baseLabelMixin]

};
</script>
