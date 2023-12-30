import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { Sidebar } from "./containers";
import { ExpertPicCard } from "./components";
import { barsIcon } from "./assets";
import { Route, Routes } from "react-router-dom";
import {
  CaseDetails,
  Cases,
  ChangePassword,
  Chat,
  Home,
  Profile,
} from "./screens";
import Cookies from "js-cookie";
import axios from "axios";


const Expert = () => {
  const expertBaseMainRef = useRef(null);
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const [cases, setCases] = useState([]);
  const toggleSidebar = () => {
    setIsSidebarHidden((prevState) => !prevState);
  };

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get('token')

  const getCases = async () => {
    await axios.get(baseURL + "/api/getallcase", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      setCases(res.data.response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    getCases()
  }, [])

  useEffect(() => {
    if (isSidebarHidden) {
      expertBaseMainRef.current.classList.add("expert_main_full_width");
    } else {
      expertBaseMainRef.current.classList.remove("expert_main_full_width");
    }
  }, [isSidebarHidden]);

  return (
    <>
      <div className={`expert_base`}>
        <div className="expert_base_inner">
          <Sidebar
            isSidebarHidden={isSidebarHidden}
            toggleSidebar={toggleSidebar}
          />
          <ExpertPicCard />
          <button className={`expert_bars_btn`} onClick={toggleSidebar}>
            <img src={barsIcon} alt="bars" />
          </button>
          <main ref={expertBaseMainRef} className={`expert_base_main`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cases" element={<Cases cases={cases} />} />
              <Route
                path="/cases/:caseId"
                element={<CaseDetails />}
              />
              <Route path="/admin-chat" element={<Chat />} />
              <Route path="/clients-chat" element={<Chat />} />
              <Route path="/cases-chat" element={<Chat />} />
              <Route path="/tickets" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default Expert;
