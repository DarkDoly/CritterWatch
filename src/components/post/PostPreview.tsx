import { Link } from "react-router-dom";
import PostLike from "./PostLike";

function PostPreview() {
    return <div className="card my-4">
        <Link to={'/post'}><img src="src/assets/bug-image.jpeg" className="card-img-top" alt="" /></Link>
        <div className="card-body">
            <PostLike />
            <Link to={'/user/@username'} className="text-dark link-underline link-underline-opacity-0"><p className="card-text fw-bold">@username</p></Link>
            <Link to={'/post'} className="text-dark link-underline link-underline-opacity-0"><p className="card-text">Body text.</p></Link>
        </div>
    </div>
}

export default PostPreview;