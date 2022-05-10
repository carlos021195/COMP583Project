import MessagesContainer from "../../components/messagesContainer/MessagesContainer";
import { useHistory } from "react-router-dom";
import SpeechToText from "../../components/inputField/SpeechToText";

const Home = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/register");
    window.location.reload(false);
  }

  return ([
    <div className="topbar"><button onClick={handleLogout}>Logout</button></div>,
    <MessagesContainer/>
  ]
  );
}
export default Home;