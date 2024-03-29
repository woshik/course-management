import request from '@/utils/request';
import Service from './service';

const api = 'user';

export default class User extends Service {
  constructor() {
    super(api);
  }

  userUpdate(data) {
    return request({
      url: `${this.apiURL}/update`,
      method: 'patch',
      data,
    }).then((result) => result);
  }

  userUpdatePassword(data) {
    return request({
      url: `${this.apiURL}/password`,
      method: 'patch',
      data,
    }).then((result) => result);
  }

  static login(params) {
    return request({
      url: 'login',
      method: 'post',
      data: params,
    }).then((result) => result);
  }

  static registration(params) {
    return request({
      url: 'registration',
      method: 'post',
      data: params,
    }).then((result) => result);
  }
}
