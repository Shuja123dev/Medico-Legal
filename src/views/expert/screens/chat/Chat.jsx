import axios from 'axios';
import React, { useEffect, useState } from "react";
import {
  CardLayout,
  ChatLeftSidebar,
  ChatMain,
  ChatRightSidebar,
} from "../../containers";
import "./chat.css";
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

const clientsDummyMessages = [
  {
    text: "Hello Abdullah! I hope you're having a fantastic day. Have you tried the new restaurant downtown? I heard they have amazing food!",
    time: "12:00",
    isMine: false,
    sender: "asad",
    sentTo: null,
  },
  {
    text: "Hey John! Yes, I went there last weekend. The food was indeed incredible. We should plan to go together sometime.",
    time: "12:05",
    isMine: false,
    sender: "asad",
    sentTo: null,
  },
  {
    text: "Arslan, have you read the latest novel by your favorite author? It's a masterpiece!",
    time: "12:10",
    isMine: false,
    sender: "faisal",
    sentTo: null,
  },
  {
    text: "Oh wow! I haven't had the chance yet, but I'm definitely going to check it out. Thanks for the recommendation!",
    time: "12:15",
    isMine: false,
    sender: "hamza",
    sentTo: null,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:20",
    isMine: true,
    sender: null,
    sentTo: "asad",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "hamza",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "saad",
  },
];
const clients = [
  { name: "asad", lastMessage: "12:00" },
  { name: "faisal", lastMessage: "12:00" },
  { name: "hamza", lastMessage: "12:00" },
  { name: "saad", lastMessage: "12:00" },
  { name: "ali", lastMessage: "12:00" },
];

const casesDummyMessages = [
  {
    text: "Hello Abdullah! I hope you're having a fantastic day. Have you tried the new restaurant downtown? I heard they have amazing food!",
    time: "12:00",
    isMine: false,
    sender: "case1",
    sentTo: null,
  },
  {
    text: "Hey John! Yes, I went there last weekend. The food was indeed incredible. We should plan to go together sometime.",
    time: "12:05",
    isMine: false,
    sender: "case1",
    sentTo: null,
  },
  {
    text: "Arslan, have you read the latest novel by your favorite author? It's a masterpiece!",
    time: "12:10",
    isMine: false,
    sender: "case2",
    sentTo: null,
  },
  {
    text: "Oh wow! I haven't had the chance yet, but I'm definitely going to check it out. Thanks for the recommendation!",
    time: "12:15",
    isMine: false,
    sender: "case3",
    sentTo: null,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:20",
    isMine: true,
    sender: null,
    sentTo: "case1",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "case3",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "case4",
  },
];

const cases = [
  { name: "case1", lastMessage: "12:00", status: "active" },
  { name: "case2", lastMessage: "12:00", status: "completed" },
  { name: "case3", lastMessage: "12:00", status: "in progress" },
];

const adminDummyMessages = [
  {
    text: "Hello Abdullah! I hope you're having a fantastic day. Have you tried the new restaurant downtown? I heard they have amazing food!",
    time: "12:00",
    isMine: false,
    sender: "admin",
    sentTo: null,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "admin",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12:25",
    isMine: true,
    sender: null,
    sentTo: "admin",
  },
];

const chatmembers = [
  { name: "asad", type: "expert" },
  { name: "faisal", type: "user" },
];

const documents = [
  { name: "Name of the document", size: "120kb", type: "user" },
  { name: "Name of the document", size: "120kb", type: "user" },
  { name: "Name of the document", size: "120kb", type: "experts" },
  { name: "Name of the document", size: "120kb", type: "experts" },
  { name: "Name of the document", size: "120kb", type: "admin" },
  { name: "Name of the document", size: "120kb", type: "admin" },
];

const Chat = () => {
  const location = useLocation().pathname.split("/")[2];
  const [chatType, setChatType] = useState("");
  const [tickets, setTickets] = useState([]);
  const [showTicketDetails, setShowTicketDetails] = useState(true);
  const [documentUploadModal, setDocumentUploadModal] = useState(false);
  const toggleDocumentUploadModal = () => {
    setDocumentUploadModal((prevState) => !prevState);
  };
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({});
  const [messages, setMessages] = useState([]);



  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get('token')

  const getTickets = async () => {
    await axios.get(baseURL + "/api/getallticket", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      setTickets(res.data.response.data)
    }).catch(error => {
      console.log(error);
    })

  }

  const getMessage = async () => {
    await axios.post(baseURL + "/api/getmessagebyticketno", {
      TicketNo: currentEntry.TicketNo
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data);
      setMessages(res.data.response.data);
    })
  }

  useEffect(() => {
    setChatType(location);
  }, [location]);

  useEffect(() => {
    if (chatType === "clients-chat") {
      setEntries(clients);
      setCurrentEntry(clients[0]);
      setMessages(clientsDummyMessages);
    } else if (chatType === "cases-chat") {
      setEntries(cases);
      setCurrentEntry(cases[0]);
      setMessages(casesDummyMessages);
    } else if (chatType === "admin-chat") {
      setEntries([]);
      setCurrentEntry({ name: "admin" });
      setMessages(adminDummyMessages);
    } else if (chatType === "tickets") {
      getTickets().then(
        getMessage()
      );
    }
  }, [chatType]);

  useEffect(() => {
    getMessage();
  }, [currentEntry])

  useEffect(() => {
    setMessagesToDisplay(messages)
  }, [messages])

  useEffect(() => {
    setEntries(tickets);
    setCurrentEntry(tickets[0]);
  }, [tickets])

  const [messagesToDisplay, setMessagesToDisplay] = useState(messages);

  useEffect(() => {
    setMessagesToDisplay(
      messages
    );
  }, [currentEntry, messages]);



  const [isLeftSidebarHidden, setisLeftSidebarHidden] = useState(true);
  const toggleLeftSidebar = () => {
    setisLeftSidebarHidden((prevState) => !prevState);
  };
  const [isRightSidebarHidden, setisRightSidebarHidden] = useState(true);
  const toggleRightSidebar = () => {
    setisRightSidebarHidden((prevState) => !prevState);
  };

  return (
    <>
      <div className="expert_chat">
        <CardLayout className="mt-0 p-0 expert_chat__inner">
          {chatType !== "admin-chat" && (
            <ChatLeftSidebar
              isLeftSidebarHidden={isLeftSidebarHidden}
              toggleLeftSidebar={toggleLeftSidebar}
              chatType={chatType}
              entries={entries}
              currentEntry={currentEntry}
              setCurrentEntry={setCurrentEntry}
              setShowTicketDetails={setShowTicketDetails}
            />
          )}
          <ChatMain
            toggleLeftSidebar={toggleLeftSidebar}
            toggleRightSidebar={toggleRightSidebar}
            setMessages={setMessages}
            messagesToDisplay={messagesToDisplay}
            currentEntry={currentEntry}
            setCurrentEntry={setCurrentEntry}
            chatType={chatType}
            showTicketDetails={showTicketDetails}
            setShowTicketDetails={setShowTicketDetails}
            toggleDocumentUploadModal={toggleDocumentUploadModal}
            documentUploadModal={documentUploadModal}
            getMessage={getMessage}
          />
          <ChatRightSidebar
            isRightSidebarHidden={isRightSidebarHidden}
            toggleRightSidebar={toggleRightSidebar}
            chatmembers={chatmembers}
            documents={documents}
            toggleDocumentUploadModal={toggleDocumentUploadModal}
          />
        </CardLayout>
      </div>
    </>
  );
};

export default Chat;
