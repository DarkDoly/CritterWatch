import { useEffect, useState } from "react";
import PostPreview from "./PostPreview";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase";

interface PostGridProps {
  sortBy: String;
  time: String;
  user?: String;
}

function PostGrid({ sortBy, time, user }: PostGridProps) {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [pagination, setPagination] = useState(1);
  const [lastPostFetched, setLastPostFetched] = useState<
    DocumentData | undefined
  >(undefined);

  const loadMoreHandler = () => {
    setPagination(pagination + 1);
  };

  useEffect(() => {
    console.log("Loading posts on page " + pagination);

    const postsRef = collection(db, "post");

    let q;

    let sortMethod = orderBy("createdAt", "desc");

    let userMethod = where("userId", "!=", "-1");

    let timeMethod = where("createdAt", ">=", new Date(0));

    if (sortBy == "recentlyPosted") {
      sortMethod = orderBy("createdAt", "desc");
    } else if (sortBy == "oldestPosted") {
      sortMethod = orderBy("createdAt");
    } else if (sortBy == "highestLiked") {
      sortMethod = orderBy("likeCount", "desc");
    } else if (sortBy == "leastLiked") {
      sortMethod = orderBy("likeCount");
    }

    if (user) {
      userMethod = where("userId", "==", user);
    }

    if (time == "allTime") {
      timeMethod = where("createdAt", ">=", new Date(0));
    } else if (time == "today") {
      const date = new Date();
      date.setTime(date.getTime() - 24 * 60 * 60 * 1000);

      timeMethod = where("createdAt", ">=", date);
    } else if (time == "pastWeek") {
      const date = new Date();
      date.setTime(date.getTime() - 7 * 24 * 60 * 60 * 1000);

      timeMethod = where("createdAt", ">=", date);
    } else if (time == "pastMonth") {
      const date = new Date();
      date.setTime(date.getTime() - 31 * 24 * 60 * 60 * 1000);

      timeMethod = where("createdAt", ">=", date);
    }

    if (lastPostFetched) {
      q = query(
        postsRef,
        sortMethod,
        startAfter(lastPostFetched),
        limit(9),
        userMethod,
        timeMethod
      );
    } else {
      q = query(postsRef, sortMethod, limit(9), userMethod, timeMethod);
    }

    getDocs(q).then((snapshot) => {
      const p: {}[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;

        p.push(data);

        setLastPostFetched(doc);
      });

      setPosts(posts.concat(p));
    });
  }, [pagination]);

  const postPreviews = posts?.map((post: DocumentData) => {
    return (
      <PostPreview
        id={post.id}
        image={post.imageUrls[0]}
        likes={post.likes}
        user={post.userId}
        bodySummary={
          post.content.length > 75
            ? post.content.slice(0, 75).trim() + "..."
            : post.content
        }
        key={post.id}
      />
    );
  });

  return (
    <div className="row">
      {postPreviews}

      <div className="col-12 text-center my-4">
        <button
          type="button"
          className="btn btn-dark"
          onClick={loadMoreHandler}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default PostGrid;
