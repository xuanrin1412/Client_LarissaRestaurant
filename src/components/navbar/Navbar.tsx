import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "../../Redux/store";
import { IFoodSlice } from "../../common/type";
import { setOpenModalConfirm } from "../../Redux/foodsSlice";
import { Logo } from "../../assets/Logo";
import { IoNotificationsSharp } from "react-icons/io5";
import { scrollCategoryBar } from "../../utils/scrollToTop";

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
    const foods: IFoodSlice[] = useAppSelector((state: RootState) => state.foods.foods);
    const [showCategoryBar, setShowCategoryBar] = useState<boolean>(false);
    
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
    }, [showCategoryBar,userAccount]);

    if ((userAccount?.role === "moderator" || userAccount?.role === "user") && pathname === "/manager") {
        navigate("/404");
        return null;
    }

    return <div className={`z-20 font-josefin  h-header flex items-center fixed top-0 left-0 w-full border-b-2 ${showCategoryBar ? "border-black" : "border-white"}`}>
        <div className={`${showCategoryBar ? "bg-white" : "bg-black "} z-40 absolute top-0 left-0 w-full h-full`}></div>
        <div className={` ${showCategoryBar ? "text-black" : "text-white "} z-50  text-xl flex pt-2 justify-between font-medium styleLink items-center  w-full space-x-10`}>
            <div className={`${userAccount?.role === "admin" || userAccount?.role === "moderator" ? "hidden" : "flex flex-1  items-center justify-end space-x-8"}`}>
                {userAccount?.role == "moderator" ? "" :
                    <div onClick={() => navigate("/")} className={`${pathname === "/" ? " text-red-500   font-bold    flex justify-center" : ""}`}>
                        <a href="#">Home</a>
                    </div>}
                {userAccount?.role == "moderator" ? "" :
                    <div onClick={() => navigate("/menu")} className={`${pathname === "/menu" ? "text-red-500    font-bold    justify-center" : ""}`}>
                        <a href="#">Menu</a>
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

            <div className="flex-1 flex items-center justify-start space-x-8">
                {userAccount?.role == "admin" ? <div className={`${pathname === "/manager" ? "text-red-500 font-bold justify-center" : ""}`}>
                    <Link to="/manager">Manager</Link>
                </div> : ""}
                {userAccount?.role === "admin" || userAccount?.role === "moderator"  ? (
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
                    <div onClick={() => navigate("/book-a-table")} className={`${pathname === "/book-a-table" ? "text-red-500 font-bold" : ""}`}>
                        <a href="#">
                            <span className="underline whitespace-nowrap ">Book A Table</span></a>
                    </div>}
                {userAccount?.userName ?
                    <div onClick={() => navigate("/account")} className={`${pathname === "/account" ? "text-red-500 font-bold" : ""}`}>
                        <div onClick={() => handleClickAccountWhenHaveFoods()
                        } >
                            <a href="#">
                                <div className="flex flex-wrap cursor-pointer">
                                    <span className="capitalize">{userAccount.role} </span>
                                    <span>{userAccount.userName}</span>
                                </div></a>
                        </div>
                    </div> : ""}
                {userAccount?.role === "admin" || userAccount?.role === "moderator" ? (
                    <div className={`${pathname === "/notify" ? "text-red-500 font-bold" : ""}`}>
                        <div className="relative">
                            <span className="text-2xl"><IoNotificationsSharp /></span>
                            <span className="absolute -top-1 -right-[6px] flex h-4 w-4  items-center justify-center">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00D2FF]"></span>
                            </span>
                        </div>
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
        </div>


    </div >;
}

export default Navbar;
