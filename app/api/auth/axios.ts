import Axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const conf: AxiosRequestConfig = {
     baseURL: process.env.NEXT_PUBLIC_API_HOST, //"http://222.108.21.14:8090",
     headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          withCredentials: true,
          timeout: 20000,
     },
     responseType: 'json'
};

const axios = Axios.create(conf);

axios.interceptors.request.use(
     function (config) {
          let access_token:any = localStorage.getItem('access_token');
          if(access_token) {
               config.headers.setAuthorization(`Bearer ${access_token}`);
          }
          return config;
     },
     error => Promise.reject(error)
);

axios.interceptors.response.use(
     response => response,
     error => {
          const { status } = error.response;

          if (status === 403) {
               localStorage.removeItem('access_token');
               Cookies.remove("access_token");
               toast.error('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
               setTimeout(()=> {
                    location.replace('/');
               }, 1000);
          }
          return Promise.reject(error);
     }
);

export default axios;