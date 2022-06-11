import ApiClientService from '@/core/services/http/ApiClientService';

export default class OperadoraAnsService extends ApiClientService {
  config() {
    return {
      resource: 'operadoras-ans',
      storeName: 'app/operadorasAns'
    };
  }
}

OperadoraAnsService.use(['GetCollection', 'GetRecord', 'CreateRecord', 'UpdateRecord', 'DeleteRecord']);
