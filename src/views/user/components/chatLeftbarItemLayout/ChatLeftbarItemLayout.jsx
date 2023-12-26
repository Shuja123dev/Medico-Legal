import React from "react";
import "./chatLeftbarItemLayout.css";

const ChatLeftbarItemLayout = ({
  children,
  value,
  currentValue,
  setCurrentValue,
  toggleSidebar,
}) => {
  const handleClick = () => {
    setCurrentValue(value);
    toggleSidebar();
  };


  return (
    <>
      <button
        className={`user_chatLeftbarItemLayout ${currentValue === value ? "user_chatLeftbarItemLayout--active" : ""
          }`}
        onClick={handleClick}>
        {children}
      </button>
    </>
  );
};

export default ChatLeftbarItemLayout;
