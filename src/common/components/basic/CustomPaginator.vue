<template>
  <div class="paginator-container">
    <div class="paginator-info">
      <span>Exibindo {{ info.start }}-{{ info.end }} de {{ info.total }} resultados</span>
    </div>

    <prime-vue-paginator ref="component" :rows="rows" :total-records="totalRecords" @page="onPage($event)" />
  </div>
</template>

<script>
import Paginator from 'primevue/paginator';

export default {
  name: 'CustomPaginator',
  components: {
    PrimeVuePaginator: Paginator
  },
  props: {
    rows: {
      type: Number,
      required: true
    },
    totalRecords: {
      type: Number,
      required: true
    },
    pageLinkSize: {
      type: Number,
      default: 4
    }
  },
  emits: ['page'],
  data() {
    return {
      info: {
        start: 1,
        end: 10,
        total: 10
      }
    };
  },
  mounted() {
    this.updateInfo();
  },

  watch: {
    totalRecords: {
      async handler() {
        await this.$nextTick();
        this.updateInfo();
      }
    }
  },

  methods: {
    /**
     *
     */
    onPage(event) {
      this.updateInfo();
      this.$emit('page', event);
    },

    /**
     *
     */
    resetPage() {
      this.$refs.component.d_first = 0;
      this.updateInfo();
      this.$forceUpdate();
    },

    /**
     *
     */
    updateInfo() {
      const component = this.$refs.component;
      const start = component.page * component.rows + 1;
      let end = start + component.rows - 1;
      const total = component.totalRecords;

      if (end > total) {
        end = total;
      }

      this.info = {
        start,
        end,
        total
      };
    }
  }
};
</script>
