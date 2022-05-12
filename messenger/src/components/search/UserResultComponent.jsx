import React, { useContext, useEffect, useRef, useState } from "react";
import Conversation from "../conversations/Conversation";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

// Needs to be finished. Need to create component that will display the results or empty if none
const UserResultComponent = ({result, conversations, setConversations, setCurrentChat}) => {
    const { user } = useContext(AuthContext);
    
    const handleCreateUserConvo = async(r) => {
        console.log("In here", result._idd, result.username)
        const convo = {
            members: [user._id, result._id],
            title: user.username+", "+result.username,
            creatorId: user._id,
            isGroup: false
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
        <div>
            {result.username}
            <button className="chatSubmitButton" onClick={()=>handleCreateUserConvo(result._id, result.username)}>Message</button>
        </div>
    )
}
export default UserResultComponent;