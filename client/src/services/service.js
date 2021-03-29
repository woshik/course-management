import request from '@/utils/request';

export default class Service {
  constructor(apiURL) {
    this.apiURL = apiURL;
  }

  add(data) {
    return request({
      url: this.apiURL,
      method: 'post',
      data,
    })
      .then((result) => result);
  }

  get(params = {}) {
    return request({
      url: this.apiURL,
      method: 'get',
      params,
    }).then((result) => result);
  }

  getById(id) {
    return request({
      url: this.apiURL,
      method: 'get',
      params: {
        id,
      },
    }).then((result) => result);
  }

  update(id, params) {
    return request({
      url: this.apiURL,
      method: 'patch',
      params,
      data: {
        id,
      },
    }).then((result) => result);
  }

  delete(id) {
    return request({
      url: this.apiURL,
      method: 'delete',
      params: {
        id,
      },
    }).then((result) => result);
  }
}
