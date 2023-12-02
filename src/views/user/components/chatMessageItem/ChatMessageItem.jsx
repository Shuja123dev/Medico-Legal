import React from "react";
import "./chatMessageItem.css";
import { useSelector } from "react-redux";

const ChatMessageItem = ({ message }) => {
  const { text, time, isMine, sender } = message;
  const senderNameInitial = sender ? sender[0] : "A";

  const textWithLineBreaks = text.split("\n").join("<br>");
  const lang = useSelector((state) => state.language.value);

  return (
    <>
      <div
        className={`user_chatMessageItem ${
          lang === "ar" ? "user_chatMessageItem_ar" : ""
        }
        `}>
        {!isMine && (
          <div className="user_chatMessageItem__sender_label">
            <div>
              <span className="text-uppercase ">{senderNameInitial}</span>
            </div>
          </div>
        )}
        <div
          className={`user_chatMessageItem__message_div ${
            isMine ? "user_chatMessageItem__message_div--mine" : ""
          }`}>
          <p
            className="user_chatMessageItem__text"
            dangerouslySetInnerHTML={{ __html: textWithLineBreaks }}></p>
          <span className="user_chatMessageItem__time">{time}</span>
        </div>
      </div>
    </>
  );
};

export default ChatMessageItem;
