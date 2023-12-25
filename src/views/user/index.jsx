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

const dummyCases = [
  {
    id: 1,
    caseName: "Personal Injury Lawsuit",
    type: "Public Court",
    experts: 3,
    status: "In Progress",
  },
  {
    id: 2,
    caseName: "Business Contract Dispute",
    type: "Public Court",
    experts: 2,
    status: "New",
  },
  {
    id: 3,
    caseName: "Criminal Defense - Assault",
    type: "Public Court",
    experts: 1,
    status: "Under Review",
  },
  {
    id: 4,
    caseName: "Intellectual Property Dispute",
    type: "Public Court",
    experts: 4,
    status: "Closed",
  },
  {
    id: 5,
    caseName: "Family Law - Custody Battle",
    type: "Public Court",
    experts: 2,
    status: "Opened",
  },
  {
    id: 6,
    caseName: "Real Estate Transaction Dispute",
    type: "Public Court Arbitration",
    experts: 3,
    status: "In Progress",
  },
  {
    id: 7,
    caseName: "Labor Law Violation",
    type: "Public Court",
    experts: 2,
    status: "Won",
  },
  {
    id: 8,
    caseName: "Environmental Regulations Violation",
    type: "Public Court",
    experts: 5,
    status: "Lost",
  },
  {
    id: 9,
    caseName: "Medical Malpractice Lawsuit",
    type: "Public Court",
    experts: 3,
    status: "Under Review",
  },
  {
    id: 10,
    caseName: "Tax Evasion Allegations",
    type: "Public Court",
    experts: 2,
    status: "New",
  },
  {
    id: 11,
    caseName: "Product Liability Lawsuit",
    type: "Public Court",
    experts: 3,
    status: "New",
  },
  {
    id: 12,
    caseName: "Employment Discrimination",
    type: "Public Court",
    experts: 2,
    status: "Under Review",
  },
  {
    id: 13,
    caseName: "Bankruptcy Filing",
    type: "Public Court",
    experts: 1,
    status: "In Progress",
  },
  {
    id: 14,
    caseName: "Insurance Fraud Investigation",
    type: "Public Court",
    experts: 4,
    status: "Closed",
  },
  {
    id: 15,
    caseName: "Landlord-Tenant Dispute",
    type: "Public Court",
    experts: 2,
    status: "Opened",
  },
  {
    id: 16,
    caseName: "Antitrust Violation",
    type: "Public Court",
    experts: 3,
    status: "Won",
  },
  {
    id: 17,
    caseName: "Immigration Appeal",
    type: "Public Court",
    experts: 2,
    status: "Lost",
  },
  {
    id: 18,
    caseName: "Personal Data Breach Lawsuit",
    type: "Public Court Court",
    experts: 5,
    status: "Under Review",
  },
  {
    id: 19,
    caseName: "Construction Contract Dispute",
    type: "Public Court",
    experts: 3,
    status: "New",
  },
  {
    id: 20,
    caseName: "Civil Rights Violation",
    type: "Public Court Court",
    experts: 2,
    status: "In Progress",
  },
];

const User = () => {
  const userBaseMainRef = useRef(null);
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const [availablePackages, setAvailablePackages] = useState()
  const lang = useSelector((state) => state.language.value);
  const [cases, setCases] = useState(dummyCases);
  const { t } = useTranslation();

  const token = Cookies.get('token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyMzkxMDg4LCJleHAiOjE3MDI1NjM4ODh9.N9NbD6o9_ByWAm0bTYIYHQrYMNUK3YWYnrBfZ6X-QmM";

  const toggleSidebar = () => {
    setIsSidebarHidden((prevState) => !prevState);
  };


  const fetchPackages = async () => {
    await axios.post("http://202.182.110.16/medical/api/login", {
      PhoneNo: "03325501021",
      Password: "abc123"
    }).then(async response => {
      const token = response.data.token;
      await axios.get("http://202.182.110.16/medical/api/getpackages", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        setAvailablePackages(res.data.response.data);
      })
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
    fetchPackages()
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
                    <CaseDetails cases={cases} setCases={setCases} />
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
