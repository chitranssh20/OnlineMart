import axios from 'axios' 
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"
const baseURl = 'http://127.0.0.1:8000/';

const axiosInstance = axios.create({
    baseURL: baseURl,
    timeout: 5000,
    headers: {
        // Authorization: localStorage.getItem('access_token')?'JWT ' + localStorage.getItem('access_token'): null,
        'Content-Type': 'application/json',
        // accept: 'applicaton/json',
    },
})
export default axiosInstance