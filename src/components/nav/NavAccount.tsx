import { useContext } from "react";
import { UserContext } from "../account/UserProvider";
import { Link } from "react-router-dom";

function NavAccount() {
  const { userData } = useContext(UserContext);

  if (userData) {
    return (
      <div>
        <Link to={"/create"}>
          <button type="button" className="btn btn-dark mx-3">
            Create Post
          </button>
        </Link>
        <Link to={"/profile"} className="text-dark">
          {userData?.UserEmail}
        </Link>
      </div>
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
