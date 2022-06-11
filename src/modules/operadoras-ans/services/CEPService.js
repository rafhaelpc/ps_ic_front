import ApiClientService from '@/core/services/http/ApiClientService';

export default class CEPService extends ApiClientService {
  config() {
    return {
      resource: 'cep'
    };
  }
}

CEPService.use(['GetRecord']);
