import { useState } from "react";

function PostLike() {
    const [liked, setLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(0);

    const star = liked ? <i className="bi bi-star-fill"></i> : <i className="bi bi-star"></i>;

    const onLike = () => {
        setLiked(!liked);

        if (liked) {
            setNumLikes(numLikes - 1);
        } else {
            setNumLikes(numLikes + 1);
        }
    }

    return <>
        <button type="button" className="btn px-0" onClick={onLike}>{star} {numLikes}</button>
    </>
}

export default PostLike;