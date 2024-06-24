import axios from "axios"
import { IFoodsInOrder } from "../pages/order/area/Area";
import { IFoodInfoInFoodOrder } from "../common/type";
// import { IFoodSlice } from "../common/type";
interface IuserLogin {
    userName: string,
    password: string
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
export const apiGetAreaWithTable = () => {
    return axios.get(`${baseUrl}/area/getAreaWithTable`, { withCredentials: true })
}

// CATEGORY W FOOD 
export const apiGetCategoryWFood = () => {
    return axios.get(`${baseUrl}/category/getCategoryWithFood`, { withCredentials: true })
}

// GET FOOD
export const apiGetFoodInfo = (id: string) => {
    return axios.get(`${baseUrl}/food/find/${id}`, { withCredentials: true })
}

// CREATE ORDER
interface ICreateOrder {
    userId: string | undefined,
    tableId: string | undefined
    note: string | undefined,
    foods: result[]
}

export const apiCreateOrder = ({ userId, tableId, note, foods }: ICreateOrder) => {
    const payload = { tableId, userId, note, foods }
    console.log("payload===============>", payload);
    return axios.post(`${baseUrl}/order_food/`, payload, { withCredentials: true })
}

// GET ALL ORDERS
export const apiGetAllOrder = () => {
    return axios.get(`${baseUrl}/order_food/`, { withCredentials: true })
}

// GET ORDERS FROM TABLE ID
export const apiGetOrderFromTableID = (id: string) => {
    return axios.get(`${baseUrl}/order_food/findOrder/${id}`, { withCredentials: true })
}

// GET USER INFO
export const apiGetUserInfo = (id: string | undefined) => {
    return axios.get(`${baseUrl}/register/find/${id}`, { withCredentials: true })
}

// UPDATE FOODS
interface IapiUpdateFoods {
    id: string | undefined,
    listIdRemoveFoods: string[] | undefined,
    newOrderFoods: IFoodsInOrder[] | undefined,
    listUpdateQuanFoods: {
        foodInfo: IFoodInfoInFoodOrder;
        quan: number;
        totalEachFood: number
    }[] | undefined,
    totalOrder: number | undefined,
}
export const apiUpdateFoods = ({ id, listIdRemoveFoods, newOrderFoods, listUpdateQuanFoods, totalOrder }: IapiUpdateFoods) => {
    return axios.put(`${baseUrl}/order_food/findOrder/${id}`,
        { totalOrder, listIdRemoveFoods, newOrderFoods, listUpdateQuanFoods },
        { withCredentials: true })
}


// UPDATE NOTE 
interface IapiUpdateNote {
    id: string | undefined,
    note: string | undefined
}
export const apiUpdateNote = ({ id, note }: IapiUpdateNote) => {
    return axios.put(`${baseUrl}/order_food/findOrderNote/${id}`,
        { note },
        { withCredentials: true })
}


// UPDATE PROFILE 
interface IapiUpdateProfile {
    id: string | undefined,
    body: {
        userName:string|undefined,
        email:string|undefined,
        phoneNumber:string|undefined,
        address:string|undefined,
    }
}
export const apiUpdateProfile = ({ id, body }:IapiUpdateProfile) => {
    console.log( "dataaaa",id, body);
    return axios.put(`${baseUrl}/register/${id}`,  body , { withCredentials: true })
}


// CREATE BILL

interface IapiCreateBill {
    orderId:string|undefined,
     paymentMethod:string|undefined,
}
export const apiCreateBill = ({ orderId, paymentMethod }:IapiCreateBill) => {
    return axios.post(`${baseUrl}/bill`, { orderId, paymentMethod }, { withCredentials: true })
}

