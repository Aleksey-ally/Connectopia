import axios from "axios";

const SOCIAL_NETWORK_API_KEY = process.env.REACT_APP_SOCIAL_NETWORK_API_KEY;

export const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            'API-KEY': SOCIAL_NETWORK_API_KEY
        }
    })

instance.interceptors.request.use((config)=>{
    config.headers['Authorization'] = `Bearer ${localStorage.getItem("sn-token")}`
    return config
})
