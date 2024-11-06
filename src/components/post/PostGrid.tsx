import PostPreview from "./PostPreview";

function PostGrid() {
    return <div className="row">
        <div className="col-4"><PostPreview/></div>
        <div className="col-4"><PostPreview/></div>
        <div className="col-4"><PostPreview/></div>
        <div className="col-4"><PostPreview/></div>
        <div className="col-4"><PostPreview/></div>
        <div className="col-4"><PostPreview/></div>
        <div className="col-4"><PostPreview/></div>
        <div className="col-4"><PostPreview/></div>
        <div className="col-4"><PostPreview/></div>

        <div className="col-12 text-center my-4">
            <button type="button" className="btn btn-dark">Load More</button>
        </div>
    </div>;
}

export default PostGrid;