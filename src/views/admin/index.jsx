import React, { useEffect, useRef, useState } from 'react'
import { Sidebar } from '../user/containers'
import "./index.css";
import AdminSideBar from '../user/containers/sidebar/AdminSideBar'
import { useSelector } from 'react-redux';
import { barsIcon } from "../user/assets";
import { H2, UserPicCard } from '../user/components';
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
import { AddNewCase, Chat } from '../user/screens';
import Support from './components/support/Support';
import Blogs from './components/Blogs/Blogs';
import BlogDetails from './components/Blogs/BlogDetails';
import EditBlog from './components/Blogs/EditBlog';
import AddBlog from './components/Blogs/AddBlog';
import RespondTicket from './components/support/RespondTicket';
import Experts from './components/experts/Experts';
import ExpertDetails from './components/experts/ExpertDetails';
import AddExpert from './components/experts/AddExpert';
import AdminCases from './components/cases/AdminCases';
import Admins from './components/admins/Admins';
import AdminDetails from './components/admins/AdminDetails';
import AddAdmin from './components/admins/AddAdmin';
import EditAdmin from './components/admins/EditAdmin';

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
                        <Route path='/clients/add-client' element={<AddExpert type='clients' />} />
                        <Route path='/payments' element={<Payments />} />
                        <Route path='/clients-chat' element={<>
                            <H2 text={"CHAT"} className='mb-4' />
                            <Chat />
                        </>} />
                        <Route path='/experts-chat' element={<>
                            <H2 text={"CHAT"} className='mb-4' />
                            <Chat />
                        </>} />
                        <Route path='/cases-chat' element={<>
                            <H2 text={"CHAT"} className='mb-4' />
                            <Chat />
                        </>} />
                        <Route path='/support' element={<Support />} />
                        <Route path='/support/respond' element={<RespondTicket />} />
                        <Route path='/blogs' element={<Blogs />} />
                        <Route path='/blogs/:blogId/edit' element={<EditBlog />} />
                        <Route path='/blogs/add-new-blog' element={<AddBlog />} />
                        <Route path='/blogs/:blogId' element={<BlogDetails />} />
                        <Route path='/profile-requests' element={<ProfileRequests />} />
                        <Route path='/clients/:clientId' element={<ClientDetails />} />
                        <Route path='/clients/:clientId/details' element={<CaseDetails />} />
                        <Route path='/experts' element={<Experts />} />
                        <Route path='/experts/:expertId' element={<ExpertDetails />} />
                        <Route path='/experts/add-expert' element={<AddExpert />} />
                        <Route path='/cases' element={<AdminCases />} />
                        <Route path='/cases/add-new-case' element={<AddNewCase />} />
                        <Route path='/cases/:caseId' element={<CaseDetails />} />
                        <Route path='/admins' element={<Admins />} />
                        <Route path='/admins/:adminId' element={<AdminDetails />} />
                        <Route path='/admins/add-admin' element={<AddAdmin />} />
                        <Route path='/admins/edit-admin' element={<EditAdmin />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default Admin
