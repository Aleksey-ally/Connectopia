import axios from "axios";

export const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            'API-KEY': 'bfc1e1b1-e625-4414-a10c-6bab615df806'
        }
    })

instance.interceptors.request.use((config)=>{
    config.headers['Authorization'] = `Bearer ${localStorage.getItem("sn-token")}`
    return config
})
