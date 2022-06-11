import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { v4 as uuidv4 } from 'uuid';

export default class StringHelper {
  /**
   *
   * @returns
   */
  static uuid() {
    return uuidv4();
  }

  /**
   *
   * @param {*} value
   * @returns
   */
  static formatCurrency(value) {
    if (!value) {
      return '-';
    }

    if (typeof value === 'string') {
      value = Number(value);
    }

    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }

  /**
   *
   * @param {*} value
   * @returns
   */
  static formatPercent(value) {
    if (!value) {
      return '';
    }

    return `${value}%`;
  }

  static formatDate(value) {
    if (!value) {
      return '';
    }

    return format(parseISO(value), 'dd/MM/yyyy');
  }

  static formatCNPJ(value) {
    return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
}
