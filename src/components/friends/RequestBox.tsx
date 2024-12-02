import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase";

interface RequestBoxProps {
  userID: string;
  handleAccept: () => void;
  handleDeny: () => void;
}

function RequestBox({ userID, handleAccept, handleDeny }: RequestBoxProps) {
  const [userData, setUserData] = useState<DocumentData | undefined>();

  useEffect(() => {
    getDoc(doc(db, "user", userID)).then((doc) => {
      setUserData(doc.data());
    });
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div>
          <img
            src={userData?.UserImage}
            height={"50px"}
            width={"50px"}
            className="rounded-circle me-2 object-fit-cover"
            alt=""
          />
          {"@" + userData?.UserName}
        </div>

        <div className="mt-3">
          <button className="btn btn-success" onClick={handleAccept}>
            Accept
          </button>
          <button className="btn btn-danger mx-3" onClick={handleDeny}>
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestBox;
