import { useContext } from "react";
import { UserContext } from "../account/UserProvider";
import { Link } from "react-router-dom";

function NavAccount() {
  const { userData } = useContext(UserContext);

  if (userData) {
    return (
      <div>
        <Link to={"/friends"} className="text-dark">
          <button type="button" className="btn btn-dark">
            Friends
          </button>
        </Link>
        <Link to={"/create"}>
          <button type="button" className="btn btn-dark mx-3">
            Create Post
          </button>
        </Link>
        <Link
          to={"/user/" + userData?.UserName}
          className="text-dark text-decoration-none"
        >
          {userData.UserImage && (
            <img
              src={userData.UserImage}
              height={"45px"}
              width={"45px"}
              className="rounded-circle me-2 object-fit-cover"
              alt=""
            />
          )}
          {"@" + userData?.UserName}
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
