import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

// pages
import BubbleSort from './algorithms/sorting/bubble-sort/bubble-sort.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BubbleSort/>} />
      </Routes>
    </Router>
  )
}

export default App
