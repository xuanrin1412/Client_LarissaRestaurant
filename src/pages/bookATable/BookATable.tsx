import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import dayjs from 'dayjs'
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { Star1 } from "../../assets/starButton/star1";
import { Star2 } from "../../assets/starButton/star2";
import { Star3 } from "../../assets/starButton/star3";
import { Star4 } from "../../assets/starButton/star4";
import { Star5 } from "../../assets/starButton/star5";
import { Star6 } from "../../assets/starButton/star6";
import { apiBookATable } from "../../API/api";
import { IUserInfo } from "../../common/types/userInfo";
import { useAppSelector } from "../../Redux/store";
import { Reserved } from "../../common/types/bookATable";
// import Dish from "../../assets/dish.png"

const options = [
    { value: 'Gần cửa sổ' },
    { value: 'Sân lớn' },
    { value: 'Sofa' },
    { value: 'Bàn cao' },
];
const times = [
    { value: '8:00 AM' },
    { value: '9:00 AM' },
    { value: '10:00 AM' },
    { value: '11:00 AM' },
    { value: '12:00 AM' },
    { value: '1:00 PM' },
    { value: '2:00 PM' },
    { value: '3:00 PM' },
    { value: '4:00 PM' },
    { value: '5:00 PM' },
    { value: '6:00 PM' },
    { value: '7:00 PM' },
];

const BookATable: React.FC = () => {
    const initial = {
        date: "",
        time: "",
        totalPerson: undefined,
        space: "",
        note: "",
    }

    const [data, setData] = useState<Reserved>(initial)
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>();
    console.log(formattedDate);

    const [numberPerson, setNumberPerson] = useState<string | number>("")
    const [selectSpace, setSelectSpace] = useState<string>()
    const [chooseTime, setChooseTime] = useState<string>()
    const [note, setNote] = useState<string>()

    const [toggleSelectOptions, setToggleSelectOptions] = useState<boolean>(false)
    // const [flag, setFlag] = useState<boolean>(false)

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setStartDate(date)
            setFormattedDate(dayjs(date).format('DD/MM/YYYY'));
        }
    };
    const userAccount: IUserInfo | undefined = useAppSelector((state) => state.user.userInfo)
    const showDataReservation = (data: Reserved) => {
        // if(flag){
        //     return toast("Bạn đã đặt lịch ")
        // }
        if (!startDate) {
            return toast.error(<span className="text-primary">Hãy chọn ngày !</span>)
        }
        if (!chooseTime) {
            return toast.error(<span className="text-primary">Hãy chọn thời gian !</span>)
        }
        if (!numberPerson) {
            return toast.error(<span className="text-primary">Hãy nhập số lượng người !</span>)
        }
        if (!selectSpace) {
            return toast.error(<span className="text-primary">Hãy chọn không gian !</span>)
        }
        // setFlag(true)

        if (userAccount) {
            apiBookATable({ userInfo: userAccount, bookingInfo: data })
                .then(res => {
                    setStartDate(null)
                    setChooseTime("")
                    setNumberPerson("")
                    setSelectSpace("")
                    setNote("")
                    toast("Thank you ! We will contact you soon")
                    console.log("res", res);
                })
                .catch(error => {
                    console.log("Error Fetching apiBookATable", error);
                    return toast.error(error.response.data.message)
                })
            console.log("data", data);
        } else {
            toast.error("Hãy đăng nhập vào tài khoản để đặt bàn online!!!")
        }
    }

    useEffect(() => {
        setData({
            date: dayjs(startDate).format('DD/MM/YYYY'),
            time: chooseTime || "",
            totalPerson: numberPerson || "",
            space: selectSpace || "",
            note: note || "",
        });
        const handleCloseModal = () => {
            setToggleSelectOptions(false)
        }
        document.addEventListener("click", handleCloseModal)

        return () => {
            document.removeEventListener("click", handleCloseModal)
        }
    }, [startDate, numberPerson, chooseTime, selectSpace, note, setData]);


    return <div className="mt-header w-full flex justify-center mb-20">
        <div className="w-3/4 mx-0">
            <div className="flex flex-col items-center lg:flex-row justify-between mt-10  mb-10 space-y-1 lg::space-y-0">
                {/* CHOOSE DATE */}
                <div className={`${startDate ? "bg-primary border-2 border-black" : "bg-black "} px-4 py-2 h-[40px] mt-1  text-white flex items-center space-x-2 w-full lg:w-[250px]`}>
                    <div className="">Ngày</div>
                    <DatePicker
                        className={`${startDate ? "bg-primary react-datepicker-ignore-onclickoutside-1" : "bg-black react-datepicker-ignore-onclickoutside"}  outline-none text-center`}
                        placeholderText="Chọn ngày"
                        selected={startDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                    />
                </div>
                {/* TOTAL PERSON */}
                <div className={`${numberPerson ? "bg-primary  border-2 border-black" : " bg-black"} flex items-center`}>
                    <div className={`${numberPerson ? "bg-primary" : " bg-black"} text-nowrap px-4 py-2 text-white`}>Tổng khách</div>
                    <input value={numberPerson} type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumberPerson(e.target.value)} placeholder="Nhập số người"
                        className={`${numberPerson ? "bg-primary" : " bg-black"} w-full lg:w-[150px] text-white outline-none`} />
                </div>
                {/* cHOOSE SPACE */}
                <div className={`${selectSpace ? "bg-primary border-2 border-black" : "bg-black"} relative px-4 py-2  text-white flex items-center w-full  lg:w-[250px]`}>
                    <div onClick={(e) => {
                        setToggleSelectOptions(!toggleSelectOptions)
                        e.stopPropagation()
                    }} className="w-full flex items-center">
                        <div className={`${selectSpace ? "bg-primary " : ""} flex-1`}>{selectSpace || "Chọn không gian"}</div>
                        <div className={` ${toggleSelectOptions ? "transform rotate-180  duration-150" : "transform rotate-0  duration-150"}`}>
                            <FaAngleDown />
                        </div>
                    </div>
                    {toggleSelectOptions &&
                        <div className=" absolute -bottom-[168px] w-full left-0 bg-black text-white box-shadow">
                            {options.map((item, index) => (
                                <div onClick={() => setSelectSpace(item.value)} key={index} className={`${selectSpace === item.value ? "bg-primary" : ""} hover:bg-gray-500 border-b  px-4  py-2`}>{item.value}</div>
                            ))}
                        </div>}
                </div>
            </div>
            {/* TIMES */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4  text-center">
                {times.map((item, index) => (
                    <div onClick={() => setChooseTime(item.value)} key={index} className={`${item.value === chooseTime ? "bg-primary text-white" : ""} px-4 py-2 border-2 border-black`}>{item.value}</div>
                ))}
            </div>
            {/* NOTE */}
            <div className="flex justify-center mt-8">
                <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add your note...." className="w-full lg:w-2/3 mx-auto p-4 min-h-20 max-h-80 border-2 rounded-none border-black focus:outline-none focus:border-primary" name="" id=""></textarea>
            </div>
            {/* BUTTON SUBMIT */}
            <div className="flex justify-center mt-20 cursor-pointer ">
                <div onClick={() => showDataReservation(data)} className=" w-full lg:w-1/5 text-center">
                    <button className="btnReservation">
                        Đặt bàn
                        <div className="star-1">
                            <Star1 />
                        </div>
                        <div className="star-2">
                            <Star2 />
                        </div>
                        <div className="star-3">
                            <Star3 />
                        </div>
                        <div className="star-4">
                            <Star4 />
                        </div>
                        <div className="star-5">
                            <Star5 />
                        </div>
                        <div className="star-6">
                            <Star6 />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>;
}
export default BookATable;
