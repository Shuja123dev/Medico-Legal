import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./containers/";
import {
  AddNewCase,
  Billing,
  CaseDetails,
  Cases,
  Chat,
  Home,
  Packages,
} from "./screens";
import { UserPicCard } from "./components";
import { barsIcon } from "./assets";
import { useSelector } from "react-redux";

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
  const lang = useSelector((state) => state.language.value);
  const [cases, setCases] = useState(dummyCases);
  const { t } = useTranslation();

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
    <>
      <div className={`user_base ${lang === "ar" ? "user_base_ar" : " "}`}>
        <div className="user_base_inner">
          <Sidebar
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
            className={`user_base_main user_main_full ${lang === "ar" ? "user_base_main_ar" : ""
              }`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/packages"
                element={
                  <>
                    <Packages />
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
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default User;
