import axios from 'axios';

const appApiAxios = axios.create();

export default async function axiosWrapper(method: string, url: string, data: any = null) {
  return appApiAxios({
    method: method,
    url: 'http://localhost:8080' + url,
    responseType: 'json',
    data: data
  });
}