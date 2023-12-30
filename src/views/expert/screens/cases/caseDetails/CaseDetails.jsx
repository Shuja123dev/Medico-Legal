import axios from 'axios';
import React, { useEffect, useState } from "react";
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
import Cookies from 'js-cookie';

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

const CaseDetails = () => {
  const caseId = useParams().caseId;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get('token')

  const [currCase, setCurrCase] = useState({});
  const [client, setClient] = useState({});

  const optionChangeHandler = (e) => {
    setCurrCase({
      ...currCase,
      status: e.target.value,
    });
  };

  const getCaseDetails = async () => {
    await axios.post(baseURL + "/api/getcasebyid", {
      CaseId: caseId,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      setCurrCase(response.data.response.data[0])
    })
  }

  const getClientBYId = async () => {
    await axios.post(baseURL + "/api/getclientbyid", {
      ClientId: currCase.ClientId,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setClient(response.data.response.data[0])
    })
  }

  useEffect(() => {
    getCaseDetails().then(getClientBYId());
  }, [])

  console.log(client);
  console.log(currCase);


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
                values={currCase && [currCase.CaseName, currCase.CaseType, currCase.Status]}
                optionsLabel={"status"}
                onOptionChange={optionChangeHandler}
                selectValue={currCase && currCase.Status}
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
                values={client && [
                  client.ClientName,
                  client.Type,
                  client.Speciality,
                  client.Experience,
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
