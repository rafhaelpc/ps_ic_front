import baseLabelMixin from './baseLabelMixin';

export default {
  mixins: [baseLabelMixin],

  props: {
    modelValue: {
      type: [String, Number, Date, Boolean, Array, Object],
      default: null
    },

    id: {
      type: [String, Number],
      required: true
    },

    customError: {
      type: String,
      default: null
    },

    helperText: {
      type: String,
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    },

    validation: {
      type: Object,
      default: null
    },

    autofocus: {
      type: Boolean,
      default: false
    },

    inputClass: {
      type: [String, Object],
      default: []
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      inputValue: this.modelValue
    };
  },

  computed: {
    /**
     *
     */
    hasError() {
      return this.errors.length > 0;
    },

    /**
     *
     */
    formControlClass() {
      return [
        {
          'is-invalid': this.hasError,
          disabled: this.disabled
        }
      ];
    },

    /**
     *
     */
    errors() {
      if (this.customError && !Array.isArray(this.customError)) {
        return [{ $message: this.customError }];
      }

      return this.validation?.$errors || [];
    },

    hasLabelActions() {
      return !!this.$slots.labelActions;
    }
  },

  watch: {
    /**
     *
     */
    modelValue: {
      immediate: true,
      handler() {
        this.inputValue = this.modelValue;
      }
    },

    /**
     *
     */
    inputValue: {
      deep: true,
      handler() {
        if (this.disabled) {
          return;
        }

        this.$emit('update:modelValue', this.inputValue);
      }
    }
  }
};
