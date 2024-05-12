import { Link, useLocation, useNavigate } from "react-router-dom";
import IconLogo from "../../assets/ICON.jpg"
import { FaUser } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from 'jsonwebtoken';
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "../../Redux/store";
import { setUserName, setUserRole } from "../../Redux/userSlice";
interface MyJwtPayload extends JwtPayload {
    userName?: string;
}
function Navbar() {
    const location = useLocation();
    const pathname = location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { userName, userRole } = useAppSelector((state: RootState) => state.user);

    useEffect(() => {

        const takeToken = Cookies.get("tokenRestaurants")
        if (takeToken) {
            const decoded = jwtDecode<MyJwtPayload>(takeToken);
            dispatch(setUserName(decoded.userName ?? ''));
            dispatch(setUserRole(decoded.role));
        }
    }, [dispatch])
    if ((userRole === "moderator" || userRole === "user") && pathname === "/manager") {
        navigate("/404");
        return null;
    }

    return <div className=" font-josefin z-50 h-header flex items-center fixed top-0 left-0 w-full bg-white bg-opacity-80 ">
        <div className=" flex pt-2 justify-between font-medium styleLink items-center border-2 border-black bg-white  w-3/4 mx-auto space-x-4">
            <div className={`${userRole === "admin" || userRole === "moderator" ? "hidden" : "flex flex-1  items-center justify-end space-x-8"}`}>
                {userRole == "moderator" ? "" :
                    <div className={`${pathname === "/" ? " text-red-700 font-bold transform  scale-[110%] duration-500 delay-75  flex justify-center" : ""}`}>
                        <Link to="/">Home</Link>
                    </div>}
                {userRole == "moderator" ? "" :
                    <div className={`${pathname === "/menu" ? "text-red-700 font-bold transform  scale-[110%] duration-500 delay-75  justify-center" : ""}`}>
                        <Link to="/menu">Menu</Link>
                    </div>}
            </div>

            {/* {userRole == "moderator" ? "" : */}
            <div className=" font-bold font-greatVibes  flex text-3xl items-center w-fit  text-center">
                <span className="">Larissa</span>
                <div className="h-8 w-8 mx-2">
                    <img
                        src={IconLogo}
                        className=" h-full w-full object-contain "
                        alt="Picture of the author"
                    />
                </div>
                <span className=" ">Restaurants</span>
            </div>
            {/* } */}

            <div className="flex-1 flex items-center justify-start space-x-8">
                {userRole == "admin" ? <div className={`${pathname === "/manager" ? "text-red-700 font-bold transform  scale-[110%] duration-500 delay-75  justify-center" : ""}`}>
                    <Link to="/manager">Manager</Link>
                </div> : ""}
                {userRole === "admin" || userRole === "moderator" ? (
                    <div className={`${pathname === "/order" ? "text-red-700 font-bold transform  scale-[120%] duration-500 delay-75" : ""}`}>
                        <Link to="/order">Order</Link>
                    </div>
                ) : null}
                {userRole === "admin" || userRole === "moderator" ? (
                    <div className={`${pathname === "/menuOrderTable" ? "text-red-700 font-bold transform  scale-[120%] duration-500 delay-75" : ""}`}>
                        <Link to="/menuOrderTable">Menu</Link>
                    </div>
                ) : null}
                {userRole == "moderator" ? "" :
                    <div className={`${pathname === "/book-a-table" ? "text-red-700 font-bold transform  scale-[120%] duration-500 delay-75 " : ""}`}>
                        <Link to="/book-a-table">
                            <span className="underline whitespace-nowrap ">Book A Table</span></Link>
                    </div>}
                {userName ?
                    <div className={`${pathname === "/account" ? "text-red-700 font-bold transform  scale-[120%] duration-500 delay-75 " : ""}`}>
                        <Link to="/account">
                            <div className="flex flex-wrap">
                                <span className="capitalize">{userRole} </span>
                                <span>{userName}</span>
                            </div>
                        </Link>
                    </div> : ""}
                {userName ?
                    ""
                    :
                    <div className={`${pathname === "/login" ? "text-red-700 font-bold transform  scale-[120%] duration-500 delay-75 " : ""}`}>
                        <Link to="/login" className="flex items-center">Login{" "}<FaUser /></Link>
                    </div>
                }
                {/* <GoogleSignInButton /> */}
            </div>
        </div>


    </div >;
}

export default Navbar;
