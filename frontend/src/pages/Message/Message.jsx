import React, { useEffect, useState } from "react";
import "./message.scss";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
const Message = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const { token } = useParams();
  useEffect(() => {
    const verify = async () => {
      setError(null);
      try {
        const response = await fetch(`/api/user//verify/${token}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to verify");
        //   setError(data.error);
        }
        console.log(data);

        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
      } catch (error) {
        console.error("Error occures:", error);
        // Handle error state or display a message to the user
      }
    };

    verify();
  }, [token, dispatch]);
  return (
    <div className="message container d-flex justify-content-center align-items-center mt-5">
      <h1>Your account is verifyed successfully</h1>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Message;
