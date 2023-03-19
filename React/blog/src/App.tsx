import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import Info from "./pages/info/Info";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Info/>} />
			</Routes>
		</Router>
	);
}

export default App
