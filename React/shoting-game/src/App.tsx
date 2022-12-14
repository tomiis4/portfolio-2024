import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

// pages
import Render from './pages/render'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Render />} />
      </Routes>
    </Router>
  )
}

export default App
