import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const{user, token} = useContext(AuthContext);
  const headers = { headers: {"authorization" : `Bearer ${token}`} }

  console.log("user",user);
  return (
    <div className="login" style={{color:'black'}}>
      Welcome {user.username}
    </div>
  );
}
