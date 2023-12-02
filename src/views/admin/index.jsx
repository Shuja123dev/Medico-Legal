import React, { useEffect, useRef, useState } from 'react'
import { Sidebar } from '../user/containers'
import "./index.css";
import AdminSideBar from '../user/containers/sidebar/AdminSideBar'
import { useSelector } from 'react-redux';
import { barsIcon } from "../user/assets";
import { UserPicCard } from '../user/components';
import { Route, Routes } from 'react-router-dom';
import Contracts from './components/contracts/Contracts';
import Membership from './components/membership/Membership';
import Management from './components/management/Management';
import Promos from './components/promos/Promos';
import Clients from './components/clients/Clients';
import ClientDetails from './components/clients/ClientDetails';
import CaseDetails from './components/clients/CaseDetails';
import Payments from './components/payments/Payments';
import ProfileRequests from './components/requests/ProfileRequests';
import { Chat } from '../user/screens';

const Admin = () => {
    const lang = useSelector((state) => state.language.value);
    const userBaseMainRef = useRef(null)
    const [isSidebarHidden, setIsSidebarHidden] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarHidden((prevState) => !prevState);
    };


    useEffect(() => {
        if (isSidebarHidden) {
            userBaseMainRef.current.classList.add("user_main_full_width");
        } else {
            userBaseMainRef.current.classList.remove("user_main_full_width");
        }
    }, [isSidebarHidden]);

    return (
        <div className={`user_base ${lang === "ar" ? "user_base_ar" : " "}`}>
            <div className="user_base_inner">
                <AdminSideBar
                    isSidebarHidden={isSidebarHidden}
                    toggleSidebar={toggleSidebar}
                />
                <UserPicCard />
                <button
                    className={`user_bars_btn ${lang === "ar" ? "user_bars_btn_ar" : ""
                        }`}
                    onClick={toggleSidebar}>
                    <img src={barsIcon} alt="bars" />
                </button>
                <main
                    ref={userBaseMainRef}
                    className={`user_base_main ${lang === "ar" ? "user_base_main_ar" : ""}`}>
                    <Routes>
                        <Route path='/progress' element={<Contracts />} />
                        <Route path='/requests' element={<Membership />} />
                        <Route path='/management' element={<Management />} />
                        <Route path='/promos' element={<Promos />} />
                        <Route path='/clients' element={<Clients />} />
                        <Route path='/payments' element={<Payments />} />
                        <Route path='/clients-chat' element={<Chat />} />
                        <Route path='/experts-chat' element={<Chat />} />
                        <Route path='/cases-chat' element={<Chat />} />
                        <Route path='//profile-requests' element={<ProfileRequests />} />
                        <Route path='/clients/:clientId' element={<ClientDetails />} />
                        <Route path='/clients/:clientId/details' element={<CaseDetails />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default Admin
