
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { apiLogin } from "../../API/api";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../Redux/userSlice";
import { IUserInfo } from "../../common/types/userInfo";
import Cookies from 'js-cookie';


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        apiLogin({ userName, password })
            .then((res) => {
                Cookies.set('larissa_userInfo', JSON.stringify(res));
                const user: IUserInfo = jwtDecode(res.data.tokenJWT);
                console.log("user when login",user);

                dispatch(setUserInfo({ userInfo: user }))
                const userRole = user.role;
                if (userRole == "moderator") {
                    console.log("hello");
                    navigate("/order");
                }
                else if (userRole == "admin") {
                    navigate("/manager");
                }
                else {
                    console.log("red");
                    navigate("/");
                }
            })
            .catch(err => {
                console.log("err",err.response.data.message);
                
                toast.error(err.response.data.message);
            });
    };


    const ShowPassword = () => {
        const elementPassword = document.getElementsByClassName("password");
        if ((elementPassword[0] as HTMLInputElement).type === "password") {
            (elementPassword[0] as HTMLInputElement).type = "text"
            setShowPassword(true)

        } else {
            (elementPassword[0] as HTMLInputElement).type = "password"
            setShowPassword(false)
        }
    }
    useEffect(() => {

    }, [showPassword, dispatch])

    return <div className="hero min-h-screen " style={{ backgroundImage: 'url(https://www.lux-review.com/wp-content/uploads/2022/05/Luxury-Dining.jpg)' }}>
        {/* <div className=" bg-opacity-90"></div> */}
        <div className="hero-content text-center text-white bg-black bg-opacity-60 p-8 bg-shadow rounded">
            <div className="max-w-md font-josefin ">
                <div className="text-3xl mb-5 bg-shadow-Login ">Đăng nhập</div>
                <div className="mb-8  text-lg flex flex-col space-y-3">
                    <div className="  border-2 px-10 py-1 w-full flex justify-center items-center space-x-2"><span>Đăng nhập với Google</span><FcGoogle /></div>
                    <div className="  border-2 px-10 py-1 w-full flex justify-center items-center space-x-2"><span>Đăng nhập với FaceBook</span><FaFacebook style={{ color: "#1773EA", background: "white", borderRadius: "50%" }} /></div>
                </div>
                <form onSubmit={handleSubmit} className=" space-y-5 text-shadow-Login">
                    <div className=" flex flex-col">
                        <label className=" font-bold text-lg  text-shadow-Login">Tên người dùng</label>
                        <input required value={userName} placeholder="Nhập tên người dùng" onChange={e => setUserName(e.target.value)} className=" text-shadow-Login text-white bg-transparent flex-1 border-b-2 px-2 py-1  border-b-white outline-none placeholder-white placeholder-opacity-40" />
                    </div>
                    <div className=" flex flex-col  text-shadow-Login">
                        <label className=" font-bold  text-lg">Mật khẩu</label>
                        <div className="relative border-b-2 border-b-white text-left flex">
                            <input required type="password" value={password} placeholder="Nhập mật khẩu" onChange={e => setPassword(e.target.value)} className="password w-11/12  text-white bg-transparent px-2 py-1  border-b-white outline-none" />
                            {showPassword ? <FaRegEye onClick={ShowPassword} className="absolute top-0 right-0 h-full flex items-center" /> :
                                <FaRegEyeSlash onClick={ShowPassword} className="absolute top-0 right-0 h-full flex items-center" />}
                        </div>

                    </div>
                    <button type="submit" className="text-center w-full bg-black px-2 py-2 mt-4 bg-shadow border-2 border-black hover:bg-white hover:text-black hover:font-bold hover:border-1">Đăng nhập</button>
                </form>
                <div className="mt-5">Bạn chưa có tài khoản ?{" "} <Link to="/register" className="underline"><br />Đăng ký ngay !</Link></div>
            </div>
        </div>

    </div >
}
export default Login
