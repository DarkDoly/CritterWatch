import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";

interface SelectableChatProps {
  userID: string;
}

function SelectableChat({ userID }: SelectableChatProps) {
  const [userData, setUserData] = useState<DocumentData | undefined>();

  useEffect(() => {
    getDoc(doc(db, "user", userID)).then((doc) => {
      setUserData(doc.data());
    });
  }, []);

  return (
    <div className="my-3">
      <Link
        to={"/friends/" + userData?.UserName}
        className="text-decoration-none"
      >
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
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SelectableChat;
