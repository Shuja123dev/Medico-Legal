import React from "react";
import "./dropzone.css";

const Dropzone = ({ content }) => {
  return (
    <>
      <label htmlFor="dropzone-file" className="dropzone_label">
        {content}
        <input id="dropzone-file" type="file" />
      </label>
    </>
  );
};

export default Dropzone;
