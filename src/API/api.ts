import { IAddTable } from "../pages/manager/managementChild/TableManagement";
import { IFoodAdd, IFoodInfoInFoodOrder } from "../common/types/foods";
import { IFoodsInOrder } from "../pages/order/area/Area";
import { IUserInfo } from "../common/types/userInfo";
import { Reserved } from "../common/types/bookATable";
import axios from "axios"
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

//GET ALL MODERATOR
export const apiGetAllModerator = () => {
    return axios.get(`${baseUrl}/register/getAllModerator`, { withCredentials: true });
};
//CREATE MODERATOR
interface IapicreateModerator {
    userName: string,
    email: string,
    phoneNumber: string,
    address: string,
    password: string,
    role:string
}
export const apiCreateModerator = ({ userName, email, phoneNumber, address, password,role }: IapicreateModerator) => {
    return axios.post(`${baseUrl}/register`, { userName, email, phoneNumber, address, password,role }, { withCredentials: true });
};
//DELETE MODERATOR
export const apiDeleteModerator = (staffId: string|undefined) => {
    return axios.delete(`${baseUrl}/register/${staffId}`, { withCredentials: true })
}


// AREA W TABLE
export const apiGetAreaWithTable = () => {
    return axios.get(`${baseUrl}/area/getAreaWithTable`, { withCredentials: true })
}
//ADD AREA
export const apiAddArea = (areaName: string) => {
    return axios.post(`${baseUrl}/area`, { areaName }, { withCredentials: true })
}
//GET ALL AREA 
export const apiGetAllArea = () => {
    return axios.get(`${baseUrl}/area`, { withCredentials: true })
}
// DELETE AREA 
export const apiDeleteArea = (areaId: string | undefined) => {
    return axios.delete(`${baseUrl}/area/${areaId}`, { withCredentials: true })
}
// Update AREA 
interface IapiUpdateArea {
    idArea: string | undefined,
    areaName: string | undefined,
}
export const apiUpdateArea = ({ idArea, areaName }: IapiUpdateArea) => {
    return axios.put(`${baseUrl}/area/${idArea}`, { areaName }, { withCredentials: true })
}
// CREATE TABLE
export const apiCreateTable = ({
    tableName,
    capacity,
    areaId,
}: IAddTable) => {
    return axios.post(`${baseUrl}/table/`, {
        tableName,
        capacity,
        areaId,
    }, { withCredentials: true })
}
//UPDATE TABLE
interface IUpdateTable {
    tableName: string,
    capacity: number | undefined
}
export const apiUpdateTable = (tableId: string, { tableName, capacity }: IUpdateTable) => {
    return axios.put(`${baseUrl}/table/${tableId}`, { tableName, capacity }, { withCredentials: true })
}
// DELETE TABLE
export const apiDeleteTable = (tableId: string) => {
    return axios.delete(`${baseUrl}/table/${tableId}`, { withCredentials: true })
}

// CATEGORY W FOOD 
export const apiGetCategoryWFood = () => {
    return axios.get(`${baseUrl}/category/getCategoryWithFood`, { withCredentials: true })
}
// DELETE FOOD
export const apiDeleteFood = (foodId: string | undefined) => {
    return axios.delete(`${baseUrl}/food/${foodId}`, { withCredentials: true })
}
// GET ONE FOOD 
export const apiGetOneFood = (foodId: string | undefined) => {
    return axios.get(`${baseUrl}/food/find/${foodId}`, { withCredentials: true })
}

// UPDATE FOOD
export const apiUpdateFoodItem = (_id: string | undefined, { categoryId, foodName, description, picture, costPrice, revenue, favourite }: IFoodAdd,) => {
    return axios.put(`${baseUrl}/food/${_id}`, {
        categoryId,
        foodName,
        description,
        picture,
        costPrice,
        revenue,
        favourite
    }, { withCredentials: true })
}


// ALL CATEGORY
export const apiGetAllCategory = () => {
    return axios.get(`${baseUrl}/category`, { withCredentials: true })
}
//ADD CATEGORY
export const apiAddCategory = (categoryName: string) => {
    console.log("categoryName when call apiAddCategory", categoryName);
    return axios.post(`${baseUrl}/category`, { categoryName }, { withCredentials: true })
}
//DELETE CATEGORY
export const apiDeleteCategory = (idCategory: string | undefined) => {
    console.log("idCategory when call apiDeleteCategory", idCategory);
    return axios.delete(`${baseUrl}/category/${idCategory}`, { withCredentials: true })
}
//UPDATE CATEGORY
interface IapiUpdateCategory {
    idCategory: string | undefined,
    categoryName: string | undefined
}
export const apiUpdateCategory = ({ idCategory, categoryName }: IapiUpdateCategory) => {
    return axios.put(`${baseUrl}/category/${idCategory}`, { categoryName }, { withCredentials: true })
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

// GET USER INFOf
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

export const apiCheckOrderPayment = (orderId: string | undefined) => {
    return axios.post(`http://localhost:3004/transaction-status`, { orderId },)
}



// GET All FOOD 
export const apiGetAllFoods = () => {
    return axios.get(`${baseUrl}/food`, { withCredentials: true })
}
export const apiAddFoods = ({ categoryId,
    foodName,
    description,
    picture,
    costPrice,
    revenue,
    favourite }: IFoodAdd) => {
    console.log("foodInfo apiAddFoods api", {
        categoryId,
        foodName,
        description,
        picture,
        costPrice,
        revenue,
        favourite
    });

    return axios.post(`${baseUrl}/food`, {
        categoryId,
        foodName,
        description,
        picture,
        costPrice,
        revenue,
        favourite
    }, { withCredentials: true })
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
        avatar: string | undefined,
        userName: string | undefined,
        email: string | undefined,
        phoneNumber: string | undefined,
        address: string | undefined,
    }
}
export const apiUpdateProfile = ({ id, body }: IapiUpdateProfile) => {
    console.log("dataaaa", id, body);
    return axios.put(`${baseUrl}/register/${id}`, body, { withCredentials: true })
}


// CREATE BILL
interface IapiCreateBill {
    orderId: string | undefined,
    paymentMethod: string | undefined,
}
export const apiCreateBill = ({ orderId, paymentMethod }: IapiCreateBill) => {
    return axios.post(`${baseUrl}/bill`, { orderId, paymentMethod }, { withCredentials: true })
}
export const apiGetAllBill = () => {
    return axios.get(`${baseUrl}/bill`, { withCredentials: true })
}

export const apiGetOneBill = (id: string) => {
    return axios.get(`${baseUrl}/bill/getOneBill/${id}`, { withCredentials: true })
}

export const apiGetBestSellingFoods = () => {
    return axios.get(`${baseUrl}/order_food/bestSellingDishes`)
}

interface IapiBookATable {
    userInfo: IUserInfo,
    bookingInfo: Reserved
}


// BOOK A TABLE
export const apiBookATable = (payload: IapiBookATable) => {
    return axios.post(`${baseUrl}/book_a_table`, payload, { withCredentials: true })
}
export const apiGetBookATable = () => {
    return axios.get(`${baseUrl}/book_a_table`, { withCredentials: true })
}
export const apiGetOneBookATable = (id: string) => {
    return axios.get(`${baseUrl}/book_a_table/find/${id}`, { withCredentials: true })
}
export const apiUpdateStatusBooking = (id: string, newStatus: string) => {
    console.log("id,newStatus------------", id, newStatus);
    return axios.put(`${baseUrl}/book_a_table/updateStatus/${id}`, { newStatus }, { withCredentials: true })
}

// MOMO PAYMENT
interface IapiMomoPayment {
    orderId: string | undefined,
    amount: number | undefined,
}
export const apiMomoPayment = ({ orderId, amount }: IapiMomoPayment) => {
    console.log("payload apiMomoPayment------------", { orderId, amount });
    return axios.post(`http://localhost:3004/payment`, { orderId, amount }, { withCredentials: true })
}

export const apiUploadImage = (imageLocal: unknown) => {
    console.log("imageLocal", imageLocal);

    return axios.post("http://localhost:3004/uploadImage", { image: imageLocal })
}

interface IApiChangeAvatar {
    avatar: string | undefined,
    idUser: string | undefined
}
export const apiChangeAvatar = ({ avatar, idUser }: IApiChangeAvatar) => {
    console.log("avatar 111", avatar);
    return axios.put(`${baseUrl}/register/updateAvatar/${idUser}`, { avatar })
}



