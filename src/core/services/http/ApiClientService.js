import useGetCollectionMixin from './uses/useGetCollectionMixin';
import useGetRecordMixin from './uses/useGetRecordMixin';
import useCreateRecordMixin from './uses/useCreateRecordMixin';
import useUpdateRecordMixin from './uses/useUpdateRecordMixin';
import useDeleteRecordMixin from './uses/useDeleteRecordMixin';

import axios from 'axios';
import { Service } from 'axios-middleware';

import store from '@/store';

import HttpErrorMiddleware from './middlewares/HttpErrorMiddleware';

export default class ApiClientService {
  #options = null;
  _request = null;
  storeName = null;

  /**
   *
   */
  constructor() {
    this.#setOptions();
    this.#createRequest();
  }

  /**
   *
   */
  get request() {
    return this._request;
  }

  /**
   *
   * @returns
   */
  #setOptions() {
    if (typeof this.config !== 'function') {
      console.warn('O service deve conter um método config().');
      return;
    }

    this.#options = this.config();
    this.storeName = this.#options.storeName || null;

    if (typeof this.#options !== 'object') {
      console.warn('O método config() deve retornar um objeto com as configurações para comunicação com a API.');
    }
  }

  /**
   *
   * @returns
   */
  #createRequest() {
    const headers = {
      'Content-Type': 'application/json'
    };

    let URL = this.#options.baseURL || process.env.VUE_APP_BASE_URL || 'http://localhost:3000';

    if (this.#options.resource) {
      URL += `/${this.#options.resource}`;
    }

    const axiosInstance = axios.create({
      baseURL: URL,
      headers
    });

    const service = new Service(axiosInstance);

    service.register([
      new HttpErrorMiddleware(axiosInstance)
    ]);

    this._request = axiosInstance;
  }

  /**
   *
   * @param {*} key
   * @returns
   */
  getFromStore(key, storeName = null) {
    storeName = storeName ?? this.storeName;

    if (!storeName) {
      return null;
    }

    return store.getters[`${storeName}/${key}`];
  }

  /**
   *
   * @param {*} action
   * @param {*} payload
   * @returns
   */
  dispatchToStore(action, payload = null, storeName = null) {
    storeName = storeName ?? this.storeName;
    return store.dispatch(`${storeName}/${action}`, payload);
  }

  /**
   *
   * @param {*} mixins
   * @returns
   */
  static _getCRUDMixins(mixins) {
    const crudIndex = mixins.findIndex(i => i === 'CRUD');
    mixins.splice(crudIndex, 1);
    mixins.push('GetCollection');
    mixins.push('GetRecord');
    mixins.push('CreateRecord');
    mixins.push('UpdateRecord');
    mixins.push('DeleteRecord');
    return mixins;
  }

  /**
   *
   * @param {*} mixins
   */
  static use(mixins) {
    if (!Array.isArray(mixins)) {
      mixins = [mixins];
    }

    if (mixins.find(i => i === 'CRUD')) {
      mixins = this._getCRUDMixins(mixins);
    }

    const availableMixins = {
      GetCollection: useGetCollectionMixin,
      GetRecord: useGetRecordMixin,
      CreateRecord: useCreateRecordMixin,
      UpdateRecord: useUpdateRecordMixin,
      DeleteRecord: useDeleteRecordMixin
    };

    mixins.forEach(mixin => {
      if (typeof availableMixins[mixin] === 'function') {
        Object.assign(this.prototype, availableMixins[mixin](this.prototype));
      } else {
        console.warn(`Mixin '${mixin}' não encontrado para o model ${this.prototype.constructor.name}`);
      }
    });
  }
}
