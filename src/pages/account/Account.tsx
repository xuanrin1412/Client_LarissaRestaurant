import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setUserName, setUserRole } from "../../Redux/userSlice";
import profile from "../../assets/profile.jpg"

function Account() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [modalLogout, setModalLogout] = useState(false)

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
                    dispatch(setUserName(""));
                    dispatch(setUserRole(""));
                }
            })
    }

    return <div className=" pt-header h-screen grid grid-cols-2 ">
        <div className="flex items-center justify-center">
            <div className="h-96 w-96  border-2 border-black">
                <img className="h-full w-full object-cover" src={profile} alt="" />
            </div>
        </div>
        <div className=" flex justify-center items-center">
            <div className="h-3/5 border-2 border-black p-10 ">
            <div className="text-2xl font-bold text-black border-primary text-center">Tài khoản người dùng </div>
            <table className="table-auto mt-5 text-xl">
                <tbody className="">
                    <tr className=" ">
                        <td className="">
                            <span className=" pr-5 font-medium">Tên người dùng:</span>
                        </td>
                        <td className="">
                            <span>Lê Thị Xuân Rin</span>
                        </td>
                    </tr>
                    <tr className=" ">
                        <td className="">
                        <span className=" pr-5 font-medium">Số điện thoại:</span>
                        </td>
                        <td className="">
                        <span>0967016129</span>
                        </td>
                    </tr> <tr className=" ">
                        <td className="">
                        <span className=" pr-5 font-medium">Địa chỉ:</span>
                        </td>
                        <td className="">
                        <span>79/14 TL 08 phường Thạnh Lộc ,Quận 12</span>
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
