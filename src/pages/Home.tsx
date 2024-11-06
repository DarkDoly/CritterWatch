import NavBar from "../components/nav/NavBar";
import PostGrid from "../components/post/PostGrid";

function Home() {
    return <>
        <NavBar />
        <div className="container">
            <p className="mt-4"><i className="bi bi-geo-alt-fill"></i> Viewing critters within <span className="text-decoration-underline">15 miles</span></p>
            <PostGrid />
        </div>
    </>
}

export default Home;