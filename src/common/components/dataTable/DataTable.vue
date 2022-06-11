<template>
  <section class="data-table">
    <loader-container :loading="isLoading">
      <filter-info :info="filterInfo" />

      <slot v-if="collection.length > 0">
        <base-table :columns="columns"
                    :collection="collection"
                    :list="this"
                    :store-name="storeName"
        >
          <template v-for="column in columnSlots" #[column]="props">
            <slot :name="column" :record="props.record" />
          </template>

          <template v-if="hasActionsSlot" #actions="props">
            <slot name="actions" :record="props.record" />
          </template>
        </base-table>
      </slot>

      <div v-else class="data-table-empty">
        <img
          class="no-content-image"
          src="@/common/assets/no-content.png"
          alt="No content"
        />

        <h3 class="no-content-message">Nenhum registro encontrado!</h3>

        <slot name="empty"></slot>
      </div>

      <div v-if="showPagination" class="pagination">
        <custom-paginator ref="paginator"
                          :rows="meta.itemsPerPage"
                          :total-records="meta.totalItems"
                          @page="onPageChange"
        />
      </div>
    </loader-container>
  </section>
</template>

<script>
import BaseTable from './BaseTable.vue';
import FilterInfo from './FilterInfo.vue';

export default {
  name: 'DataTable',

  components: {
    BaseTable,
    FilterInfo
  },

  props: {
    modelValue: {
      type: Array,
      required: true
    },

    columns: {
      type: Array,
      required: true
    },

    service: {
      type: Object,
      default: null
    },

    storeName: {
      type: String,
      default: null
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selfLoading: false,
      collection: [],
      filterInfo: [],
      meta: {
        totalItems: null,
        rows: null
      }
    };
  },

  watch: {
    modelValue: {
      immediate: true,
      handler() {
        this.collection = this.modelValue;
      }
    }
  },

  computed: {
    columnSlots() {
      return Object.keys(this.$slots).filter(i => !['actions'].includes(i));
    },

    hasActionsSlot() {
      return !!this.$slots.actions;
    },

    isLoading() {
      return this.loading || this.selfLoading;
    },

    /**
     *
     */
    showPagination() {
      return !!this.meta && this.collection.length > 0;
    }
  },

  mounted() {
    this.getCollection();
  },

  methods: {
    /**
     *
     */
    async getCollection(options = {}) {
      this.selfLoading = true;

      if (!options.page) {
        this.resetPage();
      }

      if (this.storeName) {
        options.storeName = this.storeName;
      }

      try {
        let response = {};

        if (this.$parent.getCollection) {
          response = await this.$parent.getCollection(options);
        } else {
          response = await this.service.getCollection(options);
        }

        this.meta = response.meta;
        this.$emit('load', response);
        this.$emit('update:modelValue', response.content || []);
      } finally {
        this.selfLoading = false;
        await this.updateFilterInfo();
      }
    },

    onPageChange(event) {
      this.getCollection({
        page: event.page + 1
      });
    },

    /**
     *
     */
    resetPage() {
      if (this.$refs.paginator) {
        this.$refs.paginator.resetPage();
      }
    },

    /**
     *
     */
    async updateFilterInfo() {
      await this.$nextTick();

      this.filterInfo = [];
      const filterOptions = this.service.getFromStore('filterOptions', this.storeName);

      if (!filterOptions) {
        return;
      }

      Object.entries(filterOptions).forEach(([key, value]) => {
        const columnName = this.columns.find(i => {
          const filterFields = Array.isArray(i.filterField) ? i.filterField : [i.filterField];
          return i.field === key || filterFields.includes(key);
        })?.title;

        if (columnName && value) {
          this.filterInfo.push({
            title: columnName,
            value
          });
        }
      });
    },

    /**
     *
     */
    async sortCollection(field, type) {
      const sort = { field, type };

      await this.getCollection({ sort });
    },

    /**
     *
     */
    async filterCollection(filter) {
      await this.getCollection({ filter });
    }
  }
};
</script>
