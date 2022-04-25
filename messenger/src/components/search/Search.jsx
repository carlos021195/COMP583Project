import React, { useEffect, useState } from "react";
import ConvoResults from "./ConvoResults";
import UserResults from "./UserResults";
import axios from "axios";


const Search = () => {
    const [userResult, setUserResult] = useState([]);
    const [convoResult, setConvoResult] = useState([]);

    const clear = () => {
        setUserResult([]);
        setConvoResult([]);
    }

    const handleChange = async (e) => {
        let input = e.target.value;
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
            clear();
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
            <UserResults searchResult={userResult}/>
            <ConvoResults searchResult={convoResult}/>
        </div>
    </>
  );
}

export default Search;