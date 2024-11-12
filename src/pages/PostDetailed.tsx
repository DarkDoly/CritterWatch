import { Link, useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/nav/NavBar";
import PostLikeButton from "../components/post/PostLikeButton";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import PostImageCarousel from "../components/post/PostImageCarousel";
import PostComment from "../components/post/PostComment";

function PostDetailed() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [postData, setPostData] = useState<DocumentData | undefined>(undefined);
  const [username, setUsername] = useState("");
  const [postLikes, setPostLikes] = useState<string[]>([]);
  const [comments, setComments] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (!id) {
      console.log("Invalid post id");

      navigate("/");

      return;
    }

    console.log("Fetching post data " + id);

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

    getDocs(collection(db, "post/" + id + "/comments")).then((snapshot) => {
      const c: DocumentData[] = [];

      snapshot.forEach((doc) => {
        const commentData = doc.data();
        commentData.id = doc.id;
        commentData.postId = id;

        c.push(commentData);
      });

      setComments(c);
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

  const commentSection = comments.map((comment) => {
    return <PostComment commentData={comment} key={comment.id} />;
  });

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
            <PostLikeButton
              likedByUser={
                auth.currentUser
                  ? postLikes.includes(auth.currentUser?.uid)
                  : false
              }
              numberOfLikes={postLikes.length}
              likedHandler={handleLiked}
            />
            <PostImageCarousel
              imageUrls={postData?.imageUrls ? postData.imageUrls : []}
            />
          </div>

          <div className="col">
            <Link
              to={"/user/@" + username}
              className="text-dark link-underline link-underline-opacity-0"
            >
              <p className="card-text fw-bold">@{username}</p>
            </Link>
            <p className="text-secondary">{postData?.relativeLocation}</p>
            <p className="text-secondary">
              {postData?.createdAt.toDate().toLocaleString()}
            </p>

            <div className="mt-4">
              <p>{postData?.content}</p>
            </div>
          </div>
        </div>

        <div>{commentSection}</div>
      </div>
    </>
  );
}

export default PostDetailed;
