import { IFoodsInOrder, ITable } from "../../../pages/order/area/Area";
import { IUserInfo } from "../userInfo";

export interface IAreaManager {
    _id: string
    userName: string;
    createAt: string;
    table: string;
    total: string;
}

export interface IdataBills {
    _id: string,
    paymentMethod: string,
    orderId: {
        createdAt: string,
        note: string,
        statusPayment: string,
        subTotal: number,
        tableId: ITable,
        updatedAt: string,
        userId: IUserInfo
        _id: string,
    },
    foodOrderDetail: {
        orderId: {
            createdAt: string
            note: string
            statusPayment: string
            subTotal: number
            tableId: ITable,
            userId: IUserInfo
            _id: string
        }
    },
    profit: number
}

export interface IbestSellingFoods {
    totalSold: number,
    foodId: string,
    foodName: string,
    picture: string
}

export interface IBillDetails {
    foods: IFoodsInOrder[]
    getOneBill: {
        orderId: {
            _id: string,
            createdAt: string,
            userId: IUserInfo,
            tableId: ITable,
            subTotal: number | undefined,
            status: string,
            foods: IFoodsInOrder[],
            note?: string | undefined
        }
        paymentMethod: string;
        profit: number
    }
}