import { useState } from "react";
import NavBar from "../components/nav/NavBar";
import PostGrid from "../components/post/PostGrid";

function Home() {
  const [sortBy, setSortBy] = useState("recentlyPosted");
  const [time, setTime] = useState("allTime");
  const [distance, setDistance] = useState("10miles");

  const handleSortMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.currentTarget.value);
  };

  const handleTimeMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(e.currentTarget.value);
  };

  const handleDistanceMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistance(e.currentTarget.value);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div>
          <select
            className="form-select w-25 my-2"
            aria-label="Distance"
            onChange={handleDistanceMethod}
            defaultValue={"10miles"}
          >
            <option value="5miles">Within 5 miles</option>
            <option value="10miles">Within 10 miles</option>
            <option value="50miles">Within 50 miles</option>
            <option value="everywhere">Everywhere</option>
          </select>

          <select
            className="form-select w-25 my-2"
            aria-label="Time"
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
            <option value="highestLiked">Most Liked</option>
            <option value="leastLiked">Least Liked</option>
            <option value="oldestPosted">Oldest Posted</option>
          </select>
        </div>

        <PostGrid
          key={sortBy + time + distance}
          sortBy={sortBy}
          time={time}
          distance={distance}
        />
      </div>
    </>
  );
}

export default Home;
