// This page will be edited to make the ProfileView, Where users can see their liked posts and their own profile,
// here they will also be able to customize their profile

import NavBar from "../components/nav/NavBar";

const Profile = () => {
    return <>

        {/* Displays the Navbar */}
        <NavBar />

        <div className="container">
            <p>Lots of profile</p>
        </div>

        <div>
            {/* Profile Picture */}
            <div>
                <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" className="img-thumbnail" alt="" width="100" height="100"/>
            </div>

            {/* Uploade image Button */}
            <div>
                <img src="/src/assets/critterwatchlogotransparentlogo.png" className="img-thumbnail" alt="" width="100px" height="100px"/>
                <input type="file" className="form-control" id="inputGroupFile01"/>
            </div>
        </div>

        <div>
            {/* Username */}
            <div>
                <p>Username</p>
            </div>

            {/* Email */}
            <div>
                <p>Email@gmail.com</p>
            </div>

            {/* Description */}
            <div>
                <p>Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, ullam delectus! Enim ipsam et eveniet tenetur veniam tempora 
                    reiciendis nulla. Aut sapiente perferendis quibusdam magni at dignissimos ducimus expedita quo officiis, laborum harum modi 
                    maxime accusamus amet unde ab obcaecati voluptas veritatis, qui ipsum mollitia placeat nobis voluptatem exercitationem. 
                    At laboriosam obcaecati velit natus deleniti officia! Fuga eos quod quo, minima blanditiis nulla facere perferendis deserunt enim sequi voluptate, 
                    reprehenderit, quos eveniet? Repudiandae eaque, ducimus dicta cumque quam quis enim sint! Magnam non modi cum, 
                    delectus laudantium repudiandae nesciunt consectetur id exercitationem voluptatem veniam qui quibusdam culpa ducimus mollitia ipsum!</p>
            </div>
        </div>
       
        {/* At the very bottom we could include links to everything unlike the navbar,
        as well as a signature from all of the developers stating we made the project. */}
    </>
}

export default Profile;