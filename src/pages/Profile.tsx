import { useEffect, useState } from "react";
import NavBar from "../components/nav/NavBar";
import PostGrid from "../components/post/PostGrid";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../Firebase";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<DocumentData | undefined>();

  useEffect(() => {
    let q = query(
      collection(db, "user"),
      limit(1),
      where("UserName", "==", params.username)
    );

    getDocs(q).then((snapshot) => {
      let found = false;

      snapshot.forEach((doc) => {
        setUserData(doc.data());

        found = true;
      });

      if (!found) {
        navigate("/");
      }
    });
  }, [params]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="">
        <div className="container primary-background-cus pt-1">
          <div className="card my-3">
            <div className="card-body secondary-chatbox-cus">
              <div className="secondary-chatbox-cus">
                {userData?.UserImage && (
                  <img
                    src={userData.UserImage}
                    height={"100px"}
                    width={"100px"}
                    className="rounded-circle me-2 object-fit-cover"
                    alt=""
                  />
                )}
                <div className="mt-3">
                  {"@" + userData?.UserName}
                </div>
              </div>
              <p className="mt-3 p-1 d-inline-flex primary-chatbox-cus rounded">{userData?.Description}</p>

              {userData.UserID == auth.currentUser?.uid && (
                <div>
                  <Link to={"/edit-profile"} className="secondary-chatbox-cus me-2">
                    Edit Profile
                  </Link>
                  <Link to={"/signout"} className="secondary-chatbox-cus">
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>

          <PostGrid
            sortBy={"recentlyPosted"}
            time={"allTime"}
            distance={"everywhere"}
            currentLat={0}
            currentLon={0}
            user={userData?.UserID}
            key={userData?.UserID}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
