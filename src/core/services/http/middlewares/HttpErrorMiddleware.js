import { ToastService, ModalService } from '@/core/services/messages';

export default class HttpErrorMiddleware {
  #http = null;

  /**
   *
   * @param {*} http
   */
  constructor(http) {
    this.#http = http;
  }

  /**
   *
   * @param {*} error
   */
  async onRequestError(error) {
    this.checkErrorMessage(error);
    throw error;
  }

  /**
   *
   * @param {*} error
   */
  async onResponseError(error) {
    this.checkErrorMessage(error);
    throw error;
  }

  /**
   *
   * @param {*} error
   */
  checkErrorMessage(error) {
    if (error.message.includes('timeout')) {
      ToastService.error('O servidor está demorando muito para responder.');
    } else if (error.message.includes('Network Error')) {
      ToastService.error('Não foi possível conectar-se ao servidor');
    } else if (error.response) {
      switch (error.response.status) {
        case 400:
          return this.badRequestError(error);
        case 404:
          return this.notFoundError(error);
        case 405:
          return this.methodNotAllowed(error);
        case 422:
          return this.unprocessableEntity(error);

        default:
          throw error;
      }
    }
  }

  /**
   *
   */
  badRequestError(error) {
    if (!error.response.data) {
      ModalService.danger({
        content: 'Por favor, verifique os dados informados.'
      });

      return;
    }

    const responseData = JSON.parse(error.response.data);
    let content = responseData.message;

    if (Array.isArray(content)) {
      const ulElement = document.createElement('ul');
      content.forEach(message => {
        this._addListElement(ulElement, message);
      });

      content = ulElement.outerHTML;
    }

    ModalService.danger({
      content
    });
  }

  /**
   *
   */
  notFoundError() {
    ToastService.error('Registro ou URL não encontrada.');
  }

  /**
   *
   * @param {*} error
   */
  methodNotAllowed(error) {
    let message = 'Operação não suportada.';

    if (error.response.data) {
      const responseData = JSON.parse(error.response.data);
      message = responseData.message || message;
    };

    ToastService.error(message);
  }

  /**
   *
   * @param {*} error
   */
  unprocessableEntity(error) {
    if (!error.response.data) {
      ModalService.danger({
        content: 'Por favor, verifique os dados informados.'
      });

      return;
    }

    const responseData = JSON.parse(error.response.data);
    let content = responseData.message;

    if (typeof responseData.errors === 'object') {
      content = responseData.errors;

      const ulElement = document.createElement('ul');

      Object.values(content).forEach(fieldErrors => {
        fieldErrors.forEach(message => {
          this._addListElement(ulElement, message);
        });
      });

      content = ulElement.outerHTML;
    }

    ModalService.danger({
      content
    });
  }

  /**
   *
   * @param {*} ulElement
   * @param {*} content
   */
  _addListElement(ulElement, content) {
    const liElement = document.createElement('li');
    liElement.innerHTML = content;
    ulElement.appendChild(liElement);
  }
}
