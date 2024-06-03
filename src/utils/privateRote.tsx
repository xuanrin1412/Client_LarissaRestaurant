import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAccount } from '../components/navbar/Navbar';

const PrivateRoutes: React.FC = () => {
  const userAccountString = localStorage.getItem("larissa_userInfo");
  let userAccount: UserAccount | null = null;
  if (userAccountString) {
    try {
      userAccount = JSON.parse(userAccountString) as UserAccount;
    } catch (error) {
      console.error("Error parsing user account from localStorage", error);
    }
  }
  return (
    (userAccount?.role == "moderator" || userAccount?.role == "admin") ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes