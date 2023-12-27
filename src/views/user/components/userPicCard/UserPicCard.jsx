import React, { useEffect, useState } from "react";
import "./userPicCard.css";
import { userIcon } from "../../assets";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import H4 from "../h4/H4";

const UserPicCard = ({
  isPicCardExpanded,
  setIsPicCardExpanded,
  isLanguageToggleExpanded,
  setIsLanguageToggleExpanded,
}) => {

  const userId = Cookies.get("userId");
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.value);
  const [userData, setUserData] = useState();

  const picCardClickHandler = () => {
    setIsPicCardExpanded((prevState) => !prevState);
    setIsLanguageToggleExpanded(false);
  };

  const getUserInfo = async () => {
    await axios.post("http://202.182.110.16/medical/api/login", {
      PhoneNo: "03325501021",
      Password: "abc123"
    }).then(async response => {
      const token = response.data.token;
      await axios.post("http://202.182.110.16/medical/api/getuserbyid", {
        UserId: userId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res);
        setUserData(res.data.response.data[0]);
      })
    })
  };

  useEffect(() => {
    getUserInfo()
  }, [])

  const navigate = useNavigate();


  return (
    <>
      <div
        className={`user_pic_card_outer ${lang === "ar" ? "user_pic_card_outer_ar" : ""
          }`}>
        <button className={`user_pic_card`} onClick={picCardClickHandler}>
          <img src={userIcon} alt="user name" />
          <H4 text={userData ? userData.Email : "Loading..."} className="user_pic_card_name" />
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
