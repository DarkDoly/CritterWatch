import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth).then(() => {
      navigate("/signin");
    });
  }, []);

  return <p>Signing out...</p>;
}

export default SignOut;
