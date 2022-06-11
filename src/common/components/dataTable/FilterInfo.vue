<template>
  <div class="filter-info-container">
    <h5 v-if="filterItems.length > 0" class="container-title">
      Filtro:
    </h5>
    <template v-for="item in filterItems" :key="item.title">
      <div v-if="item.value" class="filter-info-item">
        <!-- <p class="info-title">
          {{ item.title }}:
        </p> -->

        <h6 class="info-value">
          {{ item.title }}
        </h6>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'FilterInfo',
  props: {
    info: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      filterItems: this.info
    };
  },

  watch: {
    info: {
      handler() {
        this.filterItems = this.info;
      }
    }
  }
};
</script>
