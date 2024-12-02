import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/account/UserProvider";
import NavBar from "../components/nav/NavBar";
import { Link } from "react-router-dom";
import RequestBox from "../components/friends/RequestBox";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

function FriendRequests() {
  const { userData } = useContext(UserContext);

  const [pending, setPending] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newPending = userData?.pending_friends_ID?.map((userID: string) => {
      const onAccept = () => {
        const newPending = userData?.pending_friends_ID.filter(
          (e: string) => e !== userID
        );
        userData.friends_ID.push(userID);

        updateDoc(doc(db, "user", userData.UserID), {
          pending_friends_ID: newPending,
          friends_ID: userData.friends_ID,
        });
      };

      const onDeny = () => {
        const newPending = userData?.pending_friends_ID.filter(
          (e: string) => e !== userID
        );

        updateDoc(doc(db, "user", userData.UserID), {
          pending_friends_ID: newPending,
        });
      };

      return (
        <RequestBox
          userID={userID}
          handleAccept={onAccept}
          handleDeny={onDeny}
          key={userID}
        />
      );
    });

    setPending(newPending);
  }, [userData]);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="my-3">
          <Link
            to={"/friends"}
            className="text-dark link-underline link-underline-opacity-0"
          >
            <i className="bi bi-arrow-left"></i> Return
          </Link>
        </div>

        <div className="row">
          <div className="col-4"></div>

          <div className="col-4">{pending}</div>

          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
}

export default FriendRequests;
