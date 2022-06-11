import { ToastService } from '@/core/services/messages';
import { cloneDeep } from 'lodash';

export default {
  /**
   *
   * @param {*} id
   */
  async createRecord(record) {
    let attributes = cloneDeep(record);

    attributes = await this.beforeSave(attributes);

    try {
      const response = await this.request.post('', attributes);

      ToastService.success('Registro cadastrado com sucesso!');

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  /**
   *
   * @param {*} attributes
   * @returns
   */
  async beforeSave(attributes) {
    return attributes;
  }
};
