//This is the component for the leftside friend profile's that stack one ontop of the other
//Clicking one should send you to that user's respective chat screen

function SelectableChat () {
    return (
        <>
    {/* Chat bubble for a friend */}
    <div className="border border-dark w-auto d-flex flex-row border-2 border-top-0" style ={{height: "10vh", color: "#464443", backgroundColor: "#f5ece5"}}>

        {/* Image section */}
        <div className="">
            <img className="rounded-circle sm ms-2 mt-2" alt="Friend Profile Image" src="src\assets\bug-image.jpeg" style={{display: "block", maxWidth: "85%", height: "85%"}}/>
        </div>

        {/* Name and recent message section */}
        <div className="w-75 mt-1 ms-1 d-flex flex-column justify-content-between">

            {/* Name stuff */}
            <div className="d-flex flex-row">
                <p className="fs-5 fw-semibold">DarkDoly</p>
            </div>

            {/* Recent Message Section */}
            <div className="" style={{height: '4vh'}}>
                <p className="d-inline-block text-truncate opacity-75" style={{maxWidth: "30vh"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex vero maiores doloremque reiciendis dolore praesentium autem quas beatae quis consequuntur.</p>
            </div>
        </div>
    </div>
    </>
    )
}

export default SelectableChat