import { apiChangeAvatar, apiGetUserInfo, apiUpdateProfile, apiUploadImage } from "../../API/api"
import { clearUserInfo, updateUserAvatar, updateUserInfo } from "../../Redux/userSlice"
import { LoadingImage } from "../../components/commons/loadingImage";
import { useAppDispatch, useAppSelector } from "../../Redux/store"
import { handleUploadImage } from "../../utils/handleUploadImage";
import React, { useEffect, useRef, useState } from "react"
import { convertBase64 } from "../../utils/conversebase";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUserInfo } from "../../common/types/userInfo";
import { setLoadingImage } from "../../Redux/Image";
import { IoCameraSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

function Account() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [data, setData] = useState<IUserInfo>()
    const [modalLogout, setModalLogout] = useState(false)
    const loadingImage: boolean = useAppSelector(state => state.image.loadingImage)
    const userAccount: IUserInfo | null = useAppSelector(state => state.user.userInfo)

    // HANDLE LOGOUT
    const handleClickLogOut = () => {
        setModalLogout(true)
    }
    const handleLogOut = () => {
        axios
            .delete('http://localhost:3004/api/login/', { withCredentials: true })
            .then(result => {
                if (result.data.message === 'Logout Success') {
                    navigate('/')
                    setModalLogout(false)
                    dispatch(clearUserInfo())
                }
            })
    }

    // HANDLE UPDATE PROFILE
    const [edit, setEdit] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        watch,
        reset,
    } = useForm<IUserInfo>({
        defaultValues: {
            address: data?.address,
            avatar: data?.avatar,
            email: data?.email,
            phoneNumber: data?.phoneNumber,
            userName: data?.userName
        },
    })
    // SUBMIT UPDATE PROFILE
    const onSubmit: SubmitHandler<IUserInfo> = (data) => {
        apiUpdateProfile({
            id: data._id,
            body: {
                avatar: data.avatar,
                userName: data.userName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: data.address
            }
        }).then((res) => {
            dispatch(updateUserInfo({ userInfo: res.data.updateUser }))
            setEdit(false)
        }).catch((err) => {
            console.log(err);
            toast.error("Thông tin đã tồn tại hãy thay đổi lại thông tin !")
        })
    }
    console.log(watch("userName"))
    useEffect(() => {
        apiGetUserInfo(userAccount?._id)
            .then((res) => {
                setData(res.data.getUser),
                    reset()
            })
            .catch(err => {
                console.log(err);
            })
    }, [userAccount?._id, reset])

    // CHANGE AVATAR IMAGE
    const hiddenInput = useRef<HTMLInputElement | null>(null)
    const [displayImage, setDisplayImage] = useState<string>("")
    const [fileUpload, setFileUpload] = useState<File | undefined | Blob>()
    const [showBtnSaveAvatar, setShowBtnSaveAvatar] = useState<boolean>(false)
    const handleClickHiddenInput = () => {
        hiddenInput?.current?.click()
    }
    const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowBtnSaveAvatar(true)
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            dispatch(setLoadingImage(false))
            if (error.response.statusText == 'Payload Too Large') {
                toast.error("Hãy chọn ảnh có kích thước nhỏ hơn 800x400px")
            }
            console.log("Error fetchign iamgeUpload", error);
        }
    }
    const handleChangeAvatar = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const avatar = await handleUploadToCloud()
        if (avatar) {
            apiChangeAvatar({ avatar, idUser: userAccount?._id })
                .then((res) => {
                    console.log("ré change avatar", res.data.updateUserAvatar.avatar)
                    dispatch(updateUserAvatar(res.data.updateUserAvatar.avatar))
                    setShowBtnSaveAvatar(false)
                    toast.success("Thay đổi ảnh avatar thành công")
                })
                .catch(err => {
                    toast.error("Thay đổi ảnh avatar thất bại !")
                    toast.error(err.response.data.message)
                })
        }
    }

    useEffect(() => {
        if (data) {
            reset(data);
        }
        if (modalLogout) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [data, reset, modalLogout]);

    return <form onSubmit={handleSubmit(onSubmit)} className="pt-header grid grid-cols-1 lg:grid-cols-2 space-y-10 lg:space-y-0 pb-10 lg:pb-0  relative">
        <div className="flex items-center justify-center pt-10 lg:pt-0 flex-col">
            <div className="h-72 w-72 lg:h-96 lg:w-96 rounded-full lg:rounded-2xl  border-2 border-black">
                <img className="h-full w-full object-cover  rounded-full lg:rounded-2xl" src={displayImage ? displayImage : data?.avatar ? data?.avatar : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} alt="" />
            </div>
            {<div className="flex flex-col items-center  sm:flex-row sm:justify-center space-x-4">
                <div onClick={handleClickHiddenInput} className="w-fit p-2  mt-4 rounded-lg border-2 border-black font-bold flex items-center space-x-3 hover:bg-gray-200 hover:cursor-pointer">
                    <span>Thay đổi ảnh</span>
                    <IoCameraSharp className="text-2xl" />
                    <input ref={hiddenInput} hidden type="file" onChange={handleUploadAvatar} />
                </div>
                <div className="flex flex-row space-x-3 ">
                    {showBtnSaveAvatar && <div onClick={handleChangeAvatar} className="p-2  mt-4 rounded-lg border-2 border-black bg-red-600 text-white font-bold flex items-center space-x-3 hover:bg-primary hover:cursor-pointer">
                        lưu ảnh
                    </div>}
                    {showBtnSaveAvatar && <div onClick={() => {
                        setDisplayImage("")
                        setShowBtnSaveAvatar(false)
                    }} className="p-2  mt-4 rounded-lg border-2 border-black bg-red-600 text-white font-bold flex items-center space-x-3 hover:bg-primary hover:cursor-pointer">
                        Hủy thay đổi
                    </div>}
                </div>
            </div>
            }
        </div>
        <div className=" flex justify-center lg:items-center ">
            <div className=" w-[90%] md:w-[80%] h-fit  border-2 border-black rounded-2xl py-10 px-5 sm:py-10 sm:px-10 lg:my-10 relative ">
                <div className="text-2xl font-bold text-black border-primary text-center pb-4">Tài khoản người dùng </div>
                <div className="space-y-4 w-full">
                    <input {...register("userName")} disabled={!edit} type="text" placeholder="UserName" className="w-full border-2 p-2 rounded-2xl text-center hover:border-primary" />
                    <input {...register("email")} disabled={!edit} type="text" placeholder="Email" className="w-full border-2 p-2 rounded-2xl text-center hover:border-primary" />
                    <input {...register("phoneNumber")} disabled={!edit} type="text" placeholder="Phone Number" className="w-full border-2 p-2 rounded-2xl text-center hover:border-primary" />
                    <input {...register("address")} disabled={!edit} type="text" placeholder="Address" className="w-full border-2 p-2 rounded-2xl text-center hover:border-primary" />
                </div>
                <div className="flex flex-col space-y-3">

                </div>
                <div onClick={() => handleClickLogOut()} className="mt-10 flex items-center justify-center">
                    <div className="bg-black text-white px-4 py-3 w-full text-center hover:bg-primary rounded-2xl cursor-pointer">Đăng xuất</div>
                </div>
                {edit ? <div className=" absolute top-3 right-4 flex space-x-2 ">
                    <div onClick={() => setEdit(false)} className="text-[12px] p-1 px-2 border-2  text-white bg-gray-500" >Hủy</div>
                    <button type="submit" className="text-[12px]  p-1 px-2 border-2  text-white bg-primary" >Lưu</button>
                </div> : <FaEdit onClick={() => setEdit(!edit)} className="text-2xl absolute top-2 right-2" />}
            </div>
        </div>

        {modalLogout ? <div className="absolute top-0 left-0 w-full h-screen">
            <div className="fixed bg-black bg-opacity-50 w-full h-screen  flex justify-center items-center ">
                <div className="w-2/2 bg-white p-8 space-y-4 border-2 border-black text-xl ">
                    <div className="font-bold text-2xl">Bạn muốn đăng xuất ?</div>
                    <div className="flex justify-between">
                        <span onClick={handleLogOut} className="p-1 px-4 border-2 border-black cursor-pointer hover:bg-primary hover:text-white">Đồng ý</span>
                        <span onClick={() => setModalLogout(false)} className="p-1 px-4 border-2 border-black cursor-pointer bg-primary text-white hover:bg-opacity-90">Hủy</span>
                    </div>
                </div>
            </div>
        </div> : ""}
        {loadingImage &&
            <LoadingImage />
        }
    </form>;
}

export default Account;
