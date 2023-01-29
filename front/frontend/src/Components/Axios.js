import axios from 'axios' 
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"
const baseURl = 'http://127.0.0.1:8000/';

const axiosInstance = axios.create({
    baseURL: baseURl,
    headers: {
        Authorization: localStorage.getItem('access_token')?'Bearer ' + localStorage.getItem('access_token'): null,
        'Content-Type': 'application/json',
        // accept: 'applicaton/json',
        
    }
    // timeout: 5000
})
export default axiosInstance