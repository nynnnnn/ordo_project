import Axios, { AxiosRequestConfig } from "axios";

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
          // Cookies.get('access_token');
          return config;
     },
     error => Promise.reject(error)
);

axios.interceptors.response.use(
     response => response,
     error => {
          // const { status } = error.response.data;
          console.log("error : " + error);

          // if (status === 401) {
               // error.headers.setAuthorization(null);
               // localStorage.removeItem('access_token');
               // window.location.href = '/';
          // }
          return Promise.reject(error);
     }
);

export default axios;