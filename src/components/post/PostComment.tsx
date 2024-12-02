import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../Firebase";
import PostReply from "./PostReply";

interface PostCommentProps {
  commentData: DocumentData;
}

function PostComment({ commentData }: PostCommentProps) {
  const [username, setUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState(undefined);
  const [replies, setReplies] = useState<DocumentData[]>([]);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyInput, setReplyInput] = useState("");

  useEffect(() => {
    onSnapshot(doc(db, "user", commentData.userId), (doc) => {
      setUsername(doc.data()?.UserName);
      setProfileUrl(doc.data()?.UserImage);
    });

    const q = query(
      collection(
        db,
        "post/" +
          commentData.postId +
          "/comments/" +
          commentData.id +
          "/replies"
      ),
      orderBy("createdAt", "asc")
    );

    getDocs(q).then((snapshot) => {
      const r: DocumentData[] = [];

      snapshot.forEach((doc) => {
        const replyData = doc.data();
        replyData.id = doc.id;

        r.push(replyData);
      });

      setReplies(r);
    });
  }, []);

  const repliesSection = replies.map((reply) => {
    return <PostReply replyData={reply} key={reply.id} />;
  });

  const handleReply = () => {
    if (replyInput.trim() === "") {
      setShowReplyInput(false);

      return;
    }

    addDoc(
      collection(
        db,
        "post/" +
          commentData.postId +
          "/comments/" +
          commentData.id +
          "/replies"
      ),
      {
        content: replyInput,
        createdAt: Timestamp.now(),
        likes: [],
        userId: auth.currentUser?.uid,
      }
    ).then((doc) => {
      const newReplies = [...replies];

      newReplies.push({
        content: replyInput,
        createdAt: Timestamp.now(),
        likes: [],
        userId: auth.currentUser?.uid,
        id: doc.id,
      });

      setReplies(newReplies);
    });

    setReplyInput("");
    setShowReplyInput(false);
  };

  return (
    <div className="mb-4 p-2 primary-background-cus rounded">
      <Link
        to={"/user/" + username}
        className="text-dark link-underline link-underline-opacity-0"
      >
        {profileUrl && (
          <img
            src={profileUrl}
            height={"50px"}
            width={"50px"}
            className="rounded-circle me-2 object-fit-cover"
            alt=""
          />
        )}
        <span className="card-text fw-bold">@{username}</span>
      </Link>
      <p className="text-secondary">
        {commentData.createdAt.toDate().toLocaleString()}
      </p>
      <p className="mb-2">{commentData.content}</p>
      {showReplyInput ? (
        <div>
          <div className="my-2">
            <textarea
              className="form-control"
              id="replyInput"
              rows={3}
              value={replyInput}
              onChange={(event) => {
                setReplyInput(event.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-dark mb-4 mt-2"
            onClick={handleReply}
          >
            <i className="bi bi-chat-left"></i> Reply
          </button>
          <button
            className="btn mb-4 mt-2"
            onClick={() => {
              setShowReplyInput(false);
              setReplyInput("");
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="btn text-dark text-decoration-underline px-0"
          onClick={() => {
            setShowReplyInput(true);
          }}
        >
          Reply
        </button>
      )}

      <div>{repliesSection}</div>
    </div>
  );
}

export default PostComment;
