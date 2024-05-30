import axios from "axios"
// import { IFoodSlice } from "../common/type";
interface IuserLogin {
    userName: string,
    password:string
}
interface result {
    _id: string,
    quantity: number;
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

// CREATE ORDER
export const apiCreateOrder = (userId: string | undefined,tableId: string | undefined,foods: result[] ) =>{
    const payload = {tableId,userId,foods}
    return axios.post(`${baseUrl}/order_food/`,payload, { withCredentials: true })
}

// GET ALL ORDERS
export const apiGetAllOrder = () =>{
    return axios.get(`${baseUrl}/order_food/` ,{ withCredentials: true })
}

// GET ORDERS FROM TABLE ID
export const apiGetOrderFromTableID = (id: string) =>{
    return axios.get(`${baseUrl}/order_food/findOrder/${id}` ,{ withCredentials: true })
}

