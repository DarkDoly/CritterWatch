import { useContext } from "react";
import { UserContext } from "../account/UserProvider";
import { Link } from "react-router-dom";

function NavAccount() {
  const { userData } = useContext(UserContext);

  if (userData) {
    return (
      <Link to={"/profile"} className="text-dark">
        {userData?.UserEmail}
      </Link>
    );
  }

  return (
    <Link to={"/register"}>
      <button type="button" className="btn btn-dark">
        Register
      </button>
    </Link>
  );
}

export default NavAccount;
