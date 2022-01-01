import axios from 'axios';
import {
    Message
} from 'element-ui';

// Vue.prototype.$http = axios;
axios.defaults.headers['token'] = localStorage.getItem('token') || ''

export const reqInstance = axios.create({
    // 后端接口
    // baseURL: process.env.NODE_ENV === 'production' ? 'http://43.128.61.194:3000/api' : 'http://127.0.0.1:3000/api',

    baseURL: 'http://127.0.0.1:3000/api',
    timeout: 10000,
});


reqInstance.interceptors.response.use(function (response) {
    if (response.status === 200) {
        return response.data;
    }
}, function (error) {
    Message.error(error.message);
});