/* eslint-disable no-param-reassign */
import axios from 'axios';
import userModule from '@/store/modules/user.module';

const service = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}${process.env.VUE_APP_API_URL}`,
  timeout: 60000,
});

service.interceptors.request.use((config) => {
  if (userModule.state.token) {
    config.headers['X-Auth-Token'] = userModule.state.token;
  }
  return config;
}, (error) => Promise.reject(error));

service.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export default service;
