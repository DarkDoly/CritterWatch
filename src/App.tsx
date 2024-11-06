import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import PostDetailed from "./pages/PostDetailed"

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Home />
      }
      />
      <Route path="/post/*" element= {
        <PostDetailed />
      }
      />
    </Routes>
  )
}

export default App
