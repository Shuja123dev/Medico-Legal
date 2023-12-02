import React from "react";
import "./chatRightSidebar.css";
import { plusIcon, xIcon } from "../../assets";
import { Button1, ChatMemberItem, H3, Pdf } from "../../components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ChatRightSidebar = ({
  isRightSidebarHidden,
  toggleRightSidebar,
  chatmembers,
  documents,
}) => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.value);

  return (
    <>
      <div
        className={`user_chatRightSidebar ${
          isRightSidebarHidden ? "user_chatRightSidebar--hidden" : ""
        } ${lang === "ar" ? "user_chatRightSidebar_ar" : ""}`}>
        <button
          onClick={toggleRightSidebar}
          className="user_chatRightSidebar__close_btn">
          <img src={xIcon} alt="x" />
        </button>
        <div className="user_chatRightSidebar__top">
          <H3 text={t("UserPanel.Chat.ChatMembers")} />
          <div className="user_chatRightSidebar__chatMembers_div">
            {chatmembers.map(({ name, type }, index) => (
              <ChatMemberItem key={index} name={name} type={type} />
            ))}
          </div>
        </div>
        <div className="user_chatRightSidebar__bottom">
          <H3 text={t("UserPanel.Cases.AddNewCasePage.Documents")} />
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <h5>{t("UserPanel.Cases.AddNewCasePage.User")}</h5>
              <Button1 icon={plusIcon} />
            </div>
            {documents
              .filter((doc) => doc.type === "user")
              .map((doc, index) => (
                <Pdf key={index} name={doc.name} size={doc.size} />
              ))}
          </div>
          <div>
            <h5>{t("UserPanel.Cases.Experts")}</h5>
            {documents
              .filter((doc) => doc.type === "experts")
              .map((doc, index) => (
                <Pdf key={index} name={doc.name} size={doc.size} />
              ))}
          </div>
          <div>
            <h5>{t("UserPanel.Chat.Admin")}</h5>
            {documents
              .filter((doc) => doc.type === "admin")
              .map((doc, index) => (
                <Pdf key={index} name={doc.name} size={doc.size} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRightSidebar;
