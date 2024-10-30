import NavBar from "../components/nav/NavBar";
import PostGrid from "../components/post/PostGrid";

function Home() {
    return <>
        <NavBar />
        <div className="container">
            <PostGrid></PostGrid>
        </div>
    </>
}

export default Home;