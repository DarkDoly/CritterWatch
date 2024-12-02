import { useContext } from "react";
import { UserContext } from "../account/UserProvider";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase";

function NavAccount() {
  const { userData } = useContext(UserContext);

  if (userData && auth.currentUser) {
    return (
      <div>
        <Link to={"/friends"} className="text-dark">
          <button type="button" className="btn" style= {{ backgroundColor: "#f5ece5", color: "#464443" }}>
            Friends
          </button>
        </Link>
        <Link to={"/create"}>
          <button type="button" className="btn mx-3" style= {{ backgroundColor: "#f5ece5", color: "#464443" }}>
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
      <button type="button" className="btn" style= {{ backgroundColor: "#f5ece5", color: "#464443" }}>
        Register
      </button>
    </Link>
  );
}

export default NavAccount;
