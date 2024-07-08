import { Navigate, Outlet } from "react-router-dom"
import { IUserInfo } from "../common/types/userInfo"
import { useAppSelector } from "../Redux/store"

const HomePageForUSer: React.FC = () => {
    const userAccount:IUserInfo |null = useAppSelector(state=>state.user.userInfo)
    return (
        (userAccount?.role == "user") ? <Outlet />: <Navigate to='/order' />
    )
}

export default HomePageForUSer