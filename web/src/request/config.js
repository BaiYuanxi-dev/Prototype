import axios from 'axios';
import {
    Message
} from 'element-ui';


export const reqInstance = axios.create({
    // 后端接口
    // baseURL: process.env.NODE_ENV === 'production' ? 'http://43.128.61.194:3000/api' : 'http://127.0.0.1:3000/api',

    baseURL: 'http://127.0.0.1:3000/api',
    timeout: 10000,
});



// axios.interceptors.request.use(
//     config => {
//         if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.Authorization = `token ${store.state.token}`;
//         }
//         return config;
//     },
//     err => {
//         console.log("???")
//         return Promise.reject(err);
//     });

// // http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {

//             switch (error.response.status) {
//                 case 401:
//                     // 返回 401 清除token信息并跳转到登录页面
//                     store.commit(types.LOGOUT);
//                     router.replace({
//                         path: 'login',
//                         query: {
//                             redirect: router.currentRoute.fullPath
//                         }
//                     })
//             }
//         }
//         return Promise.reject(error.response.data) // 返回接口返回的错误信息
//     });


reqInstance.interceptors.response.use(function (response) {
    if (response.status === 200) {
        return response.data;
    }
}, function (error) {
    Message.error(error.message);
});