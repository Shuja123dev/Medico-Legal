import React, { useState } from "react";
import "./chatLeftSidebar.css";
import { plusIcon, userImg, xIcon } from "../../assets";
import {
  Button1,
  ChatLeftbarItemLayout,
  ChatSearchBar,
  H3,
  H4,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ChatLeftSidebar = ({
  isLeftSidebarHidden,
  toggleLeftSidebar,
  entries,
  currentEntry,
  setCurrentEntry,
  chatType,
  toggleTicketModal,
}) => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.value);
  const [searchVal, setSearchVal] = useState("");

  return (
    <>
      <div
        className={`user_chatLeftSidebar ${isLeftSidebarHidden ? "user_chatLeftSidebar--hidden" : ""
          } ${lang === "ar" ? "user_chatLeftSidebar_ar" : ""}`}>
        <button
          onClick={toggleLeftSidebar}
          className="user_chatLeftSidebar__close_btn">
          <img src={xIcon} alt="x" />
        </button>
        {(chatType == "experts-chat" || chatType === "support") && (
          <>
            {chatType === "experts-chat" ? (
              <H3 text={t("UserPanel.Chat.Experts")} />
            ) : (
              <div className="d-flex align-items-center justify-content-between">
                <H3 text={t("UserPanel.Chat.Tickets")} />
                <Button1
                  icon={plusIcon}
                  className="p-2 rounded-5"
                  onClick={() => {
                    toggleTicketModal();
                    toggleLeftSidebar();
                  }}
                />
              </div>
            )}
            <ChatSearchBar setSearchVal={setSearchVal} />
            <div className="user_chatLeftSidebar__items">
              {entries
                .filter((entry) => !searchVal || entry.name.includes(searchVal))
                .map((entry, index) => (
                  <ChatLeftbarItemLayout
                    toggleSidebar={toggleLeftSidebar}
                    value={entry}
                    key={index}
                    currentValue={currentEntry}
                    setCurrentValue={setCurrentEntry}>
                    <div className="d-flex align-items-center ">
                      {chatType === "experts-chat" && (
                        <div>
                          <img src={userImg} alt="user" />
                        </div>
                      )}
                      <div
                        className={`
                        w-100 ${lang === "ar" ? "me-2" : "ms-2"}
                        `}>
                        <H4
                          text={
                            chatType === "experts-chat"
                              ? entry.name
                              : `#${entry.name}`
                          }
                          className={`text-capitalize
                          ${lang === "ar" ? "text-end " : "text-start "}
                          `}
                        />
                        <div className="d-flex align-items-center justify-content-between m-0 user_chatLeftSidebar__item__text">
                          <span>{t("UserPanel.Chat.LastMessage")}</span>
                          <span>{entry.lastMessage}</span>
                        </div>
                      </div>
                    </div>
                  </ChatLeftbarItemLayout>
                ))}
            </div>
          </>
        )}
        {chatType == "cases-chat" && (
          <>
            <H3 text={t("UserPanel.Chat.Cases")} />
            <ChatSearchBar setSearchVal={setSearchVal} />
            <div className="user_chatLeftSidebar__items">
              {entries
                .filter((entry) => !searchVal || entry.name.includes(searchVal))
                .map((entry, index) => (
                  <ChatLeftbarItemLayout
                    toggleSidebar={toggleLeftSidebar}
                    value={entry}
                    key={index}
                    currentValue={currentEntry}
                    setCurrentValue={setCurrentEntry}>
                    <div className="w-100 d-flex flex-column align-items-start">
                      <H4
                        text={entry.name}
                        className="text-start text-capitalize "
                      />
                      <p className="user_chatLeftSidebar__case_p">
                        {t("UserPanel.Chat.LastMessage")}
                      </p>
                      <div className="d-flex align-items-center justify-content-between m-0 user_chatLeftSidebar__item__text user_chatLeftSidebar__item__text--case">
                        <span>{entry.status}</span>
                        <span>12:00</span>
                      </div>
                    </div>
                  </ChatLeftbarItemLayout>
                ))}
            </div>
          </>
        )}

        {(chatType == "clients-chat") && (
          <>
            {chatType === "clients-chat" ? (
              <H3 text={"Clients"} />
            ) : null}
            <ChatSearchBar setSearchVal={setSearchVal} />
            <div className="user_chatLeftSidebar__items">
              {entries
                .filter((entry) => !searchVal || entry.name.includes(searchVal))
                .map((entry, index) => (
                  <ChatLeftbarItemLayout
                    toggleSidebar={toggleLeftSidebar}
                    value={entry}
                    key={index}
                    currentValue={currentEntry}
                    setCurrentValue={setCurrentEntry}>
                    <div className="d-flex align-items-center ">
                      {chatType === "clients-chat" && (
                        <div>
                          <img src={userImg} alt="user" />
                        </div>
                      )}
                      <div
                        className={`
                        w-100 ${lang === "ar" ? "me-2" : "ms-2"}
                        `}>
                        <H4
                          text={
                            chatType === "clients-chat"
                              ? entry.name
                              : `#${entry.name}`
                          }
                          className={`text-capitalize
                          ${lang === "ar" ? "text-end " : "text-start "}
                          `}
                        />
                        <div className="d-flex align-items-center justify-content-between m-0 user_chatLeftSidebar__item__text">
                          <span>{t("UserPanel.Chat.LastMessage")}</span>
                          <span>{entry.lastMessage}</span>
                        </div>
                      </div>
                    </div>
                  </ChatLeftbarItemLayout>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatLeftSidebar;
