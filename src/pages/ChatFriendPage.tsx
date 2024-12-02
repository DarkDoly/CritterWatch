//This is the page where you can interact and chat with your friends

import NavBar from "../components/nav/NavBar"
import SelectableChat from "../components/friend/SelectableChat"
import LeftChatBubble from "../components/friend/LeftChatBubble"
import RightChatBubble from "../components/friend/RightChatBubble"

function ChatFriendPage () {
    return (
        <>
            <NavBar/>
            {/* Majority of the screen, left and right side */}
            <div className="d-flex flex-row" style={{height: "94vh", backgroundColor:"#ddf2d5"}}>

                {/* Left-side Friends */}
                <div className="h-auto w-25">
                    <SelectableChat/>
                    <SelectableChat/>
                    <SelectableChat/>
                </div>

                {/* Right side chat feature */}
                <div className="w-75 d-flex flex-column" style={{maxWidth: "100%", backgroundColor:"#e8f4e8"}}>

                    {/* Text Bubbles */}
                    <div className="h-100 d-flex flex-column-reverse overflow-y-auto" >
                        {/* Bubbles */}
                        <div className="d-flex flex-column" style={{width: "100%"}}>
                            <LeftChatBubble/>
                            <RightChatBubble/>
                            <LeftChatBubble/>
                            <RightChatBubble/>
                            <LeftChatBubble/>
                            <RightChatBubble/>
                            <LeftChatBubble/>
                            
                        </div>
                    </div>

                    {/* Chat Input Section */}
                    <div className="d-flex flex-row justify-content-between mx-5">

                        {/* Input area */}
                        <div className="mt-1" style={{width: "110vh"}}>
                            <input type="text" className="form control w-100 text-wrap" placeholder="Send a message..." aria-label="send-message"/>
                        </div>

                        {/* Send button */}
                        <div className="align-self-center mb-2">
                            <button className="btn btn-secondary">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatFriendPage