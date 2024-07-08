import { IUserInfo } from "./userInfo";

export interface IColumnBooking {
    _id: string
    key: number,
    customerName: string,
    date: string,
    note: string,
    time: string,
    space: string,
    totalPerson: string,
    createAt: string,
    status: string,
}
export interface IdataBooking {
    _id: string,
    userInfo: IUserInfo,
    date: string,
    note: string,
    time: string,
    space: string,
    totalPerson: string,
    status: string,
    createdAt: string,
}
export interface Reserved {
    date: string,
    time: string,
    totalPerson: string | number | undefined,
    space: string,
    note: string
}
export interface ISelectStatusBooking {
    text: string,
    idBooking: string
  }