<template>
  <button class="btn btn-light" @click="toggleFilterPanel">
    <material-icon>search</material-icon>Pesquisar
  </button>

  <overlay-panel ref="op" @show="onShowFilterPanel">
    <form ref="form" class="filter-container" @keypress.enter="handleFilter">
      <div v-if="component" class="filter-content">
        <component :is="component" ref="filter"></component>
      </div>

      <div class="filter-footer">
        <button type="button" class="btn btn-light small" @click="clearFilter">
          Limpar
        </button>

        <button
          type="button"
          class="btn btn-primary small"
          @click="handleFilter"
        >
          Filtrar
        </button>
      </div>
    </form>
  </overlay-panel>
</template>

<script>

export default {

  name: 'FilterButton',

  props: {
    component: {
      type: Object,
      default: null
    },

    storeName: {
      type: String,
      default: null
    }
  },

  emits: ['filter'],

  methods: {
    toggleFilterPanel(event) {
      this.$refs.op.toggle(event);
    },

    async onShowFilterPanel() {
      await this.$nextTick();

      if (this.storeName) {
        const data = this.$store.getters[`${this.storeName}/filterOptions`] || {};
        this.setFilterData(data);
      }

      this.focusOnFirstInput();
    },

    clearFilter() {
      const filterData = this.$refs?.filter?.$data?.filter || null;

      if (filterData) {
        this.$refs.filter.$data.filter = {};
        this.handleFilter();
      }
    },

    handleFilter() {
      const filterData = this.$refs?.filter?.$data?.filter || null;

      if (filterData) {
        this.$emit('filter', filterData);
      }

      this.toggleFilterPanel(false);
    },

    /**
     *
     */
    setFilterData(data) {
      const filterComponent = this.$refs.filter;

      if (filterComponent) {
        filterComponent.$data.filter = data;
      }
    },

    /**
     *
     */
    focusOnFirstInput() {
      const form = this.$refs.form;

      if (form) {
        form.elements[0].focus();
      }
    }
  }
};
</script>
