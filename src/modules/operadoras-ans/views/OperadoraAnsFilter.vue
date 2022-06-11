<template>
  <section class="form">
    <div class="row">
      <div class="col-lg-3">
        <input-text id="registroAns" label="Registro ANS" v-model="filter.registroans" :maxlength="10"></input-text>
      </div>

      <div class="col-lg-4">
        <input-mask id="cnpj" label="CNPJ" v-model="filter.cnpj" mask="##.###.###/####-##"></input-mask>
      </div>

      <div class="col-lg-5">
        <input-text id="modalidade" label="Modalidade" v-model="filter.modalidade" :maxlength="50"></input-text>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <input-text id="razaoSocial" label="Razão Social" v-model="filter.razaosocial" :maxlength="100"></input-text>
      </div>

      <div class="col-lg-6">
        <input-text id="nomeFantasia" label="Nome Fantasia" v-model="filter.nomefantasia" :maxlength="100"></input-text>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-3">
        <input-mask id="cep" label="CEP" v-model="filter.cep" mask="#####-###"></input-mask>
      </div>

      <div class="col-lg-7">
        <input-text id="cidade" label="Cidade" v-model="filter.cidade" :maxlength="100"></input-text>
      </div>

      <div class="col-lg-2">
        <input-text id="uf" label="UF" v-model="filter.uf" :maxlength="2"></input-text>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-7">
        <input-text id="logradouro" label="Logradouro" v-model="filter.logradouro" :maxlength="150"></input-text>
      </div>

      <div class="col-lg-5">
        <input-text id="bairro" label="Bairro" v-model="filter.bairro" :maxlength="150"></input-text>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <input-text id="representante" label="Representante" v-model="filter.representante" :maxlength="150"></input-text>
      </div>

      <div class="col-lg-6">
        <input-text id="cargo_representante" label="Cargo do representante" v-model="filter.cargo_representante" :maxlength="150"></input-text>
      </div>
    </div>

  </section>

</template>

<script>
export default {
  name: 'OperadoraAnsFilter',

  data() {
    return {
      filter: {
        registroans: null,
        cnpj: null,
        modalidade: null,
        razaosocial: null,
        nomefantasia: null,
        cep: null,
        cidade: null,
        uf: null,
        logradouro: null,
        representante: null,
        cargo_representante: null
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 50vw;
}
</style>
