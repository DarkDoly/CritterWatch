import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PostDetailed from "./pages/PostDetailed";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Friends from "./pages/Friends";
import SignOut from "./pages/SignOut";
import Forgot from "./pages/Forgot";
import FriendRequests from "./pages/FriendRequests";

function App() {
  return (
    <div className="primary-background-cus h-100" style={{minHeight: "100vh"}}>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post/:id"
        element={
          <ProtectedRoute>
            <PostDetailed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/user/:username"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/friends"
        element={
          <ProtectedRoute>
            <Friends />
          </ProtectedRoute>
        }
      />
      <Route
        path="/friends/:username"
        element={
          <ProtectedRoute>
            <Friends />
          </ProtectedRoute>
        }
      />
      <Route
        path="/requests"
        element={
          <ProtectedRoute>
            <FriendRequests />
          </ProtectedRoute>
        }
      />
      <Route path="/signout" element={<SignOut />} />
      <Route path="/forgot" element={<Forgot />} />
    </Routes>
    </div>
  );
}

export default App;
