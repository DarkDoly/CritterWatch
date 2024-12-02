import { useContext, useEffect, useState } from "react";
import NavBar from "../components/nav/NavBar";
import PostGrid from "../components/post/PostGrid";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import { UserContext } from "../components/account/UserProvider";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { userData } = useContext(UserContext);

  const [currentUserData, setCurrentUserData] = useState<
    DocumentData | undefined
  >();

  const handleAddFriend = () => {
    if (!userData || !currentUserData) return;

    if (!userData.friends_ID) {
      userData.friends_ID = [];
    }

    userData.friends_ID.push(currentUserData.UserID);

    updateDoc(doc(db, "user", userData.UserID), {
      friends_ID: userData.friends_ID,
    });

    if (!currentUserData.pending_friends_ID) {
      currentUserData.pending_friends_ID = [];
    }

    currentUserData.pending_friends_ID.push(userData.UserID);

    updateDoc(doc(db, "user", currentUserData.UserID), {
      pending_friends_ID: currentUserData.pending_friends_ID,
    });
  };

  const handleRemoveFriend = () => {
    if (!userData || !currentUserData) return;

    if (!userData.friends_ID) {
      userData.friends_ID = [];
    }

    userData.friends_ID = userData.friends_ID.filter(
      (e: string) => e != currentUserData.UserID
    );

    updateDoc(doc(db, "user", userData.UserID), {
      friends_ID: userData.friends_ID,
    });
  };

  useEffect(() => {
    let q = query(
      collection(db, "user"),
      limit(1),
      where("UserName", "==", params.username)
    );

    getDocs(q).then((snapshot) => {
      let found = false;

      snapshot.forEach((doc) => {
        setCurrentUserData(doc.data());

        found = true;
      });

      if (!found) {
        navigate("/");
      }
    });
  }, [params]);

  if (!currentUserData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />

      <div className="container">
        <div className="card my-3">
          <div className="card-body">
            <div>
              {currentUserData?.UserImage && (
                <img
                  src={currentUserData.UserImage}
                  height={"45px"}
                  width={"45px"}
                  className="rounded-circle me-2 object-fit-cover"
                  alt=""
                />
              )}
              {"@" + currentUserData?.UserName}
            </div>
            <p className="mt-3">{currentUserData?.Description}</p>

            {currentUserData.UserID == auth.currentUser?.uid && (
              <div>
                <Link to={"/edit-profile"} className="text-secondary me-2">
                  Edit Profile
                </Link>
                <Link to={"/signout"} className="text-secondary">
                  Sign Out
                </Link>
              </div>
            )}

            {currentUserData.UserID != auth.currentUser?.uid &&
              !userData?.friends_ID?.includes(currentUserData.UserID) && (
                <button className="btn btn-dark" onClick={handleAddFriend}>
                  Add Friend
                </button>
              )}

            {currentUserData.UserID != auth.currentUser?.uid &&
              userData?.friends_ID?.includes(currentUserData.UserID) && (
                <button className="btn btn-dark" onClick={handleRemoveFriend}>
                  Remove Friend
                </button>
              )}
          </div>
        </div>

        <PostGrid
          sortBy={"recentlyPosted"}
          time={"allTime"}
          distance={"everywhere"}
          currentLat={0}
          currentLon={0}
          user={currentUserData?.UserID}
          key={currentUserData?.UserID}
        />
      </div>
    </>
  );
};

export default Profile;
