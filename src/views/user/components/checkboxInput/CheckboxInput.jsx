import React, { useEffect, useState } from "react";
import "./checkboxInput.css";
import { useTranslation } from "react-i18next";

const CheckboxInput = ({
  label,
  nameIdHtmlFor,
  uploadButton = false,
  value,
  onChange,
  onUploadClick,
}) => {
  const { t } = useTranslation();
  const [isUploadEnable, setisUploadEnable] = useState(value);

  useEffect(() => {
    setisUploadEnable(value);
  }, [value]);

  return (
    <>
      <div className="checkbox_input">
        <input
          type="checkbox"
          name={nameIdHtmlFor}
          id={nameIdHtmlFor}
          value={value}
          onChange={onChange}
        />
        <label htmlFor={nameIdHtmlFor}>{label}</label>
        {uploadButton && (
          <button
            disabled={!isUploadEnable}
            type="button"
            onClick={onUploadClick}
            className={`checkbox_input_upload ${
              !isUploadEnable ? "checkbox_input_upload--disabled" : ""
            }`}>
            {t("UserPanel.Cases.AddNewCasePage.Upload")}
          </button>
        )}
      </div>
    </>
  );
};

export default CheckboxInput;
