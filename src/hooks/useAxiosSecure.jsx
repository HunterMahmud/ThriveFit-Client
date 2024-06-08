import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useAuthProvider from './useAuthProvider';


const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'https://thrive-fit-server.vercel.app',
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useAuthProvider();
    // req stpo by interceptor and add header info to the request
    axiosSecure.interceptors.request.use((config)=>{
        const token = localStorage.getItem("access-token");
        // console.log(token);
        config.headers.authorization = `Bearer ${token}`;
        // console.log("req stopped by interceptor");
        return config;
    },(err)=>{
        //do something when error
        return Promise.reject(err);
    });

    // intercepts 401 and 403 status code
    axiosSecure.interceptors.response.use(
       (res)=>{
        return res;
       } ,
       async(err)=>{
        // console.log(err);
        const status = err?.response?.status;
        // status 401 and 403 logout the use and navigate to login page
        // console.log(status);
        if(status === 401 || status === 403){
            await logOut()
            navigate('/login')
        }
        return Promise.reject(err);
       }
    )
    return axiosSecure;
};

export default useAxiosSecure;