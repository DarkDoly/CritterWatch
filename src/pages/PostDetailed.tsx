import { Link, useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/nav/NavBar";
import PostLikeButton from "../components/post/PostLikeButton";
import { useEffect, useState } from "react";
import { doc, DocumentData, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import PostImageCarousel from "../components/post/PostImageCarousel";

function PostDetailed() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [postData, setPostData] = useState<DocumentData | undefined>(undefined);
  const [username, setUsername] = useState("");
  const [postLikes, setPostLikes] = useState<string[]>([]);

  useEffect(() => {
    if (!id) {
      console.log("Invalid post id");

      navigate("/");

      return;
    }

    console.log("Fetching post data");

    onSnapshot(doc(db, "post", id), (doc) => {
      setPostData(doc.data());
      setPostLikes(doc.data()?.likes);
    });
  }, []);

  useEffect(() => {
    if (!postData) return;

    onSnapshot(doc(db, "user", postData.userId), (doc) => {
      setUsername(doc.data()?.UserName);
    });
  }, [postData]);

  const handleLiked = () => {
    if (!auth.currentUser || !id) return;

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

    updateDoc(doc(db, "post", id), { likes: newLikes });
  };

  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <Link
          to={"/"}
          className="text-dark link-underline link-underline-opacity-0"
        >
          <i className="bi bi-arrow-left"></i> Return
        </Link>

        <div className="row my-4">
          <div className="col mx-3">
            <PostImageCarousel
              imageUrls={postData?.imageUrls ? postData.imageUrls : []}
            />

            <div className="row mt-2">
              <div className="col">
                <PostLikeButton
                  likedByUser={
                    auth.currentUser
                      ? postLikes.includes(auth.currentUser?.uid)
                      : false
                  }
                  numberOfLikes={postLikes.length}
                  likedHandler={handleLiked}
                />
              </div>
              <div className="col"></div>
              <div className="col text-end">
                <i className="bi bi-chat-left"></i> Comment
              </div>
            </div>
          </div>

          <div className="col">
            <Link
              to={"/user/@username"}
              className="text-dark link-underline link-underline-opacity-0"
            >
              <p className="card-text fw-bold">@{username}</p>
            </Link>
            <p className="text-secondary">{postData?.relativeLocation}</p>

            <div className="mt-4">
              <p>{postData?.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetailed;
