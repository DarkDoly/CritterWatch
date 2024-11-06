
interface PostLikeButtonProps {
    likedByUser: boolean;
    numberOfLikes: number;
    likedHandler: () => void;
}

function PostLikeButton({likedByUser, numberOfLikes, likedHandler} : PostLikeButtonProps) {
    const star = likedByUser ? <i className="bi bi-star-fill"></i> : <i className="bi bi-star"></i>;

    return <>
        <button type="button" className="btn p-0" onClick={likedHandler}>{star} {numberOfLikes}</button>
    </>
}

export default PostLikeButton;