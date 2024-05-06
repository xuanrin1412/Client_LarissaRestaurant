import axios from "axios"
interface IuserLogin {
    userName: string,
    password:string
}
const baseUrl = "http://localhost:3004/api";

// LOGIN
export const apiLogin = ({ userName, password }: IuserLogin) => {
    return axios.post(`${baseUrl}/login`, {
        userName,
        password
    }, { withCredentials: true });
};

// AREA W TABLE
export const apiGetAreaWithTable = ()=>{
    return axios.get(`${baseUrl}/area/getAreaWithTable`, { withCredentials: true })
}

// CATEGORY W FOOD 
export const apiGetCategoryWFood = ()=>{
    return axios.get(`${baseUrl}/category/getCategoryWithFood`, { withCredentials: true })
}

// GET FOOD
export const apiGetFoodInfo = (id:string) =>{
    return axios.get(`${baseUrl}/food/find/${id}`, { withCredentials: true })
}
