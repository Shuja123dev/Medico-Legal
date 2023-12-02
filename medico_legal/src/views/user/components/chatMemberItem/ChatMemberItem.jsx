import React from "react";
import "./chatMemberItem.css";
import { userImg } from "../../assets";
import { useSelector } from "react-redux";

const ChatMemberItem = ({ name, type }) => {
  const lang = useSelector((state) => state.language.value);
  return (
    <>
      <div className="user_chatMemberItem">
        <div>
          <img src={userImg} alt={name} />
        </div>
        <div
          className={`
          user_chatMemberItem__text_div
          ${lang === "ar" ? "user_chatMemberItem__text_div--ar" : ""}
          `}>
          <h5>{name}</h5>
          <span>{type}</span>
        </div>
      </div>
    </>
  );
};

export default ChatMemberItem;
