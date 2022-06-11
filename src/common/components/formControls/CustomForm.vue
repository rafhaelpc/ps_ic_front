<template>
  <loader-container :loading="loading">
    <div class="form-content">
      <slot />
    </div>

    <div class="form-footer">
      <button class="btn btn-light" @click.prevent="onFormCancel">
        Cancelar
      </button>

      <button class="btn btn-primary" @click.prevent="onFormSubmit">
        <material-icon>check</material-icon> Salvar
      </button>
    </div>
  </loader-container>
</template>

<script>
export default {
  name: 'CustomForm',

  props: {
    modelValue: {
      type: Object,
      default() {
        return {};
      }
    },

    service: {
      type: Object,
      required: true
    },

    validation: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      record: this.modelValue,
      loading: false,
      state: null
    };
  },

  beforeMount() {
    this.setFormState();
  },

  async mounted() {
    this.loading = true;

    try {
      if (this.state === 'UPDATE') {
        const id = this.$route.params.id || null;
        await this.getRecord(id);
      }
    } finally {
      this.loading = false;
    }
  },

  methods: {
    /**
     *
     */
    setFormState() {
      this.state = this.$route?.meta?.state || 'CREATE';

      this.$parent.state = this.state;
    },

    /**
     *
     */
    async getRecord(id) {
      const response = await this.service.getRecord(id);
      this.record = response;
      this.$emit('update:modelValue', this.record);
    },

    /**
     *
     */
    goBack() {
      this.$router.go(-1);
    },

    /**
     *
     */
    async onFormCancel() {
      this.goBack();
    },

    /**
     *
     */
    async validateForm() {
      const validation = this.validation || this.$parent.validation;

      if (!validation) {
        return true;
      }

      return await validation.$validate();
    },

    /**
     *
     */
    async onFormSubmit() {
      if (this.loading) {
        return;
      }

      if (!await this.validateForm()) {
        return;
      }

      this.loading = true;

      try {
        switch (this.state) {
          case 'CREATE':
            await this.createRecord();
            break;

          case 'UPDATE':
            await this.updateRecord();
            break;
        }

        this.goBack();
        return Promise.resolve();
      } catch (error) {
        console.error(error);
        this.$emit('error', error.response?.data || error);
      } finally {
        this.loading = false;
      }
    },

    /**
     *
     */
    async createRecord() {
      await this.service.createRecord(this.record);
    },

    /**
     *
     */
    async updateRecord() {
      await this.service.updateRecord(this.record.id, this.record);
    }
  }
};
</script>
