import { Link } from "react-router-dom";
import PostLikeButton from "./PostLikeButton";

interface PostPreviewProps {
    id: string;
    image: string;
    liked: boolean;
    numberLikes: number;
    username: string;
    bodySummary: string;
}

function PostPreview({id, image, liked, numberLikes, username, bodySummary} : PostPreviewProps) {
    return <div className="col-4">
        <div className="card my-4">
            <Link to={'/post/' + id}><img src={image} className="card-img-top" alt="" /></Link>
            <div className="card-body">
                <PostLikeButton likedByUser={liked} numberOfLikes={numberLikes} likedHandler={() => {}}/>
                <Link to={'/user/@' + username} className="text-dark link-underline link-underline-opacity-0"><p className="card-text fw-bold">@username</p></Link>
                <Link to={'/post/' + id} className="text-secondary link-underline link-underline-opacity-0"><p className="card-text">{bodySummary}</p></Link>
            </div>
        </div>
    </div>
}

export default PostPreview;