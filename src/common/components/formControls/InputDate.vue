<template>
  <base-input v-bind="$props">
    <div class="input-date-container" :class="{invalid: hasError}">
      <prime-vue-calendar :id="id"
                          ref="calendar"
                          v-model="inputValue"
                          v-mask="'##/##/####'"
                          :input-class="formControlClass"
                          :show-icon="!disabled"
                          :show-on-focus="false"
                          :show-button-bar="true"
                          :manual-input="true"
                          :disabled="disabled"
      />
    </div>
  </base-input>
</template>

<script>
import Calendar from 'primevue/calendar';
import BaseInput from '../base/BaseInput.vue';
import baseInputMixin from '../mixins/baseInputMixin';
import parseJSON from 'date-fns/parseJSON';

const INVALID_DATE = 'Invalid Date';

export default {
  name: 'InputDate',

  components: {
    PrimeVueCalendar: Calendar,
    BaseInput
  },

  mixins: [baseInputMixin],

  computed: {
    formControlClass() {
      let classes = 'form-control';

      if (this.hasError) {
        classes += ' is-invalid';
      }

      return classes;
    }
  },

  watch: {
    modelValue: {
      immediate: true,
      handler(value) {
        if (typeof value === 'string') {
          const date = parseJSON(value);

          if (date !== INVALID_DATE) {
            this.inputValue = date;
          }
        }
      }
    }
  }
};
</script>
