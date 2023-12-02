import React, { useEffect, useRef, useState } from 'react'
import "./sidebar.css"
import { SidebarItem } from '../../components'
import {
    logoImg,
    progressWhite,
    progressDark,
    chatIconWhite,
    chatIcon,
    casesIconWhite,
    membershipWhite,
    clients,
    clientsWhite,
    membership,
    expert,
    expertWhite,
    casesIcon,
    paymentDark,
    supportIcon,
    supportIconWhite,
    payment,
    adminWhite,
    requests,
    requestsWhite,
    admin,
    blogWhite,
    blogs
} from "../../assets/index"
import { useSelector } from 'react-redux'

const AdminSideBar = ({ isSidebarHidden, toggleSidebar }) => {

    const lang = useSelector((state) => state.language.value);
    const sidebarRef = useRef(null);
    useEffect(() => {
        if (isSidebarHidden) {
            sidebarRef.current.classList.add("user_sidebar_hidden");
        } else {
            sidebarRef.current.classList.remove("user_sidebar_hidden");
        }
    }, [isSidebarHidden]);

    return (
        <>
            <aside
                ref={sidebarRef}
                className={`user_sidebar user_sidebar_hidden ${lang === "ar" ? "user_sidebar_ar" : ""}`}>
                <div>
                    <img src={logoImg} alt="logo" />
                </div>
                <hr className="user_sidebar_hr" />
                <ul className="user_sidebar__ul">
                    <SidebarItem
                        to={"/admin/progress"}
                        icon={progressDark}
                        iconWhite={progressWhite}
                        text={"Progress"}
                        toggleSidebar={toggleSidebar}
                    />
                    <SidebarItem
                        to={"/admin/membership"}
                        icon={membership}
                        iconWhite={membershipWhite}
                        text={"Membership"}
                        toggleSidebar={toggleSidebar}
                        subItems={
                            [
                                "Requests",
                                "Management",
                                "Promos"
                            ]
                        }
                        subItemsTo={[
                            "/admin/requests",
                            "/admin/management",
                            "/admin/promos",
                        ]}
                    />
                    <SidebarItem
                        to={"/admin/clients"}
                        icon={clients}
                        iconWhite={clientsWhite}
                        text={"Clients"}
                        toggleSidebar={toggleSidebar}
                    />
                    <SidebarItem
                        to={"/admin/experts"}
                        icon={expert}
                        iconWhite={expertWhite}
                        text={"Experts"}
                        toggleSidebar={toggleSidebar}
                    />
                    <SidebarItem
                        to={"/admin/cases"}
                        icon={casesIcon}
                        iconWhite={casesIconWhite}
                        text={"Cases"}
                        toggleSidebar={toggleSidebar}
                    />
                    <SidebarItem
                        to={"/admin/support"}
                        icon={supportIcon}
                        iconWhite={supportIconWhite}
                        text={"Support"}
                        toggleSidebar={toggleSidebar}
                    />
                    <SidebarItem
                        to={"/admin/communication"}
                        icon={chatIcon}
                        iconWhite={chatIconWhite}
                        text={"Communication"}
                        toggleSidebar={toggleSidebar}
                        subItems={
                            [
                                "Clients Chat",
                                "Experts Chat",
                                "Cases Chat"
                            ]
                        }
                        subItemsTo={[
                            "/admin/clients-chat",
                            "/admin/experts-chat",
                            "/admin/cases-chat",
                        ]}
                    />
                    <SidebarItem
                        to={"/admin/admins"}
                        icon={admin}
                        iconWhite={adminWhite}
                        text={"Admins"}
                        toggleSidebar={toggleSidebar}
                    />
                    <SidebarItem
                        to={"/admin/profile-requests"}
                        icon={requests}
                        iconWhite={requestsWhite}
                        text={"Requests"}
                        toggleSidebar={toggleSidebar}
                    />
                    <SidebarItem
                        to={"/admin/blogs"}
                        icon={blogWhite}
                        iconWhite={blogs}
                        text={"Blog"}
                        toggleSidebar={toggleSidebar}
                    />
                    <SidebarItem
                        to={"/admin/payments"}
                        icon={paymentDark}
                        iconWhite={payment}
                        text={"Payments"}
                        toggleSidebar={toggleSidebar}
                    />
                </ul>
            </aside>
        </>
    )
}

export default AdminSideBar
