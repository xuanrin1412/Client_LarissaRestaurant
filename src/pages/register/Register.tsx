import axios from "axios";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { IoCameraSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { apiUploadImage } from "../../API/api";
import { convertBase64 } from "../../utils/conversebase";
import { handleUploadImage } from "../../utils/handleUploadImage";
import { setLoadingImage } from "../../Redux/Image";
import { ShowPassword } from "../../utils/showPassword";
import { LoadingImage } from "../../components/commons/loadingImage";

function Register() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const loadingImage: boolean = useAppSelector(state => state.image.loadingImage)

    const hidddenInput = useRef<HTMLInputElement | null>(null)

    const handleClickInputHidden = () => {
        hidddenInput.current?.click()
    }
    const [displayImage, setDisplayImage] = useState<string>("")
    const [fileUpload, setFileUpload] = useState<File | undefined | Blob>()

    const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleUploadImage(e, setFileUpload, setDisplayImage)
    }

    const handleUploadToCloud = async () => {
        dispatch(setLoadingImage(true))
        try {
            const base64 = await convertBase64(fileUpload);
            const res = await apiUploadImage(base64)
            setDisplayImage(res.data)
            dispatch(setLoadingImage(false))
            return res.data
        } catch (error) {
            console.log("Error fetchign iamgeUpload", error);
        }
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const avatar = await handleUploadToCloud()
        console.log("avatar when submit", avatar);
        if (avatar) {
            axios.post("http://localhost:3004/api/register", {
                avatar,
                email,
                userName,
                password,
                phoneNumber,
                address
            }, { withCredentials: true })
                .then((res) => {
                    console.log("res register =========>", { res });
                    navigate("/login")
                })
                .catch(err => {
                    toast.error(err.response.data.message)
                })
        }
    }
    useEffect(() => {
    }, [showPassword, displayImage])

    return <div className="relative hero min-h-screen bg-cover " style={{ backgroundImage: 'url(https://manofmany.com/wp-content/uploads/2016/09/wpid-1180178.jpg)' }}>
        <div className=" text-center text-white bg-black bg-opacity-60 p-8 bg-shadow rounded">
            <div className=" font-josefin ">
                <div className="text-3xl mb-5 bg-shadow-Login ">Đăng ký</div>
                <div className="lg:flex">
                    <div className=" mb-16 lg:mb-8 mr-4 text-lg flex flex-col items-center justify-center space-y-3">
                        <div className="  border-2 px-10 py-1 w-full flex justify-center items-center space-x-2"><span>Đăng ký với Google</span><FcGoogle /></div>
                        <div className="  border-2 px-10 py-1 w-full flex justify-center items-center space-x-2"><span>Đăng ký với FaceBook</span><FaFacebook style={{ color: "#1773EA", background: "white", borderRadius: "50%" }} /></div>
                        <div className="pt-5 lg:pt-20">Bạn đã có tài khoản ?</div>
                        <Link to="/login" className="underline">Đăng nhập ngay !</Link>
                    </div>
                    <div className="hidden lg:flex divider divider-info divider-horizontal">Hoặc</div>
                    <form onSubmit={handleSubmit} className="min-w-[278px] lg:ml-4 space-y-5 text-shadow-Login ">
                        <div className="w-full flex justify-center rounded-full ">
                            <div className=" relative h-32 w-32 rounded-full border-2 border-white flex items-center justify-center">
                                {displayImage.length > 0 ? <img src={displayImage} alt="avatar-upload" className="h-full w-full object-cover rounded-full" /> : <GoPerson className=" text-5xl" />}
                                <div onClick={handleClickInputHidden} className="absolute bottom-0 right-0 bg-gray-900 p-2 rounded-full">
                                    <IoCameraSharp className=" text-xl" />
                                    <input ref={hidddenInput} type="file" hidden onChange={handleUploadAvatar} />
                                </div>
                            </div>
                        </div>

                        <div className=" flex flex-col">
                            <label className=" font-bold text-lg  text-shadow-Login">Email</label>
                            <input required type="email" value={email} placeholder="Nhập email" onChange={e => setEmail(e.target.value)} className=" text-shadow-Login text-white bg-transparent flex-1 border-b-2 px-2 py-1  border-b-white outline-none placeholder-white placeholder-opacity-40" />
                        </div>
                        <div className=" flex flex-col">
                            <label className=" font-bold text-lg  text-shadow-Login">Tên người dùng</label>
                            <input required value={userName} placeholder="Nhập tên người dùng" onChange={e => setUserName(e.target.value)} className=" text-shadow-Login text-white bg-transparent flex-1 border-b-2 px-2 py-1  border-b-white outline-none placeholder-white placeholder-opacity-40" />
                        </div>
                        <div className=" flex flex-col">
                            <label className=" font-bold text-lg  text-shadow-Login">Nhập số điện thoại</label>
                            <input required value={phoneNumber} placeholder="Nhập số điện thoại" onChange={e => setPhoneNumber(e.target.value)} className=" text-shadow-Login text-white bg-transparent flex-1 border-b-2 px-2 py-1  border-b-white outline-none placeholder-white placeholder-opacity-40" />
                        </div>
                        <div className=" flex flex-col">
                            <label className=" font-bold text-lg  text-shadow-Login">Địa chỉ</label>
                            <input required value={address} placeholder="Nhập địa chỉ" onChange={e => setAddress(e.target.value)} className=" text-shadow-Login text-white bg-transparent flex-1 border-b-2 px-2 py-1  border-b-white outline-none placeholder-white placeholder-opacity-40" />
                        </div>
                        <div className=" flex flex-col  text-shadow-Login">
                            <label className=" font-bold  text-lg">Mật khẩu</label>
                            <div className="relative border-b-2 border-b-white text-left flex">
                                <input required type="password" value={password} placeholder="Nhập mật khẩu" onChange={e => setPassword(e.target.value)} className="password w-11/12  text-white bg-transparent px-2 py-1  border-b-white outline-none" />
                                {showPassword ? <FaRegEye onClick={() => ShowPassword(setShowPassword)} className="absolute top-0 right-0 h-full flex items-center" /> :
                                    <FaRegEyeSlash onClick={() => ShowPassword(setShowPassword)} className="absolute top-0 right-0 h-full flex items-center" />}
                            </div>
                        </div>
                        <button type="submit" className="text-center w-full bg-black px-2 py-2 mt-4 bg-shadow border-2 border-black hover:bg-white hover:text-black hover:font-bold hover:border-1">Đăng ký</button>
                    </form>
                </div>
            </div>
        </div>
        {loadingImage &&
           <LoadingImage/>
        }
    </div >
}

export default Register
