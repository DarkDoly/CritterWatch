import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ForumBox from "./components/nav/ForumPreview"
import ForgotPasswordPartA from "./pages/ForgotPasswordPartA"
import ForgotPasswordPartB from "./pages/ForgotPasswordPartB"
import Profile from "./pages/Profile"


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forum" element={<ForumBox />} />
        <Route path="/forgotPasswordTempA" element={<ForgotPasswordPartA />} />
        <Route path="/forgotPasswordTempB" element={<ForgotPasswordPartB />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
  )
}