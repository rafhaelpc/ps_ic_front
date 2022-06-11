import { ToastService } from '@/core/services/messages';

export default {
  /**
   *
   * @param {*} id
   */
  async deleteRecord(id, params = null) {
    try {
      const response = await this.request.delete(`${id}`, { params });
      ToastService.success('Item excluído com sucesso!');

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
