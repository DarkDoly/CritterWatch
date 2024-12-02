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
            <div className="border border-primary d-flex flex-row" style={{height: "94vh"}}>

                {/* Left-side Friends */}
                <div className="border border-secondary h-auto w-25">
                    <SelectableChat/>
                    <SelectableChat/>
                    <SelectableChat/>
                </div>

                {/* Right side chat feature */}
                <div className="border border-danger w-75 d-flex flex-column" style={{maxWidth: "100%"}}>

                    {/* Text Bubbles */}
                    <div className="border border-primary h-100 d-flex flex-column-reverse overflow-y-auto" >
                        {/* Bubbles */}
                        <div className="border border-danger d-flex flex-column" style={{width: "100%"}}>
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
                    <div className="border border-info d-flex flex-row justify-content-between mx-5">

                        {/* Input area */}
                        <div className="border border-success" style={{width: "110vh"}}>
                            <input type="text" className="form control w-100 text-wrap" placeholder="Send a message..." aria-label="send-message"/>
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