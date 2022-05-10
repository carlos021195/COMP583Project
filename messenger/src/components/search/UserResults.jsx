import React from "react";
import UserResultComponent from "./UserResultComponent";

// Needs to be finished. Need to create component that will display the results or empty if none
const UserResults = ({searchResult, conversations, setConversations, setCurrentChat, handleCreateUserConvo}) => {
    console.log(searchResult)
    return(
        searchResult.length > 0 ? searchResult.map(result => {return <UserResultComponent result={result} conversations={conversations} setConversations={setConversations} setCurrentChat={setCurrentChat} handleCreateUserConvo={() => handleCreateUserConvo()} />}) : null
    )
}
export default UserResults;