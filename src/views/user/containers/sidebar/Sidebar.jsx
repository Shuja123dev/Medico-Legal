import React, { useEffect, useRef } from "react";
import "./sidebar.css";
import { SidebarItem } from "../../components";
import {
  billingIcon,
  billingIconWhite,
  casesIcon,
  casesIconWhite,
  chatIcon,
  chatIconWhite,
  logoImg,
  packagesIcon,
  packagesIconWhite,
  profileIcon,
  profileIconWhite,
  supportIcon,
  supportIconWhite,
} from "../../assets";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ isSidebarHidden, toggleSidebar }) => {
  const { t } = useTranslation();
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
        className={`user_sidebar user_sidebar_hidden ${
          lang === "ar" ? "user_sidebar_ar" : ""
        }`}>
        <div>
          <img src={logoImg} alt="logo" />
        </div>
        <hr className="user_sidebar_hr" />
        <ul className="user_sidebar__ul">
          <SidebarItem
            to={"/user/packages"}
            icon={packagesIcon}
            iconWhite={packagesIconWhite}
            text={t("UserPanel.Sidebar.Packages")}
            toggleSidebar={toggleSidebar}
          />
          <SidebarItem
            to={"/user/cases"}
            icon={casesIcon}
            iconWhite={casesIconWhite}
            text={t("UserPanel.Sidebar.Cases")}
            toggleSidebar={toggleSidebar}
          />
          <SidebarItem
            icon={chatIcon}
            iconWhite={chatIconWhite}
            text={t("UserPanel.Sidebar.Chat")}
            toggleSidebar={toggleSidebar}
            subItems={[
              t("UserPanel.Sidebar.Experts"),
              t("UserPanel.Sidebar.Cases"),
              t("UserPanel.Sidebar.Admin"),
            ]}
            subItemsTo={[
              "/user/experts-chat",
              "/user/cases-chat",
              "/user/admin-chat",
            ]}
          />
          <SidebarItem
            to={"/user/support"}
            icon={supportIcon}
            iconWhite={supportIconWhite}
            text={t("UserPanel.Sidebar.Support")}
            toggleSidebar={toggleSidebar}
          />
          <SidebarItem
            to={"/user/billing"}
            icon={billingIcon}
            iconWhite={billingIconWhite}
            text={t("UserPanel.Sidebar.Billing")}
            toggleSidebar={toggleSidebar}
          />
          <SidebarItem
            to={"/user/profile"}
            icon={profileIcon}
            iconWhite={profileIconWhite}
            text={t("UserPanel.Sidebar.Profile")}
            toggleSidebar={toggleSidebar}
          />
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
