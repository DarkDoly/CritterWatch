import { Link } from "react-router-dom";
import PostLikeButton from "./PostLikeButton";
import { useEffect, useState } from "react";
import { auth, db } from "../../Firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

interface PostPreviewProps {
  id: string;
  image: string;
  likes: string[];
  user: string;
  bodySummary: string;
}

function PostPreview({
  id,
  image,
  likes,
  user,
  bodySummary,
}: PostPreviewProps) {
  const [username, setUsername] = useState("");
  const [postLikes, setPostLikes] = useState(likes);

  useEffect(() => {
    onSnapshot(doc(db, "user", user), (doc) => {
      setUsername(doc.data()?.UserName);
    });
  }, []);

  const handleLiked = () => {
    if (!auth.currentUser) return;

    const likedByUser = auth.currentUser
      ? postLikes.includes(auth.currentUser.uid)
      : false;

    let newLikes: string[];

    if (likedByUser) {
      newLikes = [];

      postLikes.forEach((like) => {
        if (like != auth.currentUser?.uid) {
          newLikes.push(like);
        }
      });
    } else {
      newLikes = [...postLikes];
      newLikes.push(auth.currentUser.uid);
    }

    setPostLikes(newLikes);

    updateDoc(doc(db, "post", id), {
      likes: newLikes,
      likeCount: newLikes.length,
    });
  };

  return (
    <div className="col-4">
      <div className="card my-4">
        <Link to={"/post/" + id}>
          <img
            src={image}
            className="card-img-top object-fit-cover"
            alt=""
            height={"300px"}
          />
        </Link>
        <div className="card-body">
          <PostLikeButton
            likedByUser={
              auth.currentUser
                ? postLikes.includes(auth.currentUser?.uid)
                : false
            }
            numberOfLikes={postLikes.length}
            likedHandler={handleLiked}
          />
          <Link
            to={"/user/" + username}
            className="text-dark link-underline link-underline-opacity-0"
          >
            <p className="card-text fw-bold">@{username}</p>
          </Link>
          <Link
            to={"/post/" + id}
            className="text-secondary link-underline link-underline-opacity-0"
          >
            <p className="card-text">{bodySummary}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostPreview;
