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

const dummyCases = [
  {
    id: 1,
    caseName: "Personal Injury Lawsuit",
    type: "Public Court",
    experts: 3,
    documents: 3,
    status: "In Progress",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 2,
    caseName: "Business Contract Dispute",
    type: "Public Court",
    experts: 2,
    documents: 3,
    status: "New",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 3,
    caseName: "Criminal Defense - Assault",
    type: "Public Court",
    experts: 1,
    documents: 3,
    status: "Under Review",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 4,
    caseName: "Intellectual Property Dispute",
    type: "Public Court",
    experts: 4,
    documents: 3,
    status: "Closed",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 5,
    caseName: "Family Law - Custody Battle",
    type: "Public Court",
    experts: 2,
    documents: 3,
    status: "Opened",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 6,
    caseName: "Real Estate Transaction Dispute",
    type: "Public Court Arbitration",
    experts: 3,
    documents: 3,
    status: "In Progress",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 7,
    caseName: "Labor Law Violation",
    type: "Public Court",
    experts: 2,
    documents: 3,
    status: "Won",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 8,
    caseName: "Environmental Regulations Violation",
    type: "Public Court",
    experts: 5,
    documents: 3,
    status: "Lost",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 9,
    caseName: "Medical Malpractice Lawsuit",
    type: "Public Court",
    experts: 3,
    documents: 3,
    status: "Under Review",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 10,
    caseName: "Tax Evasion Allegations",
    type: "Public Court",
    experts: 2,
    documents: 3,
    status: "New",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 11,
    caseName: "Product Liability Lawsuit",
    type: "Public Court",
    experts: 3,
    documents: 3,
    status: "New",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 12,
    caseName: "Employment Discrimination",
    type: "Public Court",
    experts: 2,
    documents: 3,
    status: "Under Review",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 13,
    caseName: "Bankruptcy Filing",
    type: "Public Court",
    experts: 1,
    documents: 3,
    status: "In Progress",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 14,
    caseName: "Insurance Fraud Investigation",
    type: "Public Court",
    experts: 4,
    documents: 3,
    status: "Closed",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 15,
    caseName: "Landlord-Tenant Dispute",
    type: "Public Court",
    experts: 2,
    documents: 3,
    status: "Opened",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 16,
    caseName: "Antitrust Violation",
    type: "Public Court",
    experts: 3,
    documents: 3,
    status: "Won",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 17,
    caseName: "Immigration Appeal",
    type: "Public Court",
    experts: 2,
    documents: 3,
    status: "Lost",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 18,
    caseName: "Personal Data Breach Lawsuit",
    type: "Public Court Court",
    experts: 5,
    documents: 3,
    status: "Under Review",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 19,
    caseName: "Construction Contract Dispute",
    type: "Public Court",
    experts: 3,
    documents: 3,
    status: "New",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
  {
    id: 20,
    caseName: "Civil Rights Violation",
    type: "Public Court Court",
    experts: 2,
    documents: 3,
    status: "In Progress",
    clientName: "John Doe",
    clientType: "Individual",
    clientSpeciality: "Gastroentrology",
    clientExperience: "10 years",
  },
];

const Expert = () => {
  const expertBaseMainRef = useRef(null);
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const [cases, setCases] = useState(dummyCases);
  const toggleSidebar = () => {
    setIsSidebarHidden((prevState) => !prevState);
  };

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
                element={<CaseDetails cases={cases} setCases={setCases} />}
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
