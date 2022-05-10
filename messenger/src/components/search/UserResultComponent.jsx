import React, { useContext, useEffect, useRef, useState } from "react";
import Conversation from "../conversations/Conversation";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

// Needs to be finished. Need to create component that will display the results or empty if none
const UserResultComponent = ({result, conversations, setConversations, setCurrentChat, handleCreateUserConvo}) => {
    const { user } = useContext(AuthContext);
    console.log(result._id)
    return(
        <div>
            {result.username}
            <button className="chatSubmitButton" onClick={()=>handleCreateUserConvo(result._id, result.title)}>Message</button>
        </div>
    )
}
export default UserResultComponent;