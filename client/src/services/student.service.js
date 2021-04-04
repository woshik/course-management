import request from '@/utils/request';
import Service from './service';

const api = 'student';

export default class Student extends Service {
  constructor() {
    super(api);
  }

  changeStatus(id) {
    return request({
      url: `${this.apiURL}/status/${id}`,
      method: 'patch',
    }).then((result) => result);
  }

  getStudentAndCourseDataById(id) {
    return request({
      url: `${this.apiURL}/course/${id}`,
      method: 'get',
    }).then((result) => result);
  }

  resetPassword(id) {
    return request({
      url: `${this.apiURL}/reset/${id}`,
      method: 'post',
    }).then((result) => result);
  }
}
