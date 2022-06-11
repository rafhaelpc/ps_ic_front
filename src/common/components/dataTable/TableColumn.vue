<template>
  <th class="control sorting">
    {{ column.title }}

    <a v-if="enableSort" href="javascript:;" @click="sortCollection">
      <i class="pi" :class="sortIcon" aria-hidden="true" />
    </a>
  </th>
</template>

<script>
import { SORT_TYPE } from '@/core/types';

export default {
  name: 'TableColumn',
  props: {
    column: {
      type: Object,
      required: true
    },

    index: {
      type: Number,
      default: null
    },

    storeName: {
      type: String,
      default: null
    }
  },

  computed: {

    /**
     *
     */
    enableSort() {
      const storeName = this.storeName || this.list?.model?.storeName;
      return this.list && storeName && this.sortField && this.column.sort !== false;
    },

    /**
     *
     */
    sortOptions() {
      return this.list.model.getFromStore('sortOptions', this.storeName);
    },

    /**
     *
     */
    sortField() {
      return this.column.sortField || this.column.field;
    },

    /**
     *
     */
    list() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'BaseList') {
        parent = parent.$parent;
      }

      return parent;
    },

    /**
     *
     */
    sortIcon() {
      let icon = 'pi-sort-alt';

      if (this.sortOptions && this.sortOptions.field === this.sortField) {
        switch (this.sortOptions.type) {
          case SORT_TYPE.ASC:
            icon = this.column.type === 'number' ? 'pi-sort-numeric-down' : 'pi-sort-alpha-down';
            break;

          case SORT_TYPE.DESC:
            icon = this.column.type === 'number' ? 'pi-sort-numeric-down-alt' : 'pi-sort-alpha-down-alt';
            break;

          default:
            icon = 'pi-sort-alt';
            break;
        }
      }

      return icon;
    }
  },

  methods: {

    /**
     *
     */
    async sortCollection() {
      if (typeof this.list.sortCollection === 'function') {
        await this.list.sortCollection(this.sortField, this.nextSortType());
      }
    },

    /**
     *
     */
    nextSortType() {
      if (this.sortOptions && this.sortOptions.type === SORT_TYPE.ASC) {
        return SORT_TYPE.DESC;
      }

      return SORT_TYPE.ASC;
    }
  }

};
</script>

<style lang="scss" scoped>
.control {
  &.sorting {
    &.first {
      padding-left: 5px;
    }
  }
}
</style>
