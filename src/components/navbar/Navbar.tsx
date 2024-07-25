import { MdOutlineRestaurantMenu, MdOutlineShoppingCart } from "react-icons/md";
import { decreaseQuantityCustomer, deleteOneFoodCustomer, increaseQuantityCustomer, setQuantityFoodInCard } from "../../Redux/foodsCustomer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppSelector } from "../../Redux/store";
import { formatCurrency } from "../../utils/formartCurrency";
import { IdataBooking } from "../../common/types/bookATable";
import { setOpenModalConfirm } from "../../Redux/foodsSlice";
import { scrollCategoryBar } from "../../utils/scrollToTop";
import { IUserInfo } from "../../common/types/userInfo";
import { IoNotificationsSharp } from "react-icons/io5";
import { IFoodSlice } from "../../common/types/foods";
import React, { useEffect, useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { MdTableBar } from "react-icons/md";
const socket = io('http://localhost:3004');
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { Logo } from "../../assets/Logo";
import { FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';
import io from 'socket.io-client';


const Navbar: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const pathname = location.pathname;
    const [toggleNoti, setToggleNoti] = useState<boolean>(false)
    const [openSideBar, setOpenSideBar] = useState<boolean>(false)
    const [showCategoryBar, setShowCategoryBar] = useState<boolean>(false);
    const foodsCustomer = useAppSelector(state => state.foodsCustomer.foodsCustomer)
    console.log("foodsCustomer", foodsCustomer);

    const foods: IFoodSlice[] = useAppSelector((state: RootState) => state.foods.foods);
    const quantityFoodInCard = useAppSelector(state => state.foodsCustomer.quantityFoodInCard)

    const quantityFood = foodsCustomer.reduce((acc, current) => {
        return acc + current.quantity
    }, 0)
    console.log("quantityFood", quantityFood);

    const handleClickMenuWhenHaveFoods = () => {
        if (foods.length > 0) {
            dispatch(setOpenModalConfirm(true))
        } else {
            navigate("/menuOrderTable");
        }
    }

    const handleClickAccountWhenHaveFoods = () => {
        if (foods.length > 0) {
            dispatch(setOpenModalConfirm(true))
        } else {
            navigate("/account");
        }
    }

    const handleClickOrderWhenHaveFoods = () => {
        if (foods.length > 0) {
            dispatch(setOpenModalConfirm(true))
        } else {
            navigate("/order");
        }
    }
    const userAccount: IUserInfo | null = useAppSelector(state => state.user.userInfo)


    interface INotiList {
        message: string,
        bookingInfo: IdataBooking
    }

    const [notiList, setNotiList] = useState<INotiList[]>([])
    const [viewCart, setViewCart] = useState<boolean>(false)
    const totalBill = useAppSelector(state => state.foodsCustomer.totalOrderCustomer)
    console.log(totalBill);
    const totalOrderCustomer = useAppSelector(state => state.foodsCustomer.totalOrderCustomer)
    const [notiOrder, setNotiOrder] = useState<INotiList[]>([])
    useEffect(() => {
        if (userAccount?.role === "admin" || userAccount?.role === "moderator") {
            socket.on('newBooking', (newBooking) => {
                setNotiList((prevList) => [...prevList, newBooking])
                console.log("newBooking==========12=====", newBooking);
                toast.success(newBooking.message);
            });
        }
        localStorage.setItem("noti-order", JSON.stringify(notiList));
        const notiString = localStorage.getItem("noti-order");

        if (notiString !== null) {
            const noti = JSON.parse(notiString);
            console.log("noti:::::", noti);
            setNotiOrder(noti)
        } else {
            console.log("No notifications found in localStorage.");
        }
        // setNotiOrder(noti)


        const handleScroll = () => scrollCategoryBar({ setShowCategoryBar });

        const handleCloseNoti = () => {
            setToggleNoti(false)
        }
        if (quantityFood > 0) {
            dispatch(setQuantityFoodInCard({ quantityFood }))
        } else {
            dispatch(setQuantityFoodInCard({ quantityFood: 0 }))
        }
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("click", handleCloseNoti)
        // if (viewCart) {
        //     document.body.classList.add('modal-open');
        // } else {
        //     document.body.classList.remove('modal-open');
        // }
        return () => {
            // window.removeEventListener("scroll", handleScroll);
            // window.removeEventListener("click", handleCloseNoti);
            // document.body.classList.remove('modal-open');
            socket.off('newBooking');
        };

    }, [showCategoryBar, userAccount, notiList, quantityFood, viewCart, dispatch, quantityFoodInCard]);

    if ((userAccount?.role === "moderator" || userAccount?.role === "user") && pathname === "/manager") {
        navigate("/404");
        return null;
    }

    return <div className={`z-20 font-josefin  h-header flex items-center fixed top-0 left-0 w-full border-b-2 border-black md:px-4 lg:px-0`}>
        <div className={`${showCategoryBar ? "bg-white" : "bg-black "} z-40 absolute top-0 left-0 w-full h-full`}></div>
        <div className={` ${showCategoryBar ? "text-black" : "text-white "} z-50  text-xl flex pt-2 justify-between font-medium styleLink items-center  w-full space-x-4  md:space-x-4  lg:space-x-10 `}>
            <div className={`${userAccount?.role === "admin" || userAccount?.role === "moderator" ? "hidden" : " hidden md:flex flex-1   items-center justify-end md:space-x-4 lg:space-x-8"}`}>
                {userAccount?.role == "moderator" ? "" :
                    <div onClick={() => navigate("/")} className={`${pathname === "/" ? " text-red-500   font-bold    flex justify-center" : ""} flex`}>
                        <a href="#" className="pr-2 text-nowrap">Trang chủ</a><IoHome />
                    </div>}
                {userAccount?.role == "moderator" ? "" :
                    <div onClick={() => navigate("/menu")} className={`${pathname === "/menu" ? "text-red-500    font-bold    justify-center" : ""} flex`}>
                        <a href="#" className="pr-2">Menu</a><MdOutlineRestaurantMenu />
                    </div>}
            </div>
            <div className="font-bold flex text-xl sm:text-[22px]  md:text-2xl  items-center w-fit  text-center">
                <span className="">Larissa</span>
                <div className="h-8 w-8 mx-2">
                    <Logo color={showCategoryBar ? "black" : "white"} />
                </div>
                <span className=" ">Restaurants</span>
            </div>
            <div className="flex-1 items-center justify-start md:space-x-4 lg:space-x-8 hidden md:flex">
                {userAccount?.role == "admin" ? <div className={`${pathname === "/manager" ? "text-red-500 font-bold justify-center" : ""}`}>
                    <Link to="/manager">Quản lý</Link>
                </div> : ""}
                {userAccount?.role === "admin" || userAccount?.role === "moderator" ? (
                    <div className={`cursor-pointer ${pathname === "/order" ? "text-red-500 font-bold" : ""}`}>
                        <div onClick={() => handleClickOrderWhenHaveFoods()
                        }>Order</div>
                    </div>
                ) : null}
                {userAccount?.role === "admin" || userAccount?.role === "moderator" ? (
                    <div className={` cursor-pointer ${pathname === "/menuOrderTable" ? "text-red-500 font-bold" : ""}`}>
                        <div onClick={() => handleClickMenuWhenHaveFoods()
                        }>Menu</div>
                    </div>
                ) : null}
                {userAccount?.role === "admin" || userAccount?.role === "moderator" ? (
                    <div className={`${pathname === "/booking-manager" ? "text-red-500 font-bold" : ""}`}>
                        <Link to="/booking-manager" className="text-nowrap">QL Đặt bàn</Link>
                    </div>
                ) : null}
                {userAccount?.role === "admin" || userAccount?.role === "moderator" ? "" :
                    <div onClick={() => navigate("/book-a-table")} className={`${pathname === "/book-a-table" ? "text-red-500 font-bold" : ""} `}>
                        <a href="#" className="flex">
                            <span className="underline whitespace-nowrap pr-2 ">Đặt bàn</span><MdTableBar /></a>
                    </div>}
                {userAccount?.role === "admin" || userAccount?.role === "moderator" ? (
                    <div className={`relative ${pathname === "/notify" ? "text-red-500 font-bold" : ""}`}>
                        <div onClick={(e) => {
                            setToggleNoti(!toggleNoti)
                            e.stopPropagation()
                        }} className="relative">
                            <span className="text-2xl"><IoNotificationsSharp /></span>
                            {notiOrder.length > 0 && <span className="absolute -top-1 -right-[6px] flex h-4 w-4  items-center justify-center">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00D2FF]"></span>
                            </span>}
                        </div>
                        {toggleNoti && notiOrder.length > 0 &&
                            <div className=" absolute top-[49px] -left-12">
                                <div onClick={(e) => e.stopPropagation()} className=" relative text-black  bg-white border-2 rounded-2xl border-black w-[200px]">
                                    <div className=" absolute -top-[10px] left-[51px] borderr h-4 w-4 bg-black"></div>
                                    <div className="text-[17px] px-4 py-2 font-bold text-black text-center bg-white border-b-2 rounded-t-[14px] border-black">Thông báo</div>
                                    {notiOrder.map((item, index) => (
                                        <div key={index} className="text-[15px] px-4 py-2 border hover:bg-gray-200  text-nowrap">{item.message}</div>
                                    ))}
                                    <div onClick={() => {
                                        setNotiList([])
                                        setToggleNoti(false)
                                        // localStorage.removeItem("noti-order")
                                    }} className="text-[13px] px-4 py-1 border text-nowrap border-t-2 border-t-black rounded-b-[14px] bg-[#00D2FF] text-black text-center ">Đánh dấu đã đọc</div>
                                </div>
                            </div>
                        }
                    </div>
                ) : null}
                {userAccount?.userName ?
                    ""
                    :
                    <div className={`${pathname === "/login" ? "text-red-500 font-bold   " : ""}`}>
                        <Link to="/login" className="flex "><FaUser /></Link>
                    </div>
                }
                {userAccount?.role === "admin" || userAccount?.role === "moderator" ? "" :
                    <div onClick={() => setViewCart(!viewCart)}>
                        <div className="relative ">
                            <MdOutlineShoppingCart />
                            <div className={`${quantityFoodInCard && quantityFoodInCard > 0 ? "flex" : "hidden"} absolute -top-2 -right-4 p-1 bg-[#00D2FF] text-sm rounded-full h-[25px] w-[25px] flex items-center justify-center`}>
                                {quantityFoodInCard && quantityFoodInCard > 0 ? quantityFoodInCard : ""}
                            </div>
                        </div>
                    </div>}
                {userAccount?.userName ?
                    <div onClick={() => navigate("/account")} className={`${pathname === "/account" ? "text-red-500 font-bold" : ""}`}>
                        <div onClick={() => handleClickAccountWhenHaveFoods()
                        } >
                            <a href="#">
                                <div className="flex  items-center cursor-pointer space-x-2">
                                    {/* <span className="capitalize">{userAccount.role} </span> */}
                                    <span>{userAccount.userName}</span>
                                    <div className="h-10 w-10 rounded-full">
                                        <img src={userAccount.avatar ? userAccount.avatar : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} alt="" className="object-cover h-full w-full  rounded-full" />
                                    </div>
                                </div></a>
                        </div>
                    </div> : ""}
            </div>

            <div className="relative flex md:hidden space-x-3">
                {userAccount?.role === "admin" || userAccount?.role === "moderator" ? "" :
                    <div onClick={() => setViewCart(!viewCart)}>
                        <div className="relative ">
                            <MdOutlineShoppingCart />
                            <div className={`${quantityFoodInCard && quantityFoodInCard > 0 ? "flex" : "hidden"} absolute -top-2 -right-4  bg-[#00D2FF] text-sm rounded-full h-[22px] w-[22px] flex items-center justify-center`}>
                                {quantityFoodInCard && quantityFoodInCard > 0 ? quantityFoodInCard : ""}
                            </div>
                        </div>
                    </div>}
                <div
                    onClick={() => setOpenSideBar(!openSideBar)}
                    className={`absolute top-0 right-0 transform transition-all duration-300 cursor-pointer ${openSideBar ? "translate-x-10 opacity-0" : "flex translate-x-0 opacity-100"} pr-4 flex md:hidden`}
                >
                    <GiHamburgerMenu className={`${showCategoryBar ? "text-black" : "text-white "}`} />
                </div>
                <div
                    onClick={() => setOpenSideBar(!openSideBar)}
                    className={`transform transition-all duration-300 cursor-pointer  ${openSideBar ? "flex translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                        } text-2xl pr-4 flex md:hidden`}
                >
                    <IoCloseSharp className={`${showCategoryBar ? "text-black" : "text-white "}`} />
                </div>
            </div>
        </div>
        {openSideBar &&
            <div className="absolute top-0 right-0 h-screen w-full">
                <div className="absolute top-header right-0 w-full h-screen bg-black bg-opacity-50 z-10"></div>
                <ul className=" animate__animated animate__fadeInRightBig animate__faster absolute border  top-header right-0 w-full h-screen sm:max-w-[400px] bg-white z-50 py-10 ">
                    <a href="#" onClick={() => {
                        navigate("/")
                        setOpenSideBar(!openSideBar)
                    }}
                        className="flex text-xl items-center pl-5 space-x-4 py-5 hover:bg-gray-300 border">
                        <span><FaChevronRight /></span>
                        <span>Trang chủ</span>
                        <span><IoHome /></span>
                    </a>
                    <a href="#" onClick={() => {
                        navigate("/menu")
                        setOpenSideBar(!openSideBar)
                    }}
                        className="flex text-xl items-center pl-5 space-x-4 py-5 hover:bg-gray-300 border">
                        <span><FaChevronRight /></span>
                        <span>Menu</span>
                        <span><MdOutlineRestaurantMenu /></span>
                    </a>
                    <a href="#" onClick={() => {
                        navigate("/book-a-table")
                        setOpenSideBar(!openSideBar)
                    }}
                        className="flex text-xl items-center pl-5 space-x-4 py-5 hover:bg-gray-300 border">
                        <span><FaChevronRight /></span>
                        <span>Đặt bàn</span>
                        <span><MdTableBar /></span>
                    </a>
                    {/* {userAccount?.userName ?
                        ""
                        :
                        <div className={`${pathname === "/login" ? "text-red-500 font-bold   " : ""}`}>
                            <Link to="/login" className="flex ">Login{" "}<FaUser style={{ marginLeft: 10 }} /></Link>
                        </div>
                    } */}
                    <a href="#" onClick={() => {
                        if (userAccount?.userName) {
                            navigate("/account")
                            setOpenSideBar(!openSideBar)
                        } else {
                            navigate("/login")
                            setOpenSideBar(!openSideBar)
                        }

                    }}
                        className="flex text-xl items-center pl-5 space-x-4 py-5 hover:bg-gray-300 border">
                        <span><FaChevronRight /></span>
                        <span>{userAccount?.userName ? "Tài Khoản của bạn" : "Đăng nhập"}</span>
                        <span><RiLoginCircleFill /></span>
                    </a>
                </ul>
            </div>
        }

        {viewCart && <div className="absolute top-0 right-0 h-screen w-full z-10">
            <div onClick={(e) => {
                e.stopPropagation()
                setViewCart(!viewCart)
            }} className="absolute top-0 right-0 w-full h-screen bg-black bg-opacity-50 z-40"></div>
            <div className=" animate__animated animate__fadeInRightBig animate__faster absolute border-2  top-0 right-0 w-full h-screen sm:max-w-[400px] bg-white z-50 flex flex-col justify-between border-black">
                <div className={` ${showCategoryBar ? "" : ""} relative h-16 border-t-2 border-white bg-black text-white  mt-[60px] border-y-2 flex items-center justify-center text-2xl px-5 z-40`}>
                    <span>Giỏ hàng</span>
                    <div className="p-[2px] hover:bg-gray-400 hover:bg-opacity-50 absolute top-3 right-4">
                        <IoClose onClick={() => setViewCart(!viewCart)} className="" />
                    </div>
                </div>
                <ul className=" border-black h-[350px] overflow-y-scroll">
                    <div>
                        {foodsCustomer.map((item, index) => (
                            <li key={index} className="border py-4 pl-2 flex items-center group/delete">
                                <span className="w-7">{index + 1}</span>
                                <span className="flex-1">{item.food.foodName}</span>
                                <span className=" flex">
                                    <span onClick={() => dispatch(increaseQuantityCustomer({ _id: item.food._id }))} className="h-7 w-7 hover:border hover:bg-gray-100  flex items-center justify-center">+</span>
                                    <input value={item.quantity} min={1} className="w-10 h-7 border text-center" />
                                    <span onClick={() => dispatch(decreaseQuantityCustomer({ _id: item.food._id }))} className="h-7 w-7 hover:border hover:bg-gray-100  flex items-center justify-center">-</span>
                                </span>
                                <span className="w-24 text-right">{formatCurrency(item.totalEachFood)}</span>
                                <span className="w-8 flex justify-center invisible  group-hover/delete:visible ">
                                    <IoClose onClick={() => dispatch(deleteOneFoodCustomer({ id: item.food._id }))} title="Delete" className="hover:transform hover:scale-150 hover:duration-300 hover:delay-300 cursor-pointer" /></span>
                            </li>
                        ))}
                    </div>
                    {quantityFoodInCard == 0 && <div className="h-full"><img className="h-full w-full object-cover" src="https://i.pinimg.com/736x/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.jpg" alt="" /></div>}
                </ul>
                <div className="h-24 bg-white text-white space-y-2 flex items-center justify-center text-2xl border-t-2 flex-col ">
                    {quantityFoodInCard > 0 && <div className="text-black">Tổng tiền: {formatCurrency(totalOrderCustomer)}VND</div>}
                    {quantityFoodInCard > 0 && <a href="#" onClick={() => {
                        setViewCart(false)
                        navigate("/customerOrder")
                    }} className="bg-black text-white cursor-pointer  border-2 border-black py-1 w-8/12  flex justify-center hover:bg-primary">
                        Xem giỏ hàng
                    </a>}
                </div>
            </div>
        </div>}
    </div >;
}

export default Navbar;
