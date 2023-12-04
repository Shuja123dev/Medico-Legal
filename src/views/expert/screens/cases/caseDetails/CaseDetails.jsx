import React, { useState } from "react";
import "./caseDetails.css";
import {
  CaseDetailsTable,
  ExpertDisplay,
  H2,
  H3,
  H4,
  Pdf,
} from "../../../components";
import { CardLayout } from "../../../containers";
import { useParams } from "react-router-dom";

const experts = [
  {
    expertName: "Dr. John Doe",
    areaOfExpertise: "Forensic Pathology",
  },

  {
    expertName: "Dr. Jane Smith",
    areaOfExpertise: "Criminal Psychology",
  },

  {
    expertName: "Dr. Mark Johnson",
    areaOfExpertise: "Digital Forensics",
  },

  {
    expertName: "Dr. Emily Davis",
    areaOfExpertise: "Forensic Anthropology",
  },
];

const CaseDetails = ({ cases, setCases }) => {
  const caseId = useParams().caseId;

  const [currCase, setCurrCase] = useState(
    cases.find((item) => item.id === +caseId)
  );

  const optionChangeHandler = (e) => {
    setCurrCase({
      ...currCase,
      status: e.target.value,
    });
  };

  return (
    <>
      <div className={`expert_caseDetails_outer`}>
        <H2 text={"Case Details"} />
        <CardLayout className="expert_caseDetails__card p-md-5 ">
          <div className="expert_caseDetails__left">
            <div className="expert_caseDetails__cases_div">
              <H4 text={"Case"} />
              <CaseDetailsTable
                labels={["name", "type", "status"]}
                values={[currCase.caseName, currCase.type, currCase.status]}
                optionsLabel={"status"}
                onOptionChange={optionChangeHandler}
                selectValue={currCase.status}
                options={[
                  "New",
                  "Opened",
                  "Under Review",
                  "In Progress",
                  "Closed",
                  "Won",
                  "Lost",
                ]}
              />
            </div>
            <div className="expert_caseDetails__clients_div">
              <H4 text={"Client"} />
              <CaseDetailsTable
                labels={["name", "type", "speciality", "experience"]}
                values={[
                  currCase.clientName,
                  currCase.clientType,
                  currCase.clientSpeciality,
                  currCase.clientExperience,
                ]}
              />
            </div>
            <div className="expert_caseDetails__experts_div">
              <H4 text={"Experts"} />
              <div className="expert_caseDetails__experts_div__inner">
                {experts.map(({ expertName, areaOfExpertise }, index) => (
                  <ExpertDisplay
                    key={index}
                    expertName={expertName}
                    areaOfExpertise={areaOfExpertise}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="expert_caseDetails__right">
            <H3 text={"Documents"} className="text-xl-center " />
            <div>
              <h5>{"Experts"}</h5>
              <Pdf name={"Name of the document"} size={"120kb"} />
              <Pdf name={"Name of the document"} size={"120kb"} />
            </div>
            <div>
              <h5>{"Clients"}</h5>
              <Pdf name={"Name of the document"} size={"120kb"} />
              <Pdf name={"Name of the document"} size={"120kb"} />
            </div>
          </div>
        </CardLayout>
      </div>
    </>
  );
};

export default CaseDetails;
