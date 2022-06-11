<template>
  <section class="data-table">
    <!-- <pv-data-table
      v-if="collection.length > 0"
      :value="collection"
      :scrollable="true"
      :paginator="true"
      :rows="10"
      stripedRows
    >
      <pv-column
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :header="column.title"
        :sortable="true"
      ></pv-column>
    </pv-data-table> -->

    <slot v-if="collection.length > 0">
      <base-table :columns="columns"
                  :collection="collection"
                  :list="this"
                  :store-name="storeName"
                  @edit="editRecord"
                  @delete="deleteRecord"
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
        src="@/assets/no-content.png"
        alt="No content"
      />

      <h3 class="no-content-message">Nenhum registro encontrado!</h3>

      <p class="no-content-question">O que deseja fazer?</p>

      <button class="btn btn-primary" id="1">
        <material-icon>add</material-icon>Cadastrar novo registro
      </button>

      <button class="btn btn-secondary">
        <material-icon>upload</material-icon>Importar arquivo .csv
      </button>
    </div>
  </section>
</template>

<script>
import BaseTable from './BaseTable.vue';
import MaterialIcon from '../MaterialIcon.vue';

export default {
  name: 'DataTable',

  components: {
    MaterialIcon,
    BaseTable
  },

  props: {
    modelValue: {
      type: Array,
      required: true
    },

    columns: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      collection: []
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
    }
  },

  methods: {
    /**
     *
     */
    editRecord(record) {

    },

    deleteRecord(record) {

    }
  }
};
</script>
