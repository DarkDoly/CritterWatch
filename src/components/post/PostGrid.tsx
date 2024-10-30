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
    </div>;
}

export default PostGrid;