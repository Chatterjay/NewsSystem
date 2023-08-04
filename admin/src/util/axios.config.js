import axios from 'axios'

// 获取token向后端发送
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config;

}, function (error) {
    return Promise.reject(error);
});

// 存入token
axios.interceptors.response.use(function (response) {
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)
    return response;

}, function (error) {
    const { status } = error.response
    if (status === 401) {
        location.href = '#/login'
        return
    }
    return Promise.reject(error);
});