<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr role="row">
          <table-column v-for="(column, indexHeader) in columns"
                        :key="indexHeader"
                        :store-name="storeName"
                        :index="indexHeader"
                        :column="column"
          />
          <th v-if="hasActions" class="actions">
            Ações
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-for="(record, indexRecord) in tableCollection" :key="indexRecord">
          <tr>
            <td v-for="(column, indexBody) in tableColumns"
                :key="indexBody"
                :style="column.minWidth ? `min-width: ${column.minWidth}px` : null"
            >
              <slot v-if="checkIfHasSlot(column.field)" :name="column.field" :record="record" :index="indexRecord" />
              <span v-else :title="column.hint" @mouseover="setColumnHint(column, $event)">{{ format(get(record, column.field), column.format) }}</span>
            </td>

            <td v-if="hasActions" class="actions">
              <div>
                <slot name="actions" :record="record"></slot>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

</template>

<script>
import TableColumn from './TableColumn.vue';
import String from '@/core/helpers/StringHelper';
import { upperFirst, get } from 'lodash';
import { markRaw } from 'vue';

export default {
  name: 'BaseTable',
  components: { TableColumn },
  props: {
    list: {
      type: Object,
      default: null
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },

    collection: {
      type: Array,
      default() {
        return [];
      }
    },

    storeName: {
      default: null
    }

  },

  data() {
    return {
      tableCollection: this.collection,
      tableColumns: this.columns
    };
  },

  computed: {
    /**
     *
     */
    hasActions() {
      return !!this.$slots.actions;
    },

    /**
     *
     */
    columnsCount() {
      let count = this.columns.length;

      if (this.hasActions) {
        count += 1;
      }

      return count;
    },

    baseList() {
      return markRaw(this.list);
    }

  },

  watch: {
    collection: {
      immediate: true,
      handler() {
        this.tableCollection = this.collection;
      }
    }
  },

  methods: {
    /**
     *
     */
    get(object, field) {
      return get(object, field);
    },

    /**
     *
     */
    setColumnHint(column, event) {
      if (event.target.offsetWidth > event.target.parentElement.offsetWidth) {
        column.hint = event.target.innerText;
      }

      return null;
    },

    /**
     *
     */
    checkIfHasSlot(name) {
      return Boolean(this.$slots?.[name]);
    },

    /**
     *
     */
    format(value, format = null) {
      if (format) {
        return String[`format${upperFirst(format)}`](value);
      }

      return value;
    }
  }

};
</script>
