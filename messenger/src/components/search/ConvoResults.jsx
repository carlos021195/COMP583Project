import React from "react";
import ConvoResultComponent from "./ConvoResultComponent";

// Needs to be finished. Need to create component that will display the results or empty if none
const ConvoResults = ({searchResult, conversations, setConversations, setCurrentChat, handleJoinConvo}) => {
    console.log(searchResult.length);
    return(
        searchResult.length > 0 ? searchResult.map(result => {return <ConvoResultComponent result={result} conversations={conversations} setConversations={setConversations} setCurrentChat={setCurrentChat} handleJoinConvo={handleJoinConvo} />}) : null
    )
}
export default ConvoResults;