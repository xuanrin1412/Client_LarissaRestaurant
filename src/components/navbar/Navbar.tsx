import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppSelector } from "../../Redux/store";
import { setOpenModalConfirm } from "../../Redux/foodsSlice";
import { scrollCategoryBar } from "../../utils/scrollToTop";
import { FaUser } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IFoodSlice } from "../../common/type";
import { Logo } from "../../assets/Logo";
import { IoNotificationsSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MdTableBar } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import profile from "../../assets/profile.jpg"


export interface UserAccount {
    id: string,
    userName: string,
    role: string
}

const Navbar: React.FC = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [openSideBar, setOpenSideBar] = useState<boolean>(false)
    const foods: IFoodSlice[] = useAppSelector((state: RootState) => state.foods);
    const [showCategoryBar, setShowCategoryBar] = useState<boolean>(false);
    const [toggleNoti, setToggleNoti] = useState<boolean>(false)

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

    const userAccountString = localStorage.getItem("larissa_userInfo");
    let userAccount: UserAccount | null = null;
    if (userAccountString) {
        try {
            userAccount = JSON.parse(userAccountString) as UserAccount;
        } catch (error) {
            console.error("Error parsing user account from localStorage", error);
        }
    }

    useEffect(() => {
        const handleScroll = () => scrollCategoryBar({ setShowCategoryBar });
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [showCategoryBar, userAccount]);

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
                        <a href="#" className="pr-2">Home</a><IoHome />
                    </div>}
                {userAccount?.role == "moderator" ? "" :
                    <div onClick={() => navigate("/menu")} className={`${pathname === "/menu" ? "text-red-500    font-bold    justify-center" : ""} flex`}>
                        <a href="#" className="pr-2">Menu</a><MdOutlineRestaurantMenu />
                    </div>}
            </div>


            {/* {userAccount.role == "moderator" ? "" : */}
            <div className="font-bold flex text-2xl  items-center w-fit  text-center">
                <span className="">Larissa</span>
                <div className="h-8 w-8 mx-2">
                    <Logo color={showCategoryBar ? "black" : "white"} />
                </div>
                <span className=" ">Restaurants</span>
            </div>
            {/* } */}

            <div className="flex-1 items-center justify-start md:space-x-4 lg:space-x-8 hidden md:flex">
                {userAccount?.role == "admin" ? <div className={`${pathname === "/manager" ? "text-red-500 font-bold justify-center" : ""}`}>
                    <Link to="/manager">Manager</Link>
                </div> : ""}
                {userAccount?.role === "admin" || userAccount?.role === "moderator" ? (
                    <div className={`${pathname === "/order" ? "text-red-500 font-bold" : ""}`}>
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
                {userAccount?.role == "moderator" ? "" :
                    <div onClick={() => navigate("/book-a-table")} className={`${pathname === "/book-a-table" ? "text-red-500 font-bold" : ""} `}>
                        <a href="#" className="flex">
                            <span className="underline whitespace-nowrap pr-2 ">Book A Table</span><MdTableBar /></a>
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
                                        <img src={profile} alt="" className="object-cover h-full w-full  rounded-full" />
                                    </div>
                                </div></a>
                        </div>
                    </div> : ""}
                {userAccount?.role === "admin" || userAccount?.role === "moderator" ? (
                    <div className={`relative ${pathname === "/notify" ? "text-red-500 font-bold" : ""}`}>
                        <div onClick={() => setToggleNoti(!toggleNoti)} className="relative">
                            <span className="text-2xl"><IoNotificationsSharp /></span>
                            <span className="absolute -top-1 -right-[6px] flex h-4 w-4  items-center justify-center">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00D2FF]"></span>
                            </span>
                        </div>
                        {toggleNoti &&
                            <div className=" absolute top-[49px] -left-12">
                                <div className=" relative text-black w-fit bg-white border-2 rounded-2xl border-black">
                                    <div className=" absolute -top-[10px] left-[51px] borderr h-4 w-4 bg-black"></div>
                                    <div className="text-[17px] px-4 py-2 font-bold text-black text-center bg-white border-b-2 rounded-t-[14px] border-black">Thông báo</div>
                                    <div className="">
                                        <div className="text-[15px] px-4 py-2 border hover:bg-gray-200  text-nowrap"><span className=" font-bold text-blue-600">Xuân Rin</span> vừa order bàn 3</div>
                                        <div className="text-[15px] px-4 py-2 border hover:bg-gray-200   text-nowrap"> <span className="font-bold  text-red-600">Quốc Anh</span> vừa hủy order bàn 4</div>
                                        <div className="text-[15px] px-4 py-2 border hover:bg-gray-200   text-nowrap"><span className="font-bold  text-blue-500">Sam </span> vừa order bàn 6</div>
                                        <div className="text-[15px] px-4 py-2 border hover:bg-gray-200   text-nowrap  rounded-b-[14px]"><span className="font-bold  text-red-600">Sam </span> vừa order bàn 9 </div>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>
                ) : null}


                {userAccount?.userName ?
                    ""
                    :
                    <div className={`${pathname === "/login" ? "text-red-500 font-bold   " : ""}`}>
                        <Link to="/login" className="flex ">Login{" "}<FaUser style={{ marginLeft: 10 }} /></Link>
                    </div>
                }
                {/* <GoogleSignInButton /> */}
            </div>

            <div className="relative flex md:hidden">
                <div
                    onClick={() => setOpenSideBar(!openSideBar)}
                    className={`absolute top-0 right-0 transform transition-all duration-300 ${openSideBar ? "translate-x-10 opacity-0" : "flex translate-x-0 opacity-100"} pr-4 flex md:hidden`}
                >
                    <GiHamburgerMenu className={`${showCategoryBar ? "text-black" : "text-white "}`} />
                </div>
                <div
                    onClick={() => setOpenSideBar(!openSideBar)}
                    className={`transform transition-all duration-300 ${openSideBar ? "flex translate-x-0 opacity-100" : "translate-x-10 opacity-0"
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
                        <span>Home</span>
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
                        <span>Book A Table</span>
                        <span><MdTableBar /></span>
                    </a>
                    <a href="#" onClick={() => {
                        navigate("/login")
                        setOpenSideBar(!openSideBar)
                    }}
                        className="flex text-xl items-center pl-5 space-x-4 py-5 hover:bg-gray-300 border">
                        <span><FaChevronRight /></span>
                        <span>Login</span>
                        <span><RiLoginCircleFill /></span>
                    </a>

                    {/* <div className="flex">
                        <span><FaChevronRight/></span>
                        <span>Manager</span>
                    </div>
                    <div className="flex">
                        <span><FaChevronRight/></span>
                        <span>Order</span>
                    </div>
                    <div className="flex">
                        <span><FaChevronRight/></span>
                        <span></span>
                    </div> */}
                </ul>
            </div>
        }
    </div >;
}

export default Navbar;
