import { ToastService } from '@/core/services/messages';
import { cloneDeep } from 'lodash';

export default {
  /**
   *
   * @param {*} id
   */
  async updateRecord(id, record) {
    let attributes = cloneDeep(record);

    attributes = await this.beforeSave(attributes);

    try {
      const response = await this.request.put(`${id}`, attributes);

      ToastService.success('Registro atualizado com sucesso!');

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
