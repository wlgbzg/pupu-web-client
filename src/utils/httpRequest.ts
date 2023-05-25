// @ts-nocheck
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {useUserTokenStore} from "@/stores/userToken";


interface ResponseData<T> {
    code: number;
    msg: string;
    data: T;
}

class HttpRequest {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            timeout: 5000
        });

        this.axiosInstance.interceptors.request.use(
            config => {
                // 在请求发送之前做一些处理，比如添加请求头
                const userStore = useUserTokenStore()
                config.headers.id = userStore.userToken.id;
                config.headers.token = userStore.userToken.token

                // 测试
                config.headers.id = 'S55UVFY9'
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            response => {
                // 在这里对 response 做一些统一的处理
                const res = response.data as ResponseData<any>;
                if (res.code !== 200) {
                    console.error(res.msg);
                    return Promise.reject(res.msg);
                } else {
                    // console.log('--->http res', res)
                    return res;
                }
            },
            error => {
                console.error(error);
                return Promise.reject(error);
            }
        );
    }

    public async request<T = any>(config: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<ResponseData<T>> = await this.axiosInstance.request(config);
        return response.data;
    }
}

export default new HttpRequest();
