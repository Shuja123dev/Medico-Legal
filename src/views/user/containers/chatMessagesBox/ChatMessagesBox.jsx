import React, { useEffect, useRef } from "react";
import "./chatMessagesBox.css";
import ChatMessageItem from "../../components/chatMessageItem/ChatMessageItem";
import { useTranslation } from "react-i18next";

const ChatMessagesBox = ({ messages }) => {
  const { t } = useTranslation();
  const messagesBoxRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  };

  console.log(messages);

  return (
    <>
      <div className="user_chatMessageBox" ref={messagesBoxRef}>
        {/* {messages.length > 0 ? (
          messages.map((message, index) => (
            <ChatMessageItem key={index} messageInfo={message} />
          ))
        ) : (
          <div>{t("UserPanel.Chat.NoMessagesToDisplay")}</div>
        )} */}
      </div>
    </>
  );
};

export default ChatMessagesBox;
