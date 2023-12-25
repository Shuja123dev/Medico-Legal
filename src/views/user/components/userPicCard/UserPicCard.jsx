import React from "react";
import "./userPicCard.css";
import { userIcon } from "../../assets";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const UserPicCard = ({
  isPicCardExpanded,
  setIsPicCardExpanded,
  isLanguageToggleExpanded,
  setIsLanguageToggleExpanded,
}) => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.value);

  const picCardClickHandler = () => {
    setIsPicCardExpanded((prevState) => !prevState);
    setIsLanguageToggleExpanded(false);
  };

  const navigate = useNavigate();


  return (
    <>
      <div
        className={`user_pic_card_outer ${lang === "ar" ? "user_pic_card_outer_ar" : ""
          }`}>
        <button className={`user_pic_card`} onClick={picCardClickHandler}>
          <img src={userIcon} alt="user name" />
        </button>
        {isPicCardExpanded && (
          <div className="user_pic_card__dropdown border p-1">
            <button onClick={() => navigate("/signin")}>{t("UserPanel.UserPicCard.Logout")}</button>
            <hr />
            <button>{t("UserPanel.UserPicCard.EditProfile")}</button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPicCard;
