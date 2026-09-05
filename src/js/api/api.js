import axios from "axios"
const request = axios.create({
    baseURL: '/api',
    timeout: 10000
})
//拦截请求
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = token
        }
        return config

    },
    (error) => {
        return Promise.reject(error)
    }

)
//拦截响应
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        alert('网络连接失败，请检查后端服务是否启动')
        return Promise.reject(error)
    }
)
export default request