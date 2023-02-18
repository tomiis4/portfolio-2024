import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

// pages
import Create from './pages/create/Create'

function App() {
  return (
    <Router>
      <Routes>
			<Route path="/" element={<Create />} />
      </Routes>
    </Router>
  )
}

export default App
