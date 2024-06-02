import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState, useAppSelector } from '../Redux/store';
 const PrivateRoutes:React.FC = () => {
  const userRole: string | undefined = useAppSelector((state: RootState) => state.user.userRole);
    return (
      userRole === ("moderator"||"admin") ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes