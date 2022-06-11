<template>
  <base-input v-bind="$props">
    <template v-if="hasLabelActions" #labelActions>
      <slot name="labelActions" />
    </template>

    <prime-vue-input-text :id="id"
                          v-model="inputValue"
                          class="form-control"
                          :class="[formControlClass, inputClass]"
                          :disabled="disabled"
                          type="text"
                          :autofocus="autofocus"
                          autocomplete="off"
                          :maxlength="maxlength"
    />
  </base-input>
</template>

<script>
import BaseInput from '@/common/components/base/BaseInput.vue';
import baseInputMixin from '@/common/components/mixins/baseInputMixin';
import InputText from 'primevue/inputtext';

export default {
  name: 'InputText',

  components: {
    BaseInput,
    PrimeVueInputText: InputText
  },

  mixins: [baseInputMixin],

  props: {
    maxlength: {
      type: Number,
      required: true
    }
  },

  computed: {
    hasLabelActions() {
      return this.$slots.hasLabelActions;
    }
  }

};
</script>
