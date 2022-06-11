<template>
  <page-header title="Lista de operadoras ANS">
    <template #actions>
      <filter-button :component="filterComponent" :store-name="service.storeName" @filter="handleFilter"></filter-button>

      <router-link :to="{ name: 'operadora-ans.create' }" class="btn btn-primary">
        <material-icon>add</material-icon>Novo registro
      </router-link>
    </template>
  </page-header>

  <page-content>
    <data-table ref="table"
                v-model="collection"
                :columns="columns"
                :service="service"
                :loading="loading"
                :store-name="service.storeName">
      <template #actions="{record} ">
        <button class="btn btn-warning btn-icon" v-tooltip.bottom="'Editar'" @click="editRecord(record)">
          <material-icon>edit</material-icon>
        </button>

        <button class="btn btn-danger btn-icon" v-tooltip.bottom="'Excluir'" @click="deleteRecord(record)">
          <material-icon>delete</material-icon>
        </button>
      </template>

      <template #empty>
        <p class="no-content-question">O que deseja fazer?</p>

        <button class="btn btn-primary" @click="goToCreatePage">
          <material-icon>add</material-icon>Cadastrar novo registro
        </button>
      </template>
    </data-table>
  </page-content>
</template>

<script>
import PageHeader from '@/common/components/basic/PageHeader.vue';
import PageContent from '@/common/components/PageContent.vue';
import FilterButton from '@/common/components/FilterButton.vue';

import OperadoraAnsService from '../services/OperadoraAnsService';

import OperadoraAnsFilter from './OperadoraAnsFilter.vue';
import { markRaw } from 'vue';
import { ModalService } from '@/core/services/messages';

export default {
  components: {
    PageHeader,
    PageContent,
    FilterButton
  },
  name: 'OperadoraAnsList',

  data() {
    return {
      service: new OperadoraAnsService(),
      filterComponent: markRaw(OperadoraAnsFilter),
      loading: false,
      collection: [],

      columns: [
        {
          field: 'registroans',
          title: 'Registro ANS'
        },
        {
          field: 'cnpj',
          title: 'CNPJ',
          format: 'CNPJ'
        },
        {
          field: 'razaosocial',
          title: 'Razão Social'
        },
        {
          field: 'nomefantasia',
          title: 'Nome Fantasia'
        },
        {
          field: 'modalidade',
          title: 'Modalidade'
        },
        {
          field: 'logradouro',
          title: 'Logradouro'
        },
        {
          field: 'nr_logradouro',
          title: 'Nº'
        },
        {
          field: 'complemento',
          title: 'Complemento'
        },
        {
          field: 'bairro',
          title: 'Bairro'
        },
        {
          field: 'cidade',
          title: 'Cidade'
        },
        {
          field: 'uf',
          title: 'UF'
        },
        {
          field: 'cep',
          title: 'CEP'
        },
        {
          field: 'ddd',
          title: 'DDD'
        },
        {
          field: 'telefone',
          title: 'Telefone'
        },
        {
          field: 'fax',
          title: 'FAX'
        },
        {
          field: 'email',
          title: 'E-mail'
        },
        {
          field: 'representante',
          title: 'Representante'
        },
        {
          field: 'cargo_representante',
          title: 'Cargo Representante'
        },
        {
          field: 'data_registro',
          title: 'Data de registro ANS',
          format: 'date'
        }
      ]
    };
  },

  methods: {
    goToCreatePage() {
      this.$router.push({ name: 'operadora-ans.create' });
    },
    /**
     *
     */
    handleFilter(filter) {
      this.$refs.table.filterCollection(filter);
    },

    /**
     *
     */
    editRecord(record) {
      this.$router.push({ name: 'operadora-ans.edit', params: { id: record.id } });
    },

    /**
     *
     */
    async deleteRecord(record) {
      const canDelete = await ModalService.confirmDelete();

      if (canDelete) {
        this.loading = true;
        try {
          await this.service.deleteRecord(record.id);
          this.$refs.table.getCollection();
        } finally {
          this.loading = false;
        }
      }
    }
  }
};
</script>
