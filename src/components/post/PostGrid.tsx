import PostPreview from "./PostPreview";

function PostGrid() {
    return <div className="row">
        <PostPreview id={'1'} image={'/src/assets/bug-image.jpeg'} liked={false} numberLikes={0} username={'username'} bodySummary={'Post body.'}/>
        <PostPreview id={'2'} image={'/src/assets/bug-image.jpeg'} liked={false} numberLikes={0} username={'username'} bodySummary={'Post body.'}/>
        <PostPreview id={'3'} image={'/src/assets/bug-image.jpeg'} liked={false} numberLikes={0} username={'username'} bodySummary={'Post body.'}/>
        <PostPreview id={'4'} image={'/src/assets/bug-image.jpeg'} liked={false} numberLikes={0} username={'username'} bodySummary={'Post body.'}/>
        <PostPreview id={'5'} image={'/src/assets/bug-image.jpeg'} liked={false} numberLikes={0} username={'username'} bodySummary={'Post body.'}/>
        <PostPreview id={'6'} image={'/src/assets/bug-image.jpeg'} liked={false} numberLikes={0} username={'username'} bodySummary={'Post body.'}/>
        <PostPreview id={'7'} image={'/src/assets/bug-image.jpeg'} liked={false} numberLikes={0} username={'username'} bodySummary={'Post body.'}/>
        <PostPreview id={'8'} image={'/src/assets/bug-image.jpeg'} liked={false} numberLikes={0} username={'username'} bodySummary={'Post body.'}/>
        <PostPreview id={'9'} image={'/src/assets/bug-image.jpeg'} liked={false} numberLikes={0} username={'username'} bodySummary={'Post body.'}/>

        <div className="col-12 text-center my-4">
            <button type="button" className="btn btn-dark">Load More</button>
        </div>
    </div>;
}

export default PostGrid;