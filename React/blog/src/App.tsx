import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import Info from "./pages/info/Info";
import Blog from "./pages/blog/Blogs"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="*" element={<Info/>} />
				<Route path="/" element={<Info/>} />
				<Route path="/blog" element={<Blog/>} />
			</Routes>
		</Router>
	);
}

export default App
