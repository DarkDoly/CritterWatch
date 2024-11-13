// This page will be edited to make the ProfileView, Where users can see their liked posts and their own profile,
// here they will also be able to customize their profile

import NavBar from "../components/nav/NavBar";

const Profile = () => {
    return <>

        {/* Displays the Navbar */}
        <NavBar />

        {/* Top side */}
        <div className="border border-primary d-flex flex-row" style={{height: '50vh'}}>
            {/* Left Side */}
            <div className="border border-primary-subtle m-2 d-flex flex-column" style={{width: '100vh'}}>

                    {/* Profile Picture */}
                    <div className="border border-secondary" >
                        <img src="/src/assets/critterwatchlogotransparentlogo.png" className="img-thumbnail" alt="" width="200vh" height="200vh"/>
                    </div>

                    {/* Upload image Button
                    <div>
                        <img src="/src/assets/critterwatchlogotransparentlogo.png" className="img-thumbnail" alt="" width="100px" height="100px"/>
                        <input type="file" className="form-control" id="inputGroupFile01"/>
                    </div> */}

                    {/* Location */}
                    <div className="border border-black">
                        <p>Location Data</p>
                    </div>

                    {/* Edit Profile */}
                    <div className="border border-danger align-self-end mt-auto">
                        <button type="button" className="btn btn-light btn-sm">Edit Profile</button>
                    </div>
            </div>

            {/* Right Side */}
            <div className="border border-secondary-subtle m-2">

                {/* Username */}
                <div className="border border-danger">
                    <p>Username</p>
                </div>

                {/* Email */}
                <div className="border border-success">
                    <p>Email@gmail.com</p>
                </div>

                {/* Description */}
                <div className="border border-warning mt-5">
                    <p>Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, ullam delectus! Enim ipsam et eveniet tenetur veniam tempora 
                        reiciendis nulla. Aut sapiente perferendis quibusdam magni at dignissimos ducimus expedita quo officiis, laborum harum modi 
                        maxime accusamus amet unde ab obcaecati voluptas veritatis, qui ipsum mollitia placeat nobis voluptatem exercitationem. 
                        At laboriosam obcaecati velit natus deleniti officia! Fuga eos quod quo, minima blanditiis nulla facere perferendis deserunt enim sequi voluptate, 
                        reprehenderit, quos eveniet? Repudiandae eaque, ducimus dicta cumque quam quis enim sint! Magnam non modi cum, 
                        delectus laudantium repudiandae nesciunt consectetur id exercitationem voluptatem veniam qui quibusdam culpa ducimus mollitia ipsum!</p>
                </div>
            </div>
        </div>

        {/* Bottom Side */}
        <div className="border border-secondary" style={{height: '50vh'}}>

            {/* Grid Swap Buttons */}
            <div className="btn-group" role="group" aria-label="Grid Swap Buttons">

                {/* Liked Posts 1 */}
                <input type="radio" className="btn-check btn-dark" name="btnradio" id="btnradio1" autoComplete="off" checked/>
                <label className="btn btn-outline-dark" htmlFor="btnradio1">Liked Posts</label>

                {/* Liked Posts 2 */}
                <input type="radio" className="btn-check btn-dark" name="btnradio" id="btnradio2" autoComplete="off"/>
                <label className="btn btn-outline-dark" htmlFor="btnradio2">Liked Posts</label>
            </div>
        </div>

        
       
        {/* At the very bottom we could include links to everything unlike the navbar,
        as well as a signature from all of the developers stating we made the project. */}
    </>
}

export default Profile;