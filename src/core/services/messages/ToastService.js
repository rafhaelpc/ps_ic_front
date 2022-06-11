import Application from '@/main';

export default class ToastService {
  static success(message, title = 'Tudo certo!', group = 'top-right') {
    Application.$toast.add({
      severity: 'success',
      summary: title,
      detail: message,
      life: 3000,
      group: group
    });
  }

  static error(message, title = 'Ocorreu um erro!', group = 'top-right') {
    Application.$toast.add({
      severity: 'error',
      summary: title,
      detail: message,
      life: 10000,
      group: group
    });
  }

  static info(message, title = '', group = 'top-right') {
    Application.vue.$toast.add({
      severity: 'info',
      summary: title,
      detail: message,
      life: 3000,
      group: group
    });
  }
}
