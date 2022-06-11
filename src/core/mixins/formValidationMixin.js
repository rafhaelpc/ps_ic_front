import useVuelidate from '@vuelidate/core';

export default {
  data() {
    return {
      validation: useVuelidate()
    };
  },

  methods: {

    /**
     *
     * @returns
     */
    async validateForm() {
      if (!this.validation) {
        return true;
      }

      return await this.validation.$validate();
    }
  }
};
