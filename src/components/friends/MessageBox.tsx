import {
  collection,
  doc,
  DocumentData,
  getDocs,
  limit,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../Firebase";
import { Link } from "react-router-dom";
import { UserContext } from "../account/UserProvider";
import MessageList from "./MessageList";

interface MessageBoxProps {
  username: string;
}

function MessageBox({ username }: MessageBoxProps) {
  const { userData } = useContext(UserContext);

  const [selectedUser, setSelectedUser] = useState<DocumentData | undefined>();
  const [messageInput, setMessageInput] = useState("");

  const handleSend = () => {
    if (messageInput.trim() == "") return;

    setDoc(
      doc(
        collection(db, "user/" + userData?.UserID + "/" + selectedUser?.UserID)
      ),
      {
        createdAt: Timestamp.now(),
        content: messageInput,
      }
    );

    setMessageInput("");
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
      <div className="my-3">
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
      </div>

      <div>
        <MessageList
          fromID={userData?.UserID}
          toID={selectedUser?.UserID}
          key={userData?.UserID + selectedUser?.UserID}
        />
      </div>

      <div className="my-2 ">
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
        className="btn mb-4 mt-1"
        style={{ color: "#464443", backgroundColor: "#f5ece5" }}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

export default MessageBox;
