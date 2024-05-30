import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from 'jsonwebtoken';
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "../../Redux/store";
import { setUserId, setUserName, setUserRole } from "../../Redux/userSlice";
import { IFoodSlice } from "../../common/type";
import { setOpenModalConfirm } from "../../Redux/foodsSlice";
import { Logo } from "../../assets/Logo";
interface MyJwtPayload extends JwtPayload {
    userName?: string;
}
const Navbar: React.FC = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { userName, userRole } = useAppSelector((state: RootState) => state.user);
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
    const scrollCategoryBar = () => {
        if (window.scrollY > 80) {
            setShowCategoryBar(true);
        } else {
            setShowCategoryBar(false);
        }
    };

    useEffect(() => {
        const takeToken = Cookies.get("tokenRestaurants")
        if (takeToken) {
            const decoded = jwtDecode<MyJwtPayload>(takeToken);
            dispatch(setUserName(decoded.userName ?? ''));
            dispatch(setUserId(decoded.id ?? ''));
            dispatch(setUserRole(decoded.role));
        }
    }, [dispatch])
    useEffect(() => {
        window.addEventListener("scroll", scrollCategoryBar);
        return () => {
            window.removeEventListener("scroll", scrollCategoryBar);
        };
    }, [showCategoryBar]);
    if ((userRole === "moderator" || userRole === "user") && pathname === "/manager") {
        navigate("/404");
        return null;
    }

    return <div className={`z-20 font-josefin  h-header flex items-center fixed top-0 left-0 w-full border-b-2 ${showCategoryBar ? "border-black" : "border-white"}`}>
        <div className={`${showCategoryBar ? "bg-white" : "bg-black "} z-40 absolute top-0 left-0 w-full h-full`}></div>
        <div className={` ${showCategoryBar ? "text-black" : "text-white "} z-50  text-xl flex pt-2 justify-between font-medium styleLink items-center  w-full space-x-10`}>
            <div className={`${userRole === "admin" || userRole === "moderator" ? "hidden" : "flex flex-1  items-center justify-end space-x-8"}`}>
                {userRole == "moderator" ? "" :
                    <div className={`${pathname === "/" ? " text-red-500   font-bold    flex justify-center" : ""}`}>
                        <Link to="/">Home</Link>
                    </div>}
                {userRole == "moderator" ? "" :
                    <div className={`${pathname === "/menu" ? "text-red-500    font-bold    justify-center" : ""}`}>
                        <Link to="/menu">Menu</Link>
                    </div>}
            </div>

            {/* {userRole == "moderator" ? "" : */}
            <div className="font-bold flex text-2xl  items-center w-fit  text-center">
                <span className="">Larissa</span>
                <div className="h-8 w-8 mx-2">
                    <Logo color={showCategoryBar ? "black" : "white"} />
                </div>
                <span className=" ">Restaurants</span>
            </div>
            {/* } */}

            <div className="flex-1 flex items-center justify-start space-x-8">
                {userRole == "admin" ? <div className={`${pathname === "/manager" ? "text-red-500 font-bold justify-center" : ""}`}>
                    <Link to="/manager">Manager</Link>
                </div> : ""}
                {userRole === "admin" || userRole === "moderator" ? (
                    <div className={`${pathname === "/order" ? "text-red-500 font-bold" : ""}`}>
                        <div onClick={() => handleClickOrderWhenHaveFoods()
                        }>Order</div>
                    </div>
                ) : null}
                {userRole === "admin" || userRole === "moderator" ? (
                    <div className={` cursor-pointer ${pathname === "/menuOrderTable" ? "text-red-500 font-bold" : ""}`}>
                        <div onClick={() => handleClickMenuWhenHaveFoods()
                        }>Menu</div>
                    </div>
                ) : null}
                {userRole == "moderator" ? "" :
                    <div className={`${pathname === "/book-a-table" ? "text-red-500 font-bold" : ""}`}>
                        <Link to="/book-a-table">
                            <span className="underline whitespace-nowrap ">Book A Table</span></Link>
                    </div>}
                {userName ?
                    <div className={`${pathname === "/account" ? "text-red-500 font-bold" : ""}`}>
                        <div onClick={() => handleClickAccountWhenHaveFoods()
                        } >
                            <div className="flex flex-wrap">
                                <span className="capitalize">{userRole} </span>
                                <span>{userName}</span>
                            </div>
                        </div>
                    </div> : ""}
                {userName ?
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
