
import axios  from 'axios';

const axiosPublic = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'https://thrive-fit-server.vercel.app',
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;