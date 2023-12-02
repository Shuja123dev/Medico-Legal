import React from "react";
import "./pdf.css";
import { binIcon, pdfIcon } from "../../assets";
import { useSelector } from "react-redux";

const Pdf = ({ name, size, editStatus, onDeleteClick }) => {
  const lang = useSelector((state) => state.language.value);

  return (
    <>
      <div className={`pdf_div ${lang === "ar" ? "pdf_div_ar": ""}`}>
        <div>
          <img src={pdfIcon} alt="pdf icon" />
        </div>
        <div className="d-flex flex-column ">
          <h6>{name}</h6>
          <span>{size}</span>
        </div>
        {editStatus && (
          <button onClick={onDeleteClick}>
            <img src={binIcon} alt="bin" />
          </button>
        )}
      </div>
    </>
  );
};

export default Pdf;
