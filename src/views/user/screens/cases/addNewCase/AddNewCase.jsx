import React, { useState } from "react";
import "./addNewCase.css";
import {
  CheckboxInput,
  H2,
  H3,
  H4,
  Dropzone,
  InputBox,
  Modal,
  Pdf,
  UploadModal,
  Button1,
} from "../../../components";
import { useTranslation } from "react-i18next";
import { CardLayout } from "../../../containers";
import { plusIcon } from "../../../assets";
import { useSelector } from "react-redux";

const AddNewCase = () => {
  const lang = useSelector((state) => state.language.value);
  const { t } = useTranslation();
  const [newCase, setNewCase] = useState({
    caseExistance: "existingCase",
    caseName: "",
    type: t("UserPanel.Cases.AddNewCasePage.PublicCourt"),
    description: "",
    status: t("UserPanel.Cases.AddNewCasePage.New"),
    additionalNotes: "",
    scfhsCopyCheck: false,
    medicalCopyCheck: false,
    governmentIdCheck: false,
    nationalAddressCheck: false,
    nationalAddress: "",
  });

  const newCaseInputHandler = (e) => {
    setNewCase((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");

  const toggleModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  const uploadSubmitClickHandler = (type) => {
    toggleModal();
    setModalType(type);
  };

  return (
    <>
      <div>
        <H2 text={t("UserPanel.Cases.AddNewCase")} />
        <CardLayout className="mt-4">
          <form className="user_addNewCase_form">
            <div
              className={`user_addNewCase_form__details_div ${
                lang === "ar" ? "user_addNewCase_form__details_div_ar" : ""
              }`}>
              <H3
                text={t("UserPanel.Cases.AddNewCasePage.CaseDetails")}
                className="user_addNewCase_form__left_heading"
              />
              <div className="user_addNewCase_form__radio_div">
                <input
                  defaultChecked={newCase.caseExistance === "existingCase"}
                  type="radio"
                  name="caseExistance"
                  value="existingCase"
                  id="existingCase"
                  onChange={newCaseInputHandler}
                />
                <label htmlFor="existingCase">
                  {t("UserPanel.Cases.AddNewCasePage.ExistingCourtCases")}
                </label>
              </div>
              <div className="user_addNewCase_form__radio_div">
                <input
                  type="radio"
                  name="caseExistance"
                  id="nonExistingCase"
                  value="nonExistingCase"
                  defaultChecked={newCase.caseExistance === "nonExistingCase"}
                  onChange={newCaseInputHandler}
                />
                <label htmlFor="nonExistingCase">
                  {t("UserPanel.Cases.AddNewCasePage.NonExistingCourtCases")}
                </label>
              </div>
              <InputBox
                label={t("UserPanel.Cases.AddNewCasePage.Name")}
                nameIdHtmlFor={"caseName"}
                type={"text"}
                placeholder={t("UserPanel.Cases.AddNewCasePage.NameOfTheCase")}
                onChange={newCaseInputHandler}
                value={newCase.caseName}
              />
              <InputBox
                label={t("UserPanel.Cases.AddNewCasePage.Type")}
                nameIdHtmlFor={"type"}
                type={"select"}
                options={[t("UserPanel.Cases.AddNewCasePage.PublicCourt")]}
                onChange={newCaseInputHandler}
                value={newCase.type}
              />
              <InputBox
                label={t("UserPanel.Cases.AddNewCasePage.Description")}
                nameIdHtmlFor={"description"}
                type={"textarea"}
                placeholder={t(
                  "UserPanel.Cases.AddNewCasePage.DescriptionOfTheCase"
                )}
                onChange={newCaseInputHandler}
                value={newCase.description}
              />
              <InputBox
                label={t("UserPanel.Cases.AddNewCasePage.Status")}
                nameIdHtmlFor={"status"}
                type={"text"}
                disabled={true}
                onChange={newCaseInputHandler}
                value={newCase.status}
              />
              <InputBox
                label={t("UserPanel.Cases.AddNewCasePage.AdditionalNotes")}
                nameIdHtmlFor={"additionalNotes"}
                type={"textarea"}
                placeholder={t("UserPanel.Cases.AddNewCasePage.Notes")}
                className="user_addNewCase_form__full_width_textarea"
                onChange={newCaseInputHandler}
                value={newCase.additionalNotes}
              />
              <div className="user_addNewCase_form__checkboxes_div">
                <CheckboxInput
                  label={t("UserPanel.Cases.AddNewCasePage.SCFHSCopy")}
                  nameIdHtmlFor={"scfhsCopyCheck"}
                  onChange={() =>
                    newCaseInputHandler({
                      target: {
                        name: "scfhsCopyCheck",
                        value: !newCase.scfhsCopyCheck,
                      },
                    })
                  }
                  value={newCase.scfhsCopyCheck}
                />
                <CheckboxInput
                  label={t("UserPanel.Cases.AddNewCasePage.MedicalCopy")}
                  nameIdHtmlFor={"medicalCopyCheck"}
                  uploadButton={true}
                  onUploadClick={() =>
                    uploadSubmitClickHandler("documentUpload")
                  }
                  onChange={() =>
                    newCaseInputHandler({
                      target: {
                        name: "medicalCopyCheck",
                        value: !newCase.medicalCopyCheck,
                      },
                    })
                  }
                  value={newCase.medicalCopyCheck}
                />
                <CheckboxInput
                  label={t("UserPanel.Cases.AddNewCasePage.GovernmentId")}
                  nameIdHtmlFor={"governmentIdCheck"}
                  onChange={() =>
                    newCaseInputHandler({
                      target: {
                        name: "governmentIdCheck",
                        value: !newCase.governmentIdCheck,
                      },
                    })
                  }
                  value={newCase.governmentIdCheck}
                />
                <CheckboxInput
                  label={t("UserPanel.Cases.AddNewCasePage.NationalAddress")}
                  nameIdHtmlFor={"nationalAddressCheck"}
                  uploadButton={true}
                  onUploadClick={() =>
                    uploadSubmitClickHandler("addressUpload")
                  }
                  onChange={() =>
                    newCaseInputHandler({
                      target: {
                        name: "nationalAddressCheck",
                        value: !newCase.nationalAddressCheck,
                      },
                    })
                  }
                  value={newCase.nationalAddressCheck}
                />
              </div>
            </div>
            <div
              className={`user_addNewCase_form__documnets_div ${
                lang === "ar" ? "user_addNewCase_form__documnets_div_ar" : ""
              }`}>
              <H3
                text={t("UserPanel.Cases.AddNewCasePage.Documents")}
                className="text-xl-center "
              />
              <div className="user_addNewCase_form__documnets_div__top">
                <h5>{t("UserPanel.Cases.AddNewCasePage.User")}</h5>
                <button>
                  <img src={plusIcon} alt="plus icon" width={12} />
                </button>
              </div>
              <div>
                <Pdf name={"Name of the document"} size={"120kb"} />
                <Pdf name={"Name of the document"} size={"120kb"} />
              </div>
            </div>
            <div className="user_addNewCase_form__submit_btn_div">
              <button
                type="button"
                onClick={() => uploadSubmitClickHandler("submit")}>
                {t("UserPanel.Cases.AddNewCasePage.Submit")}
              </button>
              <p className="text-danger m-0">
                {t("UserPanel.Cases.AddNewCasePage.PleaseUpload")}
              </p>
            </div>
          </form>
        </CardLayout>
        {isModalVisible && (
          <Modal toggleModal={toggleModal}>
            {(modalType === "documentUpload" ||
              modalType === "addressUpload") && (
              <UploadModal
                modalType={modalType}
                onNationalAdressChange={newCaseInputHandler}
                nationalAddress={newCase.nationalAddress}
                toggleModal={toggleModal}
              />
            )}
            {modalType === "submit" && (
              <div className="user_submit_modal">
                <H3
                  text={t("UserPanel.Cases.AddNewCasePage.Agreement")}
                  className="text-center "
                />
                <p>{t("UserPanel.Cases.AddNewCasePage.AgreementText")}</p>
                <p>{t("UserPanel.Cases.AddNewCasePage.AgreementText")}</p>
                <div>
                  <p>{t("UserPanel.Cases.AddNewCasePage.Signature")}</p>
                  <Dropzone
                    content={t(
                      "UserPanel.Cases.AddNewCasePage.UploadDigitalSignature"
                    )}
                  />
                </div>
              </div>
            )}
            <div className="d-flex align-items-center justify-content-between mt-4 ">
              <Button1
                onClick={toggleModal}
                text={t("UserPanel.Cases.AddNewCasePage.Cancel")}
                color="gray"
              />
              <Button1
                onClick={toggleModal}
                text={t("UserPanel.Cases.AddNewCasePage.Submit")}
              />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default AddNewCase;
