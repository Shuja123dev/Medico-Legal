import React, { useState } from "react";
import "./header.css";
import { LanguageToggle, UserPicCard } from "../../components";
import { barsIcon, xIcon } from "../../assets";
import { useSelector } from "react-redux";

const Header = ({ toggleSidebar, isSidebarHidden }) => {
  const lang = useSelector((state) => state.language.value);
  const [isPicCardExpanded, setIsPicCardExpanded] = useState(false);
  const [isLanguageToggleExpanded, setIsLanguageToggleExpanded] =
    useState(false);

  return (
    <>
      <div className="user_header"></div>
      <button
        className={`user_header_bars_btn ${lang === "ar" ? "user_header_bars_btn_ar" : ""
          }`}
        onClick={toggleSidebar}>
        <img src={isSidebarHidden ? barsIcon : xIcon} alt="ham icon" />
      </button>
      <UserPicCard
        isPicCardExpanded={isPicCardExpanded}
        setIsPicCardExpanded={setIsPicCardExpanded}
        isLanguageToggleExpanded={isLanguageToggleExpanded}
        setIsLanguageToggleExpanded={setIsLanguageToggleExpanded}
      />
      <LanguageToggle
        isPicCardExpanded={isPicCardExpanded}
        setIsPicCardExpanded={setIsPicCardExpanded}
        isLanguageToggleExpanded={isLanguageToggleExpanded}
        setIsLanguageToggleExpanded={setIsLanguageToggleExpanded}
      />
    </>
  );
};

export default Header;
