import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import Repeat from '../page/Repeat'
import Touch from '../page/Touch'

const AppRouter = () => {
    return (
        <Routes>
            <Route Component={Home} path='/' />
            <Route Component={Repeat} path='/repeat' />
            <Route Component={Touch} path='/touch' />
            <Route Component={Home} path='*' />
        </Routes>
    )
}

export default AppRouter