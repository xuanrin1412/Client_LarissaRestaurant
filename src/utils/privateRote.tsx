import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { IUserInfo } from '../common/types/userInfo';
import { useAppSelector } from '../Redux/store';

const PrivateRoutes: React.FC = () => {
  const userAccount: IUserInfo | null = useAppSelector(state => state.user.userInfo)
  return (
    (userAccount?.role == "moderator" || userAccount?.role == "admin") ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes