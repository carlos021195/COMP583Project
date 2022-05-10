import React, { useContext, useEffect, useRef, useState } from "react";
import Conversation from "../conversations/Conversation";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

// Needs to be finished. Need to create component that will display the results or empty if none
const ConvoResultComponent = ({ setCurrentChat, conversations, setConversations, title}) => {
    const { user } = useContext(AuthContext);
    
    const handleCreateGroupConvo = async() => {
        const convo = {
            members: [user._id],
            title: title,
            creatorId: user._id
        };
        try {
            const res = await axios.post("http://localhost:8800/api/conversations/"+user._id, convo);
            //set conversation array here and make conversation selected conversation
            setConversations([...conversations,res.data]);
            setCurrentChat(res.data);
          } catch (err) {
            console.log(err);
          }
    }

    return(
        title.length > 0 ?
        <div>
            {title}
            <button className="chatSubmitButton" onClick={handleCreateGroupConvo}>Create</button>
        </div>
        : null
    )
}
export default ConvoResultComponent;