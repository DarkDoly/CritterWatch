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
} from "firebase/firestore";
import { db } from "../../Firebase";

function PostGrid() {
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

    if (lastPostFetched) {
      q = query(
        postsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastPostFetched),
        limit(9)
      );
    } else {
      q = query(postsRef, orderBy("createdAt", "desc"), limit(9));
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
