import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Login from '../Routes/Login'

const useAuth = () => {
    const user = { loggedIn: true }
    return user && user.loggedIn
}

const RequireLogin = () => {
    const isAuth = useAuth()
    const location = useLocation()
    return isAuth ? <Outlet /> : <Navigate to='/' state={{ from: location }} replace />
}

export default RequireLogin