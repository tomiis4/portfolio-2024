import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

// pages
const X = ()=> <> Presentation </>

function App() {
  return (
    <Router>
      <Routes>
			<Route path="/" element={<X />} />
      </Routes>
    </Router>
  )
}

export default App
