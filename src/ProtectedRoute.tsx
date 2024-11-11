import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "./Firebase";

interface ProtectedRouteProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    console.log("Checking auth state");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated", user.uid);
      } else {
        console.log("User not authenticated. Redirecting to signin");

        navigate("/signin", { state: { from: location } });
      }

      setAuthChecked(true);
    });
  }, []);

  if (!authChecked) {
    return <>Loading...</>;
  }

  return children;
}

export default ProtectedRoute;
