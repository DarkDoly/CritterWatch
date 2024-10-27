import NavBar from "../components/nav/NavBar";

const Home = () => {
    return <>

        {/* Displays the Navbar */}
        <NavBar />

        <div className="container">
            <p>Lots of animal posts</p>
        </div>

        {/* At the very bottom we could include links to everything unlike the navbar,
        as well as a signature from all of the developers stating we made the project. */}
    </>
}

export default Home;