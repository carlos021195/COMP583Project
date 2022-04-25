import axios from "axios";
import "./conversation.css";
import { useEffect, useState } from "react";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getConvo = async () => {
  //     try {
  //       const res = await axios("http://localhost:8800"+"/api/conversation" + friendId);
  //       setUser(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [currentUser, conversation]);

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