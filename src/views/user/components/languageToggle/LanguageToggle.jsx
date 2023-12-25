import React from "react";
import "./languageToggle.css";
import { globeIcon } from "../../assets";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { language } from "../../../../features/language/lanSlice";

const LanguageToggle = ({
  isLanguageToggleExpanded,
  setIsLanguageToggleExpanded,
  isPicCardExpanded,
  setIsPicCardExpanded,
}) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.value);
  const changeLanguage = (lng) => {
    if (lng === "ar") {
      dispatch(language("ar"));
    } else {
      dispatch(language("en"));
    }
    i18n.changeLanguage(lng);
  };

  const langugeToggleClickHandler = () => {
    setIsLanguageToggleExpanded((prevState) => !prevState);
    setIsPicCardExpanded(false);
  };

  return (
    <>
      <div
        className={`user_language_change ${
          lang === "ar" ? "user_language_change--ar" : ""
        }`}>
        <button
          onClick={langugeToggleClickHandler}
          className="d-flex align-items-center justify-content-center border-0 bg-transparent p-2">
          <img src={globeIcon} alt="globe" />
        </button>
        {isLanguageToggleExpanded && (
          <div className="user_language_change__dropdown border p-1">
            <button
              className="font_english"
              onClick={() => {
                changeLanguage("en");
                setIsLanguageToggleExpanded(false);
              }}>
              En
            </button>
            <hr />
            <button
              className="font_arabic"
              onClick={() => {
                changeLanguage("ar");
                setIsLanguageToggleExpanded(false);
              }}>
              العربية
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageToggle;
