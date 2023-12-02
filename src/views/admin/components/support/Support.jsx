import React, { useEffect, useState } from 'react'
import { H2 } from '../../../user/components'
import { ChatLeftSidebar } from '../../../user/containers'

const Support = () => {
    const [isLeftSidebarHidden, setisLeftSidebarHidden] = useState(true);
    const [createTicketModal, setCreateTicketModal] = useState(false);
    const [chatType, setChatType] = useState("");

    useEffect(() => {
        setChatType(location);
    }, [location]);

    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState({});
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatType === "experts-chat") {
            setEntries(experts);
            setCurrentEntry(experts[0]);
            setMessages(expertsDummyMessages);
        } else if (chatType === "cases-chat") {
            setEntries(cases);
            setCurrentEntry(cases[0]);
            setMessages(casesDummyMessages);
        } else if (chatType === "admin-chat") {
            setEntries([]);
            setCurrentEntry({ name: "admin" });
            setMessages(adminDummyMessages);
        } else if (chatType === "support") {
            setEntries(tickets);
            setCurrentEntry(tickets[0]);
            setMessages(ticketsDummyMessages);
        } else if (chatType === "clients-chat") {
            setEntries(clients);
            setCurrentEntry(clients[0]);
            setMessages(clientsDummyMessages);
        }
    }, [chatType]);
    const toggleLeftSidebar = () => {
        setisLeftSidebarHidden((prevState) => !prevState);
    };
    const toggleTicketModal = () => {
        setCreateTicketModal((prevState) => !prevState);
    };
    return (
        <>
            <H2 text={"SUPPORT"} className='mb-4' />
            <ChatLeftSidebar
                isLeftSidebarHidden={isLeftSidebarHidden}
                toggleLeftSidebar={toggleLeftSidebar}
                chatType={chatType}
                entries={entries}
                currentEntry={currentEntry}
                setCurrentEntry={setCurrentEntry}
                // Ticket
                toggleTicketModal={toggleTicketModal}
            />
        </>
    )
}

export default Support
