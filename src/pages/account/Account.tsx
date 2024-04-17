import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setUserName, setUserRole } from "../../Redux/userSlice";


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



    return <div className=" mt-header">
        <div>
            <div onClick={() => handleClickLogOut()} className="flex items-center">Log Out</div>
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
