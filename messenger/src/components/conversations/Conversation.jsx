import axios from "axios";
import "./conversation.css";
import { useEffect, useState } from "react";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        style={{maxWidth: '55px', maxHeight: '70px'}}
        src={
          "https://i.stack.imgur.com/l60Hf.png"
        }
        alt=""
      />
      <span className="conversationName">{conversation.title}</span>
    </div>
  );
}

export default Conversation;