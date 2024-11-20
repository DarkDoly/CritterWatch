//This is the page where you can interact and chat with your friends

import NavBar from "../components/nav/NavBar"

function ChatFriendPage () {
    return (
        <>
            <NavBar/>
            {/* Majority of the screen, left and right side */}
            <div className="border border-primary d-flex flex-row" style={{height: "94vh"}}>

                {/* Left-side Friends */}
                <div className="border border-secondary h-auto w-25">

                    {/* Chat bubble for a friend */}
                    <div className="border border-dark-subtle w-auto d-flex flex-row border-2 border-top-0" style ={{height: "12vh"}}>

                        {/* Image section */}
                        <div className="border border-info">
                            <img className="rounded-circle sm ms-2 mt-2" alt="Friend Profile Image" src="src\assets\bug-image.jpeg" style={{display: "block", maxWidth: "85%", height: "85%"}}/>
                        </div>

                        {/* Name and recent message section */}
                        <div className="border border-success w-75 mt-1 ms-1 d-flex flex-column justify-content-between">

                            {/* Name stuff */}
                            <div className="border border-dark d-flex flex-row">
                                <p className="fs-5 fw-semibold">DarkDoly</p>
                                <p className="fs-6 text-secondary mt-2">@smalltext</p>
                            </div>

                            {/* Recent Message Section */}
                            <div className="border border-danger">
                                <p className="d-inline-block text-truncate" style={{maxWidth: "30vh"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex vero maiores doloremque reiciendis dolore praesentium autem quas beatae quis consequuntur.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side chat feature */}
                <div className="border border-danger w-75 d-flex flex-column justify-content-between" style={{maxWidth: "100%"}}>

                    {/* Text Bubbles */}
                    <div className="border border-primary">
                        <p>hi</p>
                    </div>

                    {/* Chat Input Section */}
                    <div className="border border-info d-flex flex-row justify-content-between mx-4">

                        {/* Input area */}
                        <div className="bg-secondary-subtle rounded w-75">
                            <p className="fs-5 text-center">Lorem ipsum dolor sit amet.</p>
                        </div>

                        {/* Send button */}
                        <div className="border border-danger align-self-center">
                            <button className="btn btn-secondary">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatFriendPage