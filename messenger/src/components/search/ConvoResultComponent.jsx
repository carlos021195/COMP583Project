import React, { useContext, useEffect, useRef, useState } from "react";
import Conversation from "../conversations/Conversation";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

// Needs to be finished. Need to create component that will display the results or empty if none
const ConvoResultComponent = ({result, setCurrentChat, conversations, setConversations}) => {
    const { user } = useContext(AuthContext);
    
    const handleJoinConvo = async(e) => {
        e.preventDefault();
        const joinInput = {
          conversationId: result._id
        }
        try {
          const res = await axios.put("http://localhost:8800/api/conversations/"+user._id+"/join", joinInput);
          if(res.status == 201){
            setConversations([...conversations,res.data]);
            setCurrentChat(res.data);
          }
          if(res.status==200){
            var arr = conversations.filter(x => x!=res.data);
            setConversations(arr);
            setCurrentChat(null);
          }
        }
        catch(err) {
          console.log(err);
        }
      }

    return(
        <div>
            {result.title}
            <button className="chatSubmitButton" onClick={handleJoinConvo}>Join</button>
        </div>
    )
}
export default ConvoResultComponent;