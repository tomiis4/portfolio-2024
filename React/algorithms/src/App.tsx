import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

// pages
import BubbleSort from './algorithms/sorting/bubble-sort/bubble-sort.tsx'
import QuickSort from "./algorithms/sorting/quick-sort/quick-sort"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuickSort/>} />
      </Routes>
    </Router>
  )
}

export default App
