import { useState } from "react";
import NavBar from "../components/nav/NavBar";
import PostGrid from "../components/post/PostGrid";

function Home() {
  const [sortBy, setSortBy] = useState("recentlyPosted");
  const [time, setTime] = useState("allTime");

  const handleSortMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.currentTarget.value);
  };

  const handleTimeMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(e.currentTarget.value);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div>
          <select
            className="form-select w-25 my-3"
            aria-label="Sort By"
            onChange={handleTimeMethod}
            defaultValue={"allTime"}
          >
            <option value="allTime">All Time</option>
            <option value="today">Today</option>
            <option value="pastWeek">Past Week</option>
            <option value="pastMonth">Past Month</option>
          </select>

          <select
            className="form-select w-25 my-2"
            aria-label="Sort By"
            onChange={handleSortMethod}
            defaultValue={"recentlyPosted"}
          >
            <option value="recentlyPosted">Recently Posted</option>
            <option value="highestLiked">Highest Liked</option>
            <option value="leastLiked">Least Liked</option>
            <option value="oldestPosted">Oldest Posted</option>
          </select>
        </div>

        <PostGrid key={sortBy + time} sortBy={sortBy} time={time} />
      </div>
    </>
  );
}

export default Home;
