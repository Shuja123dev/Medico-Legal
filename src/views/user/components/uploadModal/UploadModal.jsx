import React, { useState } from "react";
import "./uploadModal.css";
import { Dropzone, H3, InputBox, Pdf } from "../../components";
import { useTranslation } from "react-i18next";

const UploadModal = ({
  modalType,
  nationalAddress = "",
  onNationalAdressChange = () => { },
}) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  return (
    <>
      <div className="user_upload_modal_div">
        {(modalType === "documentUpload") && (
          <Dropzone
            files={files}
            setFiles={setFiles}
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
        {
          files.length > 0 && files.map((file) => {
            return <Pdf key={file.name} name={file.name} size={file.size} />
          })
        }
      </div>
    </>
  );
};

export default UploadModal;
