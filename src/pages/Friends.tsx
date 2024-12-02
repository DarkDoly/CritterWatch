import { useContext, useEffect, useState } from "react";
import NavBar from "../components/nav/NavBar";
import { UserContext } from "../components/account/UserProvider";
import SelectableChat from "../components/friends/SelectableChat";
import { Link, useParams } from "react-router-dom";
import MessageBox from "../components/friends/MessageBox";

function Friends() {
  const { userData } = useContext(UserContext);

  const params = useParams();

  const [selectableFriends, setSelectableFriends] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const friends = userData?.friends_ID.map((userID: string) => {
      return <SelectableChat userID={userID} />;
    });

    setSelectableFriends(friends);
  }, [userData]);

  return (
    <>
      <NavBar />

      <div className="container">
        <div className="row my-3">
          <Link to={"/requests"} className="my-2 text-dark">
            Friend Requests:{" "}
            {userData?.pending_friends_ID
              ? userData?.pending_friends_ID.length
              : 0}
          </Link>
          <div className="col-4">{selectableFriends}</div>

          <div className="col-8">
            {params.username && <MessageBox username={params.username} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Friends;
