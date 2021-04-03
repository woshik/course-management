import request from '@/utils/request';
import Service from './service';

const api = 'course';

export default class Course extends Service {
  constructor() {
    super(api);
  }

  assignCourse(id, data) {
    return request({
      url: `${this.apiURL}/assign/${id}`,
      method: 'post',
      data,
    }).then((result) => result);
  }

  getAssignStudnet(id) {
    return request({
      url: `${this.apiURL}/assign/${id}`,
      method: 'get',
    }).then((result) => result);
  }
}
