<template>
  <custom-modal v-model:visible="visible"
                :title="title"
                :type="type"
                :show-footer="showFooter"
                :width="width"
                @confirm="confirmModal"
                @reject="rejectModal"
                @close="rejectModal"
  >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div  v-html="content" />
  </custom-modal>
</template>

<script>

export default {
  name: 'ApplicationModal',

  data() {
    return {
      visible: false,
      title: '',
      type: 'info',
      content: '',
      data: null,
      showFooter: null,
      width: null,
      resolve: null,
      reject: null
    };
  },

  mounted() {
    this.$root.$modal = {
      show: this.show
    };
  },

  methods: {
    /**
     *
     */
    show(options) {
      this.title = options.title ?? '';
      this.type = options.type;
      this.content = options.content;
      this.data = options.data;
      this.showFooter = options.showFooter;
      this.width = options.width || null;
      this.visible = true;

      if (this.type === 'confirmation' || !!this.component) {
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      }
    },

    /**
     *
     */
    confirmModal(result = true) {
      this.resolve(result);
      this.visible = false;
    },

    /**
     *
     */
    rejectModal(cause = false) {
      this.resolve(cause);
      this.visible = false;
    }
  }
};
</script>
