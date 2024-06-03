import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import profile from "../../assets/profile.jpg"
import { UserAccount } from "../../components/navbar/Navbar"
import { apiGetUserInfo } from "../../API/api"

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

    useEffect(() => {
        apiGetUserInfo(userAccount?.id)
            .then((res) => {
                setData(res.data.getUser)
            })
            .catch(err => {
                console.log(err);
            })
    }, [userAccount?.id])

    return <div className=" pt-header h-screen grid grid-cols-2 ">
        <div className="flex items-center justify-center">
            <div className="h-96 w-96  border-2 border-black">
                <img className="h-full w-full object-cover" src={profile} alt="" />
            </div>
        </div>
        <div className=" flex justify-center items-center ">
            <div className="h-3/5 min-w-max border-2 border-black p-10 ">
                <div className="text-2xl font-bold text-black border-primary text-center">Tài khoản người dùng </div>
                <table className="table-auto mt-5 text-xl">
                    <tbody >
                        <tr className=" ">
                            <td >
                                <span className=" pr-5 font-medium">Tên người dùng:</span>
                            </td>
                            <td >
                                <span>{data?.userName}</span>
                            </td>
                        </tr>
                        <tr className=" ">
                            <td >
                                <span className=" pr-5 font-medium">Email:</span>
                            </td>
                            <td >
                                <span>{data?.email}</span>
                            </td>
                        </tr>
                        <tr className=" ">
                            <td >
                                <span className=" pr-5 font-medium">Số điện thoại:</span>
                            </td>
                            <td >
                                <span>{data?.phoneNumber}</span>
                            </td>
                        </tr>
                        <tr className=" ">
                            <td >
                                <span className=" pr-5 font-medium">Địa chỉ:</span>
                            </td>
                            <td >
                                <span>{data?.address}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div onClick={() => handleClickLogOut()} className="mt-10 flex items-center justify-center">
                    <div className="bg-black text-white px-4 py-2 w-2/4 text-center hover:bg-primary">Log Out</div></div>
            </div>
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
