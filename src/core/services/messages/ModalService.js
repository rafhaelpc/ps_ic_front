import Application from '@/main';

export default class Modal {
  /**
   *
   * @param {*} options
   */
  static success(options = {}) {
    options.type = 'success';
    options.title ??= 'Tudo certo!';
    return Application.$modal.show(options);
  }

  /**
   *
   * @param {*} options
   * @returns
   */
  static info(options = {}) {
    options.type = 'info';
    options.title ??= 'Informação';
    return Application.$modal.show(options);
  }

  /**
   *
   * @param {*} options
   * @returns
   */
  static warning(options = {}) {
    options.type = 'warning';
    options.title ??= 'Alerta!';
    return Application.$modal.show(options);
  }

  /**
   *
   * @param {*} options
   * @returns
   */
  static danger(options = {}) {
    options.type = 'danger';
    options.title ??= 'Ops, ocorreu um erro!';
    return Application.$modal.show(options);
  }

  /**
   *
   * @param {*} options
   * @returns
   */
  static confirm(options = {}) {
    options.type = 'confirmation';
    options.title ??= 'Confirmação';
    return Application.$modal.show(options);
  }

  /**
   *
   * @param {*} options
   * @returns
   */
  static confirmDelete(options = {}) {
    options.type = 'confirmation';
    options.title ??= 'Confirmação';
    options.content ??= 'Deseja realmente excluir o registro selecionado?';
    return Application.$modal.show(options);
  }
}
