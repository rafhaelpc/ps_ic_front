
export default {
  /**
   *
   * @returns
   */
  async getCollection(options = {}, path = '') {
    const params = this._getParamsFromOptions(options);

    try {
      const response = await this.request.get(path, { params });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this._saveOptions(options);
    }
  },

  /**
   *
   * @param {*} options
   * @returns
   */
  _getParamsFromOptions(options = {}) {
    return {
      page: this._getPage(options),
      sort: this._getSort(options),
      limit: this._getLimit(options),
      all: options.all || null,
      ...this._getFilter(options)
    };
  },

  /**
   *
   * @param {*} options
   * @returns
   */
  _getLimit(options) {
    return options.limit ?? null;
  },

  /**
   *
   * @param {*} options
   * @returns
   */
  _getPage(options) {
    return options.page ?? null;
  },

  /**
   *
   * @param {*} options
   * @returns
   */
  _getSort(options) {
    const storeName = options.storeName || null;
    options.sort = options.sort || this.getFromStore('sortOptions', storeName) || this.pageSort;

    if (options.sort) {
      return `${options.sort.field}:${options.sort.type}`;
    }

    return null;
  },

  /**
   *
   * @param {*} options
   */
  _getFilter(options) {
    const storeName = options.storeName || null;
    return options.filter || this.getFromStore('filterOptions', storeName) || null;
  },

  /**
   *
   * @param {*} options
   */
  _saveOptions(options) {
    if (options.sort) {
      this.dispatchToStore('sort', options.sort, options.storeName);
    }

    if (options.filter) {
      this.dispatchToStore('filter', options.filter, options.storeName);
    }
  }
};
