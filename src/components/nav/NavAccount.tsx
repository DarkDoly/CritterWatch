import { useContext } from "react";
import { UserContext } from "../account/UserProvider";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase";

function NavAccount() {
  const { userData } = useContext(UserContext);

  if (userData && auth.currentUser) {
    return (
      <div>
        <Link to={"/friends"} className="text-dark" style= {{color: "#464443", backgroundColor: "#f5ece5"}}>
          <button type="button" className="btn">
            Friends
            {userData?.pending_friends_ID.length > 0 && (
              <span className="badge text-bg-danger ms-2">
                {userData?.pending_friends_ID.length}
              </span>
            )}
          </button>
        </Link>
        <Link to={"/create"}>
          <button type="button" className="btn mx-3" style= {{color: "#464443", backgroundColor: "#f5ece5"}}>
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
      <button type="button" className="btn" style= {{color: "#464443", backgroundColor: "#f5ece5"}}>
        Register
      </button>
    </Link>
  );
}

export default NavAccount;
