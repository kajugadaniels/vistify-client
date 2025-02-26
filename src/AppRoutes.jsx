import React from 'react'
import { Dashboard, Login } from './pages'
import AppLayout from './layouts/AppLayout'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes