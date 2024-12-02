import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase";
import { Link } from "react-router-dom";

interface MessageBoxProps {
  username: string;
}

function MessageBox({ username }: MessageBoxProps) {
  const [selectedUser, setSelectedUser] = useState<DocumentData | undefined>();
  const [messageInput, setMessageInput] = useState("");

  const handleSend = () => {
    if (messageInput.trim() == "") return;
  };

  useEffect(() => {
    const q = query(
      collection(db, "user"),
      limit(1),
      where("UserName", "==", username)
    );

    getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        setSelectedUser(doc.data());
      });
    });
  }, []);

  return (
    <div>
      <Link
        to={"/user/" + selectedUser?.UserName}
        className="text-decoration-none text-dark"
      >
        <img
          src={selectedUser?.UserImage}
          height={"50px"}
          width={"50px"}
          className="rounded-circle me-2 object-fit-cover"
          alt=""
        />
        {"@" + username}
      </Link>

      <div>
        <p></p>
      </div>

      <div className="my-2">
        <textarea
          className="form-control"
          id="messageInput"
          rows={3}
          value={messageInput}
          onChange={(event) => {
            setMessageInput(event.target.value);
          }}
        />
      </div>
      <button
        type="button"
        className="btn btn-dark mb-4 mt-1"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

export default MessageBox;
