<template>
  <page-header title="Lista de operadoras ANS">
    <template #actions>
      <filter-button :component="filterComponent"></filter-button>

      <router-link :to="{ name: 'about' }" class="btn btn-primary">
        <material-icon>add</material-icon>Novo registro
      </router-link>
    </template>
  </page-header>

  <page-content>
    <data-table v-model="collection" :columns="columns">
      <template #actions>
        <button class="btn btn-warning btn-icon">
          <material-icon>edit</material-icon>
        </button>

        <button class="btn btn-danger btn-icon">
          <material-icon>delete</material-icon>
        </button>
      </template>
    </data-table>
  </page-content>
</template>

<script>
import PageHeader from '@/common/components/PageHeader.vue';
import MaterialIcon from '@/common/components/MaterialIcon.vue';
import PageContent from '@/common/components/PageContent.vue';
import DataTable from '@/common/components/dataTable/DataTable.vue';
import FilterButton from '@/common/components/FilterButton.vue';

import OperadoraAnsFilter from './OperadoraAnsFilter.vue';
import { markRaw } from 'vue';

export default {
  components: {
    PageHeader,
    MaterialIcon,
    PageContent,
    DataTable,
    FilterButton
  },
  name: 'OperadoraAnsList',

  data() {
    return {
      filterComponent: markRaw(OperadoraAnsFilter),
      collection: [
        {
          registroAns: '418374',
          cnpj: '11828089000103',
          razaoSocial: 'CAIXA DE ASSISTÊNCIA DO SETOR DE ENERGIA -EVIDA -ASSISTÊNCIA À SAÚDE',
          nomeFantasia: 'E-VIDA',
          modalidade: 'Autogestão',
          logradouro: 'SETOR DE HABITAÇÕES COLETIVAS GEMINADAS',
          nrLogradouro: 'QUADRA 704/705',
          complemento: 'BLOCO C, LOJA 48',
          bairro: 'ASA NORTE',
          cidade: 'Brasília',
          uf: 'DF',
          cep: '70730630',
          ddd: 61,
          telefone: '39668300',
          fax: '39668302',
          email: 'governanca@evida.org.br',
          representante: 'ELI PINTO DE MELO JUNIOR',
          cargoRepresentante: 'PRESIDENTE',
          dataRegistroAns: '12/01/2012'
        }
      ],

      columns: [
        {
          field: 'registroAns',
          title: 'Registro ANS'
        },
        {
          field: 'cnpj',
          title: 'CNPJ'
        },
        {
          field: 'razaoSocial',
          title: 'Razão Social'
        },
        {
          field: 'nomeFantasia',
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
          field: 'nrLogradouro',
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
          field: 'cargoRepresentante',
          title: 'Cargo Representante'
        },
        {
          field: 'dataRegistroAns',
          title: 'Data de registro ANS'
        }
      ]
    };
  }
};
</script>
