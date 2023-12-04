import React from "react";
import "./profileUploadBox.css";
import Button1 from "../button1/Button1";
import { Link } from "react-router-dom";

const ProfileUploadBox = ({
  text,
  buttonText,
  onClick,
  buttonType = "button",
  image = null,
  to,
}) => {
  return (
    <>
      <div className="case_profileUploadBox">
        <div className="case_profileUploadBox__text_img">
          <h4>{text}</h4>
          {image && <img src={image} alt="dummy" />}
        </div>
        {buttonType === "button" && (
          <Button1 text={buttonText} onClick={onClick} />
        )}
        {buttonType === "link" && (
          <Link to={to} className="case_profileUploadBox__linkButton">
            {buttonText}
          </Link>
        )}
      </div>
    </>
  );
};

export default ProfileUploadBox;
