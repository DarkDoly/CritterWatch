import { Link } from "react-router-dom";
import NavBar from "../components/nav/NavBar";
import PostLikeButton from "../components/post/PostLikeButton";

function PostDetailed() {
    return <>
        <NavBar />
        <div className="container mt-3">
            <Link to={'/'} className="text-dark link-underline link-underline-opacity-0"><i className="bi bi-arrow-left"></i> Return</Link>

            <div className="row my-4">
                <div className="col mx-3">
                    <img src="/src/assets/bug-image.jpeg" className="card-img-top" alt="" />

                    <div className="row mt-2">
                        <div className="col"><PostLikeButton likedByUser={false} numberOfLikes={0} likedHandler={() => {}}/></div>
                        <div className="col"></div>
                        <div className="col text-end"><i className="bi bi-chat-left"></i> Comment</div>
                    </div>
                </div>

                <div className="col">
                    <Link to={'/user/@username'} className="text-dark link-underline link-underline-opacity-0"><p className="card-text fw-bold">@username</p></Link>
                    <p className="text-secondary">Baton Rouge, LA</p>
                    
                    <div className="mt-4">
                        <p>Body text for your post.</p>
                        <p>Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default PostDetailed;