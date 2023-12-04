import React from "react";
import "./pdf.css";
import { pdfIcon } from "../../assets";

const Pdf = ({ name, size }) => {
  return (
    <>
      <div className={`pdf_div`}>
        <div>
          <img src={pdfIcon} alt="pdf icon" />
        </div>
        <div className="d-flex flex-column ">
          <h6>{name}</h6>
          <span>{size}</span>
        </div>
      </div>
    </>
  );
};

export default Pdf;
