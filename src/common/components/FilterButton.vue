<template>
  <button class="btn btn-light" @click="toggleFilterPanel">
    <material-icon>search</material-icon>Pesquisar
  </button>

  <overlay-panel ref="op">
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
import MaterialIcon from './MaterialIcon.vue';
import OverlayPanel from './OverlayPanel.vue';

export default {
  components: { OverlayPanel, MaterialIcon },
  name: 'FilterButton',

  props: {
    component: {
      type: Object,
      default: null
    }
  },

  methods: {
    toggleFilterPanel(event) {
      this.$refs.op.toggle(event);
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
    }
  }
};
</script>
