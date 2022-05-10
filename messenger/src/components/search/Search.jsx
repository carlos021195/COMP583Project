import React, { useEffect, useState } from "react";
import ConvoResults from "./ConvoResults";
import UserResults from "./UserResults";
import axios from "axios";
import CreateGroupComponent from "./CreateGroupComponent"


const Search = ({conversations, setConversations, setCurrentChat, handleJoinConvo, handleCreateUserConvo, handleCreateGroupConvo}) => {
    const [userResult, setUserResult] = useState([]);
    const [convoResult, setConvoResult] = useState([]);
    const [input, setInput] = useState("");

    const clear = () => {
        setUserResult([]);
        setConvoResult([]);
    }

    const handleChange = async (e) => {
      e.preventDefault()
        setInput(e.target.value);
        if(input==0) clear();
        const text = input.replace(/[^a-z0-9 _]/gi, '');
        if (text.length>0){
          const userRes = await axios.get(
            "http://localhost:8800/api/users/searchuser/" + text
          );
          const convoRes = await axios.get(
            "http://localhost:8800/api/conversations/searchconversations/" + text
          );
          setUserResult(userRes.data);
          setConvoResult(convoRes.data);
        }
        else {
          setUserResult([]);
          setConvoResult([]);
        }
        //Need to render results or no user found
    }
  return (
    <>
        <input
            onChange={handleChange}
            placeholder="Search for groups and friends"
            className="chatMenuInput"
        />
        <div className="searchResultsComponent" onBlur={clear}>
            <UserResults searchResult={userResult} conversations={conversations} setConversations={setConversations} setCurrentChat={setCurrentChat} handleCreateUserConvo={()=>handleCreateUserConvo()} />
            <ConvoResults searchResult={convoResult} conversations={conversations} setConversations={setConversations} setCurrentChat={setCurrentChat} handleJoinConvo={()=>handleJoinConvo()} />
            <CreateGroupComponent conversations={conversations} setConversations={setConversations} setCurrentChat={setCurrentChat} handleCreateGroupConvo={()=>handleCreateGroupConvo()} title={input} />
        </div>
    </>
  );
}

export default Search;