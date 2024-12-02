import { useState } from "react";
import NavBar from "../components/nav/NavBar";
import PostGrid from "../components/post/PostGrid";

function Home() {
  const [sortBy, setSortBy] = useState("recentlyPosted");

  const handleSortMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.currentTarget.value);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <p className="mt-4">
          <i className="bi bi-geo-alt-fill"></i> Viewing critters{" "}
          <span className="text-decoration-underline">near you</span>
        </p>

        <select
          className="form-select w-25"
          aria-label="Sort By"
          onChange={handleSortMethod}
          defaultValue={"recentlyPosted"}
        >
          <option value="recentlyPosted">Recently Posted</option>
          <option value="highestLiked">Highest Liked</option>
          <option value="leastLiked">Least Liked</option>
          <option value="oldestPosted">Oldest Posted</option>
        </select>

        <PostGrid key={sortBy} sortBy={sortBy} />
      </div>
    </>
  );
}

export default Home;
