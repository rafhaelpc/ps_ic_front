export default {
  /**
   *
   * @param {*} id
   * @returns
   */
  async getRecord(id) {
    const response = await this.request.get(`${id}`);

    return Promise.resolve(response.data || null);
  }
};
