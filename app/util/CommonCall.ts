import axios from '../api/auth/axios';

export const Get = ( url: string, param: any ) => axios.get( url, param );

export const Put = ( url: string, param: any ) => axios.put( url, param );

export const Post = ( url: string, param: any ) => axios.post( url, param );

export const Delete = ( url: string, param: any ) => axios.delete( url, param );