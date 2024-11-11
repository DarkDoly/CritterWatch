import { createContext, useEffect, useState } from "react";
import { auth, db } from "../../Firebase";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";

interface UserContextType {
  userData: DocumentData | undefined;
}

export const UserContext = createContext<UserContextType>({
  userData: undefined,
});

interface UserProviderProps {
  children: JSX.Element;
}

function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<DocumentData | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Fetching user data", user.uid);

        onSnapshot(doc(db, "user", user.uid), (doc) => {
          console.log("User data updated", user.uid);

          setUserData(doc.data());
        });
      } else {
        setUserData(undefined);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
