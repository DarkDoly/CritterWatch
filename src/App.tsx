import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PostDetailed from "./pages/PostDetailed";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";
import ForgotPasswordPartA from "./pages/ForgotPasswordPartA";
import ForgotPasswordPartB from "./pages/ForgotPasswordPartB";
import Profile from "./pages/Profile";
import ChatFriendPage from "./pages/ChatFriendPage";

function App() {
  return (
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
      <Route path="/forgotPasswordTempA" element={<ForgotPasswordPartA />} />
      <Route path="/forgotPasswordTempB" element={<ForgotPasswordPartB />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Friends" element ={<ChatFriendPage />} />
    </Routes>
  );
}

export default App;