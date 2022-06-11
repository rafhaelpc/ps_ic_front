<template>
  <base-input v-bind="$props">
    <prime-vue-input-text :id="id"
                          v-model="inputValue"
                          v-mask="mask"
                          class="form-control"
                          :class="[formControlClass, inputClass]"
                          :disabled="disabled"
                          type="text"
                          :autofocus="autofocus"
                          autocomplete="off"
                          @blur="handleBlurEvent"
    />
  </base-input>
</template>

<script>
import BaseInput from './../base/BaseInput.vue';
import InputText from 'primevue/inputtext';
import baseInputMixin from './../mixins/baseInputMixin';

export default {
  name: 'InputMask',

  components: {
    BaseInput,
    PrimeVueInputText: InputText
  },

  mixins: [baseInputMixin],

  props: {
    mask: {
      type: [String, Array],
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  emits: ['blur'],

  methods: {
    /**
     *
     */
    handleBlurEvent() {
      this.$emit('blur');
    }
  }

};
</script>
