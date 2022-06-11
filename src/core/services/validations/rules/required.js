import { required } from '@vuelidate/validators/dist/raw.esm';

export default {
  $validator: required,
  $message: 'Este campo é obrigatório',
  $params: {
    type: 'required'
  }
};
