import SelectableChat from "../components/friends/SelectableChat";
import NavBar from "../components/nav/NavBar";

function Friends() {
  return (
    <>
      <NavBar />

      <div className="container">
        <div className="row my-3">
          <div className="col-3">
            <SelectableChat />
          </div>

          <div className="col-9">Messaging</div>
        </div>
      </div>
    </>
  );
}

export default Friends;
