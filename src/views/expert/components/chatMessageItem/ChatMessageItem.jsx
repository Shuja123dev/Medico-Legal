import React from "react";
import "./chatMessageItem.css";

const ChatMessageItem = ({ message }) => {
  const { text, time, isMine, sender } = message;
  const senderNameInitial = sender ? sender[0] : "A";

  const textWithLineBreaks = text.split("\n").join("<br>");

  return (
    <>
      <div className={`expert_chatMessageItem`}>
        {!isMine && (
          <div className="expert_chatMessageItem__sender_label">
            <div>
              <span className="text-uppercase ">{senderNameInitial}</span>
            </div>
          </div>
        )}
        <div
          className={`expert_chatMessageItem__message_div ${
            isMine ? "expert_chatMessageItem__message_div--mine" : ""
          }`}>
          <p
            className="expert_chatMessageItem__text"
            dangerouslySetInnerHTML={{ __html: textWithLineBreaks }}></p>
          <span className="expert_chatMessageItem__time">{time}</span>
        </div>
      </div>
    </>
  );
};

export default ChatMessageItem;
