import React from "react";
import "./uploadModal.css";
import { Dropzone, H3, InputBox } from "../../components";
import { useTranslation } from "react-i18next";

const UploadModal = ({
  modalType,
  nationalAddress = "",
  onNationalAdressChange = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="user_upload_modal_div">
        {modalType === "documentUpload" && (
          <Dropzone
            content={t("UserPanel.Cases.AddNewCasePage.ClickToUploadDocument")}
          />
        )}
        {modalType === "addressUpload" && (
          <>
            <H3
              text={t("UserPanel.Cases.AddNewCasePage.AddNationalAddress")}
              className="text-center"
            />
            <InputBox
              value={nationalAddress}
              onChange={onNationalAdressChange}
              nameIdHtmlFor={"nationalAddress"}
              type={"text"}
              placeholder={t("UserPanel.Cases.AddNewCasePage.NationalAddress")}
            />
          </>
        )}
      </div>
    </>
  );
};

export default UploadModal;
