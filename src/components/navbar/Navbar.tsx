import { Link, useLocation, useNavigate } from "react-router-dom";
import IconLogo from "../../assets/ICON.jpg"
import { FaUser } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from 'jsonwebtoken';
interface MyJwtPayload extends JwtPayload {
    userName?: string; // Define 'userName' property as optional or as per your requirement
}

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation();
    const pathname = location.pathname;
    const [userName, setUserName] = useState<string | undefined>("")
    const [modalLogout, setModalLogout] = useState(false)


    useEffect(() => {
        const takeToken = Cookies.get("tokenRestaurants")
        console.log("takeToken", takeToken);
        if (takeToken) {
            const decoded = jwtDecode<MyJwtPayload>(takeToken);
            console.log(decoded.userName);
            setUserName(decoded.userName)
        }

    }, [userName])

    const handleClickLogOut = () => {
        console.log("clcikkk");
        setModalLogout(true)
    }

    const handleLogOut = () => {
        axios
            .delete('http://localhost:3004/api/login/', { withCredentials: true })
            .then(result => {
                console.log('result log out', result.data.message)
                if (result.data.message === 'Logout Success') {
                    navigate('/')
                    setModalLogout(false)
                    setUserName("")
                }
            })
    }
    return <div className=" font-josefin z-50 h-header flex items-center fixed top-0 left-0 w-full bg-white bg-opacity-80 ">
        <div className=" flex pt-2 justify-between font-medium styleLink items-center border-2 border-black bg-white  w-3/4 mx-auto space-x-4">
            <div className="flex-1 flex items-center justify-end space-x-8">
                <div className={`${pathname === "/" ? " text-red-700 font-bold transform  scale-[110%] duration-500 delay-75  flex justify-center" : ""}`}>
                    <Link to="/">Home</Link>
                </div>
                <div className={`${pathname === "/manager" ? "text-red-700 font-bold transform  scale-[110%] duration-500 delay-75  justify-center" : ""}`}>
                    <Link to="/manager">Manager</Link>
                </div>
                <div className={`${pathname === "/menu" ? "text-red-700 font-bold transform  scale-[110%] duration-500 delay-75  justify-center" : ""}`}>
                    <Link to="/menu">Menu</Link>
                </div>
            </div>
            <Link className=" font-bold font-greatVibes  flex text-3xl items-center w-fit  text-center" to="/">
                <span className="">Larissa</span>
                <div className="h-8 w-8 mx-2">
                    <img
                        src={IconLogo}
                        className=" h-full w-full object-contain "
                        alt="Picture of the author"
                    />
                </div>

                <span className=" ">Restaurants</span>
            </Link>

            <div className="flex-1 flex items-center justify-start space-x-8">
                <div className={`${pathname === "/order" ? "text-red-700 font-bold transform  scale-[120%] duration-500 delay-75 " : ""}`}>
                    <Link to="/order">Order</Link>
                </div>
                <div className={`${pathname === "/book-a-table" ? "text-red-700 font-bold transform  scale-[120%] duration-500 delay-75 " : ""}`}>
                    <Link to="/book-a-table">
                        <span className="underline ">Book A Table</span></Link>
                </div>
                {userName ?
                    <div>
                        <div onClick={() => handleClickLogOut()} className="flex items-center">Logout{" "}<IoLogOutOutline style={{ height: 25, width: 25, marginLeft: 5 }} /></div>
                    </div>
                    :
                    <div className={`${pathname === "/login" ? "text-red-700 font-bold transform  scale-[120%] duration-500 delay-75 " : ""}`}>
                        <Link to="/login" className="flex items-center">Login{" "}<FaUser /></Link>
                    </div>
                }
                {/* <GoogleSignInButton /> */}
            </div>
        </div>

        {modalLogout ? <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full min-h-screen flex justify-center items-center">
            <div className="w-2/2 bg-white p-8 space-y-4 ">
                <div>You want to LogOut ?</div>
                <div className="flex justify-between">
                    <span onClick={handleLogOut} className="p-1 px-4 border-2 border-black">Yes</span>
                    <span onClick={() => setModalLogout(false)} className="p-1 px-4 border-2 border-black">No</span>
                </div>
            </div>
        </div> : ""}
    </div >;
}

export default Navbar;
