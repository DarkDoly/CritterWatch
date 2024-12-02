import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase";
import RightMessage from "./RightMessage";
import LeftMessage from "./LeftMessage";

interface MessageListProps {
  fromID: string;
  toID: string;
}

function MessageList({ fromID, toID }: MessageListProps) {
  const [fromMessages, setFromMessages] = useState<DocumentData[]>([]);
  const [toMessages, setToMessages] = useState<DocumentData[]>([]);
  const [messages, setMessages] = useState<JSX.Element[]>();

  useEffect(() => {
    const fromQ = query(
      collection(db, "user/" + fromID + "/" + toID),
      orderBy("createdAt")
    );

    onSnapshot(fromQ, (snapshot) => {
      const newFromMessages: DocumentData[] = [];

      snapshot.docs.forEach((doc) => {
        newFromMessages.push(doc.data());
      });

      setFromMessages(newFromMessages);
    });

    const toQ = query(
      collection(db, "user/" + toID + "/" + fromID),
      orderBy("createdAt")
    );

    onSnapshot(toQ, (snapshot) => {
      const newToMessage: DocumentData[] = [];

      snapshot.docs.forEach((doc) => {
        newToMessage.push(doc.data());
      });

      setToMessages(newToMessage);
    });
  }, []);

  useEffect(() => {
    const newMessages = [];

    let currentFromIndex = 0;
    let currentToIndex = 0;

    while (
      currentFromIndex < fromMessages.length &&
      currentToIndex < toMessages.length
    ) {
      if (
        fromMessages[currentFromIndex].createdAt.seconds <
        toMessages[currentToIndex].createdAt.seconds
      ) {
        newMessages.push(
          <RightMessage
            time={fromMessages[currentFromIndex].createdAt.toDate()}
            message={fromMessages[currentFromIndex].content}
            key={fromMessages[currentFromIndex].createdAt.seconds}
          />
        );

        currentFromIndex += 1;
      } else {
        newMessages.push(
          <LeftMessage
            time={toMessages[currentToIndex].createdAt.toDate()}
            message={toMessages[currentToIndex].content}
            key={toMessages[currentToIndex].createdAt.seconds}
          />
        );

        currentToIndex += 1;
      }
    }

    while (currentFromIndex < fromMessages.length) {
      newMessages.push(
        <RightMessage
          time={fromMessages[currentFromIndex].createdAt.toDate()}
          message={fromMessages[currentFromIndex].content}
          key={fromMessages[currentFromIndex].createdAt.seconds}
        />
      );

      currentFromIndex += 1;
    }

    while (currentToIndex < toMessages.length) {
      newMessages.push(
        <LeftMessage
          time={toMessages[currentToIndex].createdAt.toDate()}
          message={toMessages[currentToIndex].content}
          key={toMessages[currentToIndex].createdAt.seconds}
        />
      );

      currentToIndex += 1;
    }

    setMessages(newMessages);
  }, [fromMessages, toMessages]);

  return <div>{messages}</div>;
}

export default MessageList;
