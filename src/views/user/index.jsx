import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import { Header, Sidebar } from "./containers/";
import {
  AddNewCase,
  Billing,
  CaseDetails,
  Cases,
  ChangePassword,
  Chat,
  Home,
  PackageDetails,
  Packages,
  Profile,
} from "./screens";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

const User = () => {
  const userBaseMainRef = useRef(null);
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const [availablePackages, setAvailablePackages] = useState()
  const lang = useSelector((state) => state.language.value);
  const [cases, setCases] = useState([]);
  const { t } = useTranslation();


  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get('token');

  const toggleSidebar = () => {
    setIsSidebarHidden((prevState) => !prevState);
  };

  const fetchCases = async () => {
    await axios.get(baseURL + "/api/getallcase", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setCases(response.data.response.data)
    })
  }


  const fetchPackages = async () => {
    await axios.get(baseURL + "/api/getpackages", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      setAvailablePackages(res.data.response.data);
    })
  }

  useEffect(() => {
    if (isSidebarHidden) {
      userBaseMainRef.current.classList.add("user_main_full_width");
    } else {
      userBaseMainRef.current.classList.remove("user_main_full_width");
    }
  }, [isSidebarHidden]);

  useEffect(() => {
    fetchPackages();
    fetchCases();
  }, [])

  return (
    <>
      <div className={`user_base ${lang === "ar" ? "user_base_ar" : " "}`}>
        <div className="user_base_inner">
          <Sidebar
            isSidebarHidden={isSidebarHidden}
            toggleSidebar={toggleSidebar}
          />
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarHidden={isSidebarHidden}
          />
          <main
            ref={userBaseMainRef}
            className={`user_base_main ${lang === "ar" ? "user_base_main_ar" : ""
              }`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/packages"
                element={
                  <>
                    <Packages availablePackages={availablePackages} />
                  </>
                }
              />
              <Route
                path="/packages/:packageId"
                element={
                  <>
                    <PackageDetails availablePackages={availablePackages} />
                  </>
                }
              />
              <Route
                path="/cases"
                element={
                  <>
                    <Cases cases={cases} />
                  </>
                }
              />
              <Route
                path="/cases/add-new-case"
                element={
                  <>
                    <AddNewCase />
                  </>
                }
              />
              <Route
                path="/cases/:caseId"
                element={
                  <>
                    <CaseDetails />
                  </>
                }
              />
              <Route path="/experts-chat" element={<Chat />} />
              <Route path="/cases-chat" element={<Chat />} />
              <Route path="/admin-chat" element={<Chat />} />
              <Route path="/support" element={<Chat />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default User;
