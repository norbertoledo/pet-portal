import axios from 'axios';
import { ACCESS_TOKEN } from '../utils/constants';

export default function Interceptor() {
    // Axios interceptor
    axios.interceptors.request.use(function (config) {
        const {token} = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
        config.headers.authorization =  token;

        return config;
    })

}
