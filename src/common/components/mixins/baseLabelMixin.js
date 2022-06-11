export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    },

    label: {
      type: String,
      default: null
    },

    validation: {
      type: Object,
      default: null
    },

    hint: {
      type: String,
      default: null
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    labelClass() {
      const requiredValidation = this.validation?.required;
      let isRequired = false;

      if (requiredValidation?.$params.type === 'required') {
        isRequired = true;
      } else if (requiredValidation?.$params.type === 'requiredIf') {
        const validation = requiredValidation.$params.prop;
        isRequired = typeof validation === 'function' ? validation() : validation || false;
      }

      return {
        required: isRequired
      };
    }
  },

  methods: {
    /**
     *
     */
    showPopoverHint(event) {
      this.$refs.op.toggle(event);
    }
  }
};
