import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import profile from "../../assets/profile.jpg"
import { UserAccount } from "../../components/navbar/Navbar"
import { apiGetUserInfo, apiUpdateProfile } from "../../API/api"
import { FaEdit } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    _id: string | undefined,
    userName?: string | undefined;
    phoneNumber?: string | undefined;
    address?: string | undefined;
    email?: string | undefined;
}

export interface UserState {
    userName?: string | undefined;
    userRole?: string | undefined;
    phoneNumber?: string | undefined;
    address?: string | undefined;
    userId?: string | undefined;
    email?: string | undefined;
}

function Account() {
    const navigate = useNavigate()
    const [modalLogout, setModalLogout] = useState(false)
    const [data, setData] = useState<UserState>()

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
                    localStorage.removeItem('larissa_userInfo');
                }
            })
    }

    // TAKE OUT USERACCOUNT
    const userAccountString = localStorage.getItem("larissa_userInfo");
    let userAccount: UserAccount | null = null;
    if (userAccountString) {
        try {
            userAccount = JSON.parse(userAccountString) as UserAccount;
        } catch (error) {
            console.error("Error parsing user account from localStorage", error);
        }
    }


    // UPDATE PROFILE



    const [edit, setEdit] = useState<boolean>(false)
    const handleSaveProfile = () => {
        console.log("click save ");
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
    } = useForm<Inputs>({
        defaultValues: {
            address: data?.address,
            email: data?.email,
            phoneNumber: data?.phoneNumber,
            userName: data?.userName
        },
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("data update", data);
        apiUpdateProfile({
            id: data._id, 
            body: {
                userName: data.userName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: data.address
            }
        }).then((res) => {
            console.log({ res });
            setEdit(false)
        
        }).catch((err) => {
            console.log(err);
        })

    }

    console.log(watch("userName"))


    useEffect(() => {
        apiGetUserInfo(userAccount?.id)
            .then((res) => {
                setData(res.data.getUser),
                    reset()
            })
            .catch(err => {
                console.log(err);
            })
    }, [userAccount?.id, reset])

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    return <div className="pt-header grid grid-cols-1 lg:grid-cols-2 space-y-10 lg:space-y-0 pb-10 lg:pb-0 ">
        <div className="flex items-center justify-center pt-10 lg:pt-0">
            <div className="h-72 w-72 lg:h-96 lg:w-96 rounded-full lg:rounded-none  border-2 border-black">
                <img className="h-full w-full object-cover  rounded-full lg:rounded-none" src={profile} alt="" />
            </div>
        </div>
        <div className=" flex justify-center lg:items-center ">
            <form onSubmit={handleSubmit(onSubmit)} className=" w-[90%] md:w-[80%] h-fit  border-2 border-black p-10 lg:my-10 relative ">
                <div className="text-2xl font-bold text-black border-primary text-center pb-4">Tài khoản người dùng </div>
                <div className="space-y-4 w-full">
                    <input {...register("userName")} disabled={!edit} type="text" placeholder="UserName" className="w-full border-2 p-2 rounded-2xl text-center hover:border-primary" />
                    <input {...register("email")} disabled={!edit} type="text" placeholder="Email" className="w-full border-2 p-2 rounded-2xl text-center hover:border-primary" />
                    <input {...register("phoneNumber")} disabled={!edit} type="text" placeholder="Phone Number" className="w-full border-2 p-2 rounded-2xl text-center hover:border-primary" />
                    <input {...register("address")} disabled={!edit} type="text" placeholder="Address" className="w-full border-2 p-2 rounded-2xl text-center hover:border-primary" />
                    {/* <input type="submit" /> */}
                </div>
                <div className="flex flex-col space-y-3">

                </div>
                <div onClick={() => handleClickLogOut()} className="mt-10 flex items-center justify-center">
                    <div className="bg-black text-white px-4 py-2 w-full text-center hover:bg-primary rounded-2xl">Log Out</div>
                </div>
                {edit ? <div className=" absolute top-2 right-2 flex space-x-2 ">
                    <div onClick={() => setEdit(false)} className="text-[12px] p-1 px-2 border-2  text-white bg-gray-500" >Cancel</div>
                    <button type="submit" onClick={() => handleSaveProfile()} className="text-[12px]  p-1 px-2 border-2  text-white bg-primary" >Save</button>
                </div> : <FaEdit onClick={() => setEdit(!edit)} className="text-2xl absolute top-2 right-2" />}
            </form>
        </div>

        {modalLogout ? <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full min-h-screen flex justify-center items-center">
            <div className="w-2/2 bg-white p-8 space-y-4 ">
                <div>You want to Log Out ?</div>
                <div className="flex justify-between">
                    <span onClick={handleLogOut} className="p-1 px-4 border-2 border-black">Yes</span>
                    <span onClick={() => setModalLogout(false)} className="p-1 px-4 border-2 border-black">No</span>
                </div>
            </div>
        </div> : ""}
    </div>;
}

export default Account;
