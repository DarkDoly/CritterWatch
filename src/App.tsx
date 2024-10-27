import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ForumBox from "./components/nav/ForumPreview"


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forum" element={<ForumBox />} />
      </Routes>
  )
}
