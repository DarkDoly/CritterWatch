import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";

interface PostReplyProps {
  replyData: DocumentData;
}

function PostReply({ replyData }: PostReplyProps) {
  const [username, setUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState(undefined);

  useEffect(() => {
    onSnapshot(doc(db, "user", replyData.userId), (doc) => {
      setUsername(doc.data()?.UserName);
      setProfileUrl(doc.data()?.UserImage);
    });
  }, []);

  return (
    <div className="my-4 ms-5">
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
        {replyData.createdAt.toDate().toLocaleString()}
      </p>
      <p className="mb-2">{replyData.content}</p>
    </div>
  );
}

export default PostReply;
