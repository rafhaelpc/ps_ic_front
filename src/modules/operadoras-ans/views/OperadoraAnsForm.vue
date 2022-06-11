<template>
  <page-header title="Operadora ANS" :subtitle="getSubtitle()" :show-back-option="true"></page-header>

  <custom-form v-model="record" :service="service">
    <text-section>Dados básicos</text-section>

    <div class="row">
      <div class="col-lg-3">
        <input-text id="registroANS"
                    :maxlength="10"
                    label="Registro ANS"
                    v-model="record.registroans"
                    :validation="validation.record.registroans"
        />
      </div>

      <div class="col-lg-4">
        <input-mask id="cnpj"
                    label="CNPJ"
                    v-model="record.cnpj"
                    mask="##.###.###/####-##"
                    :validation="validation.record.cnpj"
        />
      </div>

      <div class="col-lg-3">
        <input-date id="dataRegistro"
                    label="Data de registro ANS"
                    v-model="record.data_registro"
                    :validation="validation.record.data_registro"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4">
        <input-text id="razaosocial"
                    :maxlength="150"
                    label="Razão Social"
                    v-model="record.razaosocial"
                    :validation="validation.record.razaosocial"
        />
      </div>

      <div class="col-lg-4">
        <input-text id="nomefantasia"
                    :maxlength="150"
                    label="Nome Fantasia"
                    v-model="record.nomefantasia"
                    :validation="validation.record.nomefantasia"
        />
      </div>

      <div class="col-lg-4">
        <input-text id="modalidade"
                    :maxlength="150"
                    label="Modalidade"
                    v-model="record.modalidade"
                    :validation="validation.record.modalidade"
        />
      </div>
    </div>

    <text-section>Endereço</text-section>
    <div class="row">
      <div class="col-lg-2">
        <input-mask id="cep"
                    label="CEP"
                    v-model="record.cep"
                    mask="#####-###"
                    :validation="validation.record.cep"
                    @change="onChangeCEP"
        />
      </div>

      <div class="col-lg-1">
        <input-text id="UF"
                    :maxlength="2"
                    label="UF"
                    v-model="record.uf"
                    :validation="validation.record.uf"
        />
      </div>

      <div class="col-lg-5">
        <input-text id="cidade"
                    :maxlength="150"
                    label="Cidade"
                    v-model="record.cidade"
                    :validation="validation.record.cidade"
        />
      </div>

      <div class="col-lg-4">
        <input-text id="bairro"
                    :maxlength="150"
                    label="Bairro"
                    v-model="record.bairro"
                    :validation="validation.record.bairro"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-lg-5">
        <input-text id="logradouro"
                    :maxlength="250"
                    label="Logradouro"
                    v-model="record.logradouro"
                    :validation="validation.record.logradouro"
        />
      </div>

      <div class="col-lg-2">
        <input-text id="nr_logradouro"
                    :maxlength="10"
                    label="Nº"
                    v-model="record.nr_logradouro"
                    :validation="validation.record.nr_logradouro"
        />
      </div>

      <div class="col-lg-5">
        <input-text id="complemento"
                    :maxlength="50"
                    label="Complemento"
                    v-model="record.complemento"
                    :validation="validation.record.complemento"
        />
      </div>
    </div>

    <text-section>Contato</text-section>
    <div class="row">
      <div class="col-lg-1">
        <input-text id="ddd"
                    :maxlength="2"
                    label="DDD"
                    v-model="record.ddd"
                    :validation="validation.record.ddd"
        />
      </div>

      <div class="col-lg-2">
        <input-text id="telefone"
                    :maxlength="25"
                    label="Telefone"
                    v-model="record.telefone"
                    :validation="validation.record.telefone"
        />
      </div>

      <div class="col-lg-2">
        <input-text id="fax"
                    :maxlength="25"
                    label="FAX"
                    v-model="record.fax"
                    :validation="validation.record.fax"
        />
      </div>

      <div class="col-lg-5">
        <input-text id="email"
                    :maxlength="200"
                    label="E-mail"
                    v-model="record.email"
                    :validation="validation.record.email"
        />
      </div>
    </div>

    <text-section>Representante</text-section>
    <div class="row">
      <div class="col-lg-6">
        <input-text id="representante"
                    :maxlength="100"
                    label="Nome do representante"
                    v-model="record.representante"
                    :validation="validation.record.representante"
        />
      </div>

      <div class="col-lg-6">
        <input-text id="cargo_representante"
                    :maxlength="100"
                    label="Cargo do representante"
                    v-model="record.cargo_representante"
                    :validation="validation.record.cargo_representante"
        />
      </div>

    </div>
  </custom-form>
</template>

<script>
import OperadoraAnsService from '../services/OperadoraAnsService';
import CEPService from '../services/CEPService';
import formValidationMixin from '@/core/mixins/formValidationMixin';
import { required } from '@/core/services/validations/validators';

export default {
  name: 'OperadoraAnsForm',

  mixins: [formValidationMixin],

  data() {
    return {
      service: new OperadoraAnsService(),
      state: null,
      record: {
        registroans: null,
        cnpj: null,
        razaosocial: null,
        nomefantasia: null,
        modalidade: null,
        cep: null,
        uf: null,
        cidade: null,
        bairro: null,
        logradouro: null,
        nr_logradouro: null,
        complemento: null,
        ddd: null,
        telefone: null,
        fax: null,
        email: null,
        representante: null,
        cargo_representante: null,
        data_registro: null
      }
    };
  },

  validations() {
    return {
      record: {
        registroans: { required },
        cnpj: { required },
        razaosocial: { required },
        modalidade: { required },
        cep: { required },
        uf: { required },
        cidade: { required },
        bairro: { required },
        logradouro: { required },
        representante: { required },
        cargo_representante: { required }
      }
    };
  },

  methods: {
    getSubtitle() {
      return this.state === 'CREATE' ? 'Incluir registro' : 'Editar registro';
    },

    async onChangeCEP(value) {
      const service = new CEPService();
      const response = await service.getRecord(this.record.cep);

      if (response.logradouro) {
        this.record.logradouro = response.logradouro;
        this.record.bairro = response.bairro;
        this.record.cidade = response.localidade;
        this.record.uf = response.uf;
        this.record.ddd = response.ddd;
      }
    }
  }

};
</script>
