import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import db from "../../data/ConfigFirebase";
import Navbar from "../components/navbar/Navbar";

type Blog = {
	id: string,
	title: string,
	description: string
}

function Blogs() {
	const [data, setData] = useState<Blog[]>([]);

	useEffect(() => {
		db.collection('blogs').get().then(elem => {
			let result: Blog[] = [];

			elem.docs.forEach(blog => {
				const id = blog.id
				const data = blog.data();

				result.push({
					id: id,
					title: data.title,
					description: data.description
				});
			});

			setData(result);
		}).catch(err => {
			console.error(err)
		})
	}, [])

	return (
		<>
			<Navbar />

			{
				data.map(blog => {
					return (
						<Link to={`/blog/${blog.id}`}>
						<div className="blog" style={{position: 'relative', top: '100px'}}>
							<h2> {blog.title} </h2>
							<p> {blog.description} </p>
						</div>
						</Link>
					)
				})
			}
		</>
	)
}

export default Blogs;
