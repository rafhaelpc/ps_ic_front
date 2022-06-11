<template>
  <prime-vue-dialog v-model:visible="modalVisible"
                    :header="title"
                    :modal="true"
                    :class="modalClass"
                    :breakpoints="{'1200px': '40vw', '960px': '60vw', '600px': '75vw'}"
                    style="'min-width': '30vw'"
                    :style="modalStyle"
                    @hide="onCloseModal"
                    @show="onShowModal"
  >
    <template #header>
      <slot name="header">
        <h5 class="modal-title">
          {{ title }}
        </h5>
      </slot>
    </template>

    <slot />

    <template v-if="showFooter" #footer>
      <slot name="footer">
        <div class="modal-footer-actions">
          <button v-if="isConfirmationModal" class="btn btn-light" @click="handleClose">
            <i class="pi pi-times" /> Não
          </button>

          <button class="btn" :class="confirmButtonClass" autofocus @click="handleConfirm">
            <i class="pi pi-check" /> {{ isConfirmationModal ? 'Sim' : 'OK' }}
          </button>
        </div>
      </slot>
    </template>
  </prime-vue-dialog>
</template>

<script>
import Dialog from 'primevue/dialog';

export default {
  name: 'CustomModal',
  components: {
    PrimeVueDialog: Dialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: 'brand'
    },

    title: {
      type: String,
      default: null
    },

    showFooter: {
      type: Boolean,
      default: true
    },

    width: {
      type: String,
      default: null
    }

  },

  emits: ['update:visible', 'confirm', 'reject', 'close'],

  data() {
    return {
      modalVisible: this.visible,
      done: false
    };
  },

  computed: {
    /**
     */
    modalClass() {
      return [
        this.type
      ];
    },

    modalStyle() {
      return {
        width: this.width
      };
    },

    /**
     */
    isConfirmationModal() {
      return this.type === 'confirmation';
    },

    /**
     */
    confirmButtonClass() {
      switch (this.type) {
        case 'confirmation':
          return 'btn-danger';

        case 'brand':
          return 'btn-primary';
      }

      return `btn-${this.type}`;
    }
  },

  watch: {
    visible(value) {
      this.modalVisible = value;
    },

    modalVisible(value) {
      this.$emit('update:visible', value);
    }
  },

  methods: {
    /**
     */
    onShowModal() {
      this.done = false;
    },

    /**
     */
    onCloseModal() {
      if (this.isConfirmationModal && !this.done) {
        this.$emit('reject');
      }

      this.$emit('close');
    },

    /**
     *
     */
    handleClose() {
      this.modalVisible = false;
    },

    /**
     *
     */
    handleConfirm() {
      if (this.isConfirmationModal) {
        this.done = true;
        this.$emit('confirm');
      }

      this.handleClose();
    }
  }
};
</script>
