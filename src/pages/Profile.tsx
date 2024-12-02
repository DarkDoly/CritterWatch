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

      <div className="container">
        <div className="card my-3">
          <div className="card-body">
            <div>
              {userData?.UserImage && (
                <img
                  src={userData.UserImage}
                  height={"45px"}
                  width={"45px"}
                  className="rounded-circle me-2 object-fit-cover"
                  alt=""
                />
              )}
              {"@" + userData?.UserName}
            </div>
            <p className="mt-3">{userData?.Description}</p>

            {userData.UserID == auth.currentUser?.uid && (
              <Link to={"/edit-profile"} className="text-secondary">
                Edit Profile
              </Link>
            )}
          </div>
        </div>

        <PostGrid
          sortBy={"recentlyPosted"}
          user={userData?.UserID}
          key={userData?.UserID}
        />
      </div>
    </>
  );
};

export default Profile;
