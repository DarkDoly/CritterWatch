import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import PostReply from "./PostReply";

interface PostCommentProps {
  commentData: DocumentData;
}

function PostComment({ commentData }: PostCommentProps) {
  const [username, setUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState(undefined);
  const [replies, setReplies] = useState<DocumentData[]>([]);

  useEffect(() => {
    onSnapshot(doc(db, "user", commentData.userId), (doc) => {
      setUsername(doc.data()?.UserName);
      setProfileUrl(doc.data()?.UserImage);
    });

    getDocs(
      collection(
        db,
        "post/" +
          commentData.postId +
          "/comments/" +
          commentData.id +
          "/replies"
      )
    ).then((snapshot) => {
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

  return (
    <div className="mb-4">
      <Link
        to={"/user/@" + username}
        className="text-dark link-underline link-underline-opacity-0"
      >
        {profileUrl && (
          <img
            src={profileUrl}
            height={"50px"}
            width={"50px"}
            className="rounded-circle me-2"
            alt=""
          />
        )}
        <span className="card-text fw-bold">@{username}</span>
      </Link>
      <p className="text-secondary">
        {commentData.createdAt.toDate().toLocaleString()}
      </p>
      <p className="mb-2">{commentData.content}</p>
      <a href="#" className="text-dark">
        Reply
      </a>
      <div>{repliesSection}</div>
    </div>
  );
}

export default PostComment;
