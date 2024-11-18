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
                    <div className="border border-warning w-auto" style ={{height: "10vh"}}>
                        <p>hi</p>
                    </div>
                </div>

                {/* Right side chat feature */}
                <div className="border border-danger h-auto w-75">
                    <p>hi</p>
                </div>
            </div>
        </>
    )
}

export default ChatFriendPage