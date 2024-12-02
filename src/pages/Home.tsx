import { useEffect, useState } from "react";
import NavBar from "../components/nav/NavBar";
import PostGrid from "../components/post/PostGrid";

function Home() {
  const [sortBy, setSortBy] = useState("recentlyPosted");
  const [time, setTime] = useState("allTime");
  const [distance, setDistance] = useState("10miles");
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLon, setCurrentLon] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLat(position.coords.latitude);
      setCurrentLon(position.coords.longitude);
    });
  }, []);

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
        <div className="input-group w-75">
          <select
            className="form-select my-2"
            aria-label="Distance"
            onChange={handleDistanceMethod}
            defaultValue={"everywhere"}
          >
            <option value="everywhere">Everywhere</option>
            <option value="5miles">Within 5 miles</option>
            <option value="10miles">Within 10 miles</option>
            <option value="50miles">Within 50 miles</option>
          </select>

          <select
            className="form-select my-2"
            aria-label="Time"
            onChange={handleTimeMethod}
            defaultValue={"pastWeek"}
          >
            <option value="allTime">All Time</option>
            <option value="today">Today</option>
            <option value="pastWeek">Past Week</option>
            <option value="pastMonth">Past Month</option>
          </select>

          <select
            className="form-select my-2"
            aria-label="Sort By"
            onChange={handleSortMethod}
            defaultValue={"highestLiked"}
          >
            <option value="recentlyPosted">Recently Posted</option>
            <option value="highestLiked">Most Liked</option>
            <option value="leastLiked">Least Liked</option>
            <option value="oldestPosted">Oldest Posted</option>
          </select>
        </div>

        <PostGrid
          key={sortBy + time + distance + currentLat + currentLon}
          sortBy={sortBy}
          time={time}
          currentLat={currentLat}
          currentLon={currentLon}
          distance={distance}
        />
      </div>
    </>
  );
}

export default Home;
