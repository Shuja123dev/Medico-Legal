import React, { useState } from "react";
import "./userPicCard.css";
import { chevronDownIcon, userIcon } from "../../assets";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const UserPicCard = () => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.value);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const navigate = useNavigate()
  return (
    <>
      <div
        className={`user_pic_card_outer ${lang === "ar" ? "user_pic_card_outer_ar" : ""
          }`}>
        <button
          className={`user_pic_card`}
          onClick={() => setIsCardExpanded((prevState) => !prevState)}>
          <div className="user_pic_card_inner">
            <img src={userIcon} alt="user name" />
            <span>Name</span>
          </div>
          <img src={chevronDownIcon} alt="chevron down" width={12} />
        </button>
        {isCardExpanded && (
          <div className="user_pic_card_logout">
            <button
              onClick={() => navigate("/signin")}
            >{t("UserPanel.UserPicCard.Logout")}</button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPicCard;
