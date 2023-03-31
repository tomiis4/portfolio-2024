import './blogs.scss'
import Navbar from "../components/navbar/Navbar";
import Code from './components/Code';

function Blog() {
	const code = `package main
		import "fmt"

		func main() {
			&nbsp;&nbsp;&nbsp; fmt.Printf("Hello, %s", name)
		}`;

		const paragraphs = [`Bionic reading is a type of reading that uses technology to enhance the reading experience for people with reading difficulties or disabilities. The goal of bionic reading is to <code>improve</code> reading speed, comprehension, and enjoyment for people who struggle with traditional reading methods.`, `Bionic reading can be especially helpful for people with dyslexia, ADHD, or other reading difficulties, as well as for people with visual impairments or other disabilities that make traditional reading methods challenging.`]; 

	return (
		<>
			<Navbar/>
			<div className="blog">
				<h1> Bionic reading </h1>
				{
					paragraphs.map(p => {
						return <p dangerouslySetInnerHTML={{__html: p}}></p>
					})
				}
				<Code content={code} fileName={'main.go'} />
				{
					paragraphs.map(p => {
						return <p dangerouslySetInnerHTML={{__html: p}}></p>
					})
				}
			</div>
		</>
	)
}

export default Blog;
