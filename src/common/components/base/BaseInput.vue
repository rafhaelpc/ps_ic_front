<template>
  <div class="mb-1">
    <base-label :id="id"
                :label="label"
                :validation="validation"
                :hint="hint"
                :loading="loading"
    >
      <template v-if="hasLabelActions" #labelActions>
        <slot name="labelActions" />
      </template>
    </base-label>

    <slot />

    <ul v-if="hasError" class="invalid-feedback">
      <li v-for="error in errors" :key="error.$uid">
        {{ error.$message }}
      </li>
    </ul>

    <small v-if="helperText" class="text-muted">{{ helperText }}</small>
  </div>
</template>

<script>
import baseInputMixin from './../mixins/baseInputMixin';
import baseLabelMixin from './../mixins/baseLabelMixin';
import BaseLabel from './BaseLabel.vue';

export default {
  name: 'BaseInput',
  components: { BaseLabel },
  mixins: [baseLabelMixin, baseInputMixin],
  inheritAttrs: true,
  methods: {
    /**
     *
     */
    showPopoverHint(event) {
      this.$refs.op.toggle(event);
    }
  }
};
</script>
