//This is the component for the leftside friend profile's that stack one ontop of the other
//Clicking one should send you to that user's respective chat screen

function SelectableChat () {
    return (
        <>
            {/* Chat bubble for a friend */}
            <div className="border border-dark-subtle w-auto d-flex flex-row border-2 border-top-0" style ={{height: "10vh"}}>

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
                    <div className="border border-danger" style={{height: '4vh'}}>
                        <p className="d-inline-block text-truncate" style={{maxWidth: "30vh"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex vero maiores doloremque reiciendis dolore praesentium autem quas beatae quis consequuntur.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectableChat