import React, { useEffect, useState } from "react";
import "./caseDetails.css";
import {
  Button1,
  CaseDetailsTable,
  ExpertDisplay,
  H2,
  H3,
  H4,
  InputBox,
  Modal,
  Pdf,
} from "../../../components";
import { useTranslation } from "react-i18next";
import { CardLayout } from "../../../containers";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

const CaseDetails = () => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.value);
  const caseId = useParams().caseId;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get('token');

  const modalData = {
    expertRemoval: {
      title: t("UserPanel.Cases.CaseDetailsPage.RemovalRequest"),
      message: t("UserPanel.Cases.CaseDetailsPage.RemovalRequestMsg"),
    },
    documentDeletion: {
      title: t("UserPanel.Cases.CaseDetailsPage.DeleteConfirmation"),
      message: t("UserPanel.Cases.CaseDetailsPage.DeleteConfirmationMsg"),
    },
  };


  const [currCase, setCurrCase] = useState({});
  const [currModalDataState, setCurrModalDataState] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [experts, setExperts] = useState([])

  const getExpertsByCase = async () => {
    await axios.post(baseURL + "/api/getexpertclientbycase", {
      CaseId: caseId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setExperts(response.data.response.data)
    });
  }

  const toggleModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };


  const getCase = async () => {
    await axios.post(baseURL + "/api/getcasebyid", {
      CaseId: caseId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setCurrCase(response.data.response.data[0])
    })
  };

  const caseUpdateHandler = (e) => {
    setCurrCase({ ...currCase, [e.target.name]: e.target.value });
  };

  const deleteClickHandler = (state) => {
    setCurrModalDataState(state);
    toggleModal();
  };

  useEffect(() => {
    getCase();
    getExpertsByCase();
  }, [])

  console.log(currCase);

  const [editStatus, setEditStatus] = useState(false);

  return (
    <>
      <div
        className={`user_caseDetails_outer ${lang === "ar" ? "user_caseDetails_outer_ar" : ""
          }`}>
        <H2 text={t("UserPanel.Cases.CaseDetailsPage.CaseDetails")} />
        <CardLayout className="user_caseDetails__card p-md-5 ">
          <div className="user_caseDetails__left">
            <div className="user_caseDetails__cases_div">
              <div className="user_caseDetails__cases_div__header">
                <H4 text={t("UserPanel.Cases.CaseDetailsPage.Case")} />
                {!editStatus && (
                  <Button1
                    onClick={() => setEditStatus(true)}
                    text={t("UserPanel.Cases.CaseDetailsPage.EditRequest")}
                  />
                )}
              </div>
              {editStatus ? (
                <div className="user_caseDetails__case_div--edit">
                  <InputBox
                    label={t("UserPanel.Cases.AddNewCasePage.Name")}
                    nameIdHtmlFor={"caseName"}
                    type={"text"}
                    placeholder={t(
                      "UserPanel.Cases.AddNewCasePage.NameOfTheCase"
                    )}
                    onChange={caseUpdateHandler}
                    value={currCase.CaseName}
                  />
                  <InputBox
                    label={t("UserPanel.Cases.AddNewCasePage.Type")}
                    nameIdHtmlFor={"type"}
                    type={"select"}
                    options={[t("UserPanel.Cases.AddNewCasePage.PublicCourt")]}
                    onChange={caseUpdateHandler}
                    value={currCase.CaseType}
                  />
                  <InputBox
                    label={t("UserPanel.Cases.AddNewCasePage.Description")}
                    nameIdHtmlFor={"description"}
                    type={"textarea"}
                    placeholder={t(
                      "UserPanel.Cases.AddNewCasePage.DescriptionOfTheCase"
                    )}
                    onChange={caseUpdateHandler}
                    value={currCase.Description}
                  />
                  <InputBox
                    label={t("UserPanel.Cases.AddNewCasePage.Status")}
                    nameIdHtmlFor={"status"}
                    options={[
                      t("UserPanel.Cases.All"),
                      t("UserPanel.Cases.New"),
                      t("UserPanel.Cases.Opened"),
                      t("UserPanel.Cases.UnderReview"),
                      t("UserPanel.Cases.InProgress"),
                      t("UserPanel.Cases.Closed"),
                      t("UserPanel.Cases.Won"),
                      t("UserPanel.Cases.Lost"),
                    ]}
                    type={"select"}
                    onChange={caseUpdateHandler}
                    value={currCase.Status}
                  />
                </div>
              ) : (
                <CaseDetailsTable
                  labels={[
                    t("UserPanel.Cases.Name"),
                    t("UserPanel.Cases.Type"),
                    t("UserPanel.Cases.Experts"),
                  ]}
                  details={currCase}
                />
              )}
              {editStatus && (
                <div className="w-100 d-flex justify-content-end my-5">
                  <Button1
                    onClick={() => setEditStatus(false)}
                    text={t("UserPanel.Cases.CaseDetailsPage.Update")}
                  />
                </div>
              )}
            </div>
            <div className="user_caseDetails__experts_div">
              {editStatus && (
                <div className="mb-5">
                  <H4
                    text={t("UserPanel.Cases.CaseDetailsPage.AddExpert")}
                    className="mb-4"
                  />
                  <Button1
                    text={t("UserPanel.Cases.CaseDetailsPage.AddRequest")}
                  />
                </div>
              )}
              <H4 text={t("UserPanel.Cases.Experts")} />
              <div className="user_caseDetails__experts_div__inner">
                {experts.length !== 0 ?
                  experts.map(({ ExpertName }, index) => (
                    <ExpertDisplay
                      key={index}
                      editStatus={editStatus}
                      expertName={ExpertName}
                      areaOfExpertise={"Area of Expertise"}
                      onDeleteClick={() => deleteClickHandler("expertRemoval")}
                    />
                  ))
                  :
                  <p>No Experts Found</p>
                }
              </div>
            </div>
          </div>
          <div className="user_caseDetails__right">
            <H3
              text={t("UserPanel.Cases.AddNewCasePage.Documents")}
              className="text-xl-center "
            />
            <div>
              <h5>{t("UserPanel.Cases.Experts")}</h5>
              <Pdf
                name={"Name of the document"}
                size={"120kb"}
                editStatus={editStatus}
                onDeleteClick={() => deleteClickHandler("documentDeletion")}
              />
              <Pdf
                name={"Name of the document"}
                size={"120kb"}
                editStatus={editStatus}
                onDeleteClick={() => deleteClickHandler("documentDeletion")}
              />
            </div>
            <div>
              <h5>{t("UserPanel.Cases.AddNewCasePage.User")}</h5>
              <Pdf
                name={"Name of the document"}
                size={"120kb"}
                editStatus={editStatus}
                onDeleteClick={() => deleteClickHandler("documentDeletion")}
              />
              <Pdf
                name={"Name of the document"}
                size={"120kb"}
                editStatus={editStatus}
                onDeleteClick={() => deleteClickHandler("documentDeletion")}
              />
            </div>
          </div>
        </CardLayout>
        {isModalVisible && (
          <Modal toggleModal={toggleModal}>
            <H4 text={modalData[currModalDataState].title} className="pb-2" />
            <p className="py-4 border-top">
              {modalData[currModalDataState].message}
            </p>
            <div className="d-flex align-items-center justify-content-end">
              {currModalDataState === "expertRemoval" && (
                <>
                  <Button1
                    onClick={toggleModal}
                    text={t("UserPanel.Cases.CaseDetailsPage.Cancel")}
                    color="gray"
                    className="mx-3"
                  />
                  <Button1
                    onClick={toggleModal}
                    text={t("UserPanel.Cases.CaseDetailsPage.Request")}
                  />
                </>
              )}
              {currModalDataState === "documentDeletion" && (
                <>
                  <Button1
                    onClick={toggleModal}
                    text={t("UserPanel.Cases.CaseDetailsPage.Cancel")}
                    color="gray"
                    className="mx-3"
                  />
                  <Button1
                    onClick={toggleModal}
                    color="red"
                    text={t("UserPanel.Cases.CaseDetailsPage.Delete")}
                  />
                </>
              )}
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default CaseDetails;
