import './blogs.scss'
import Navbar from "../components/navbar/Navbar";
import Code from './components/Code';
import db from '../../data/ConfigFirebase';

import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

type Data = {
	title: string,
	content?: Content
}

type Order = {
	type: 'code' | 'text',
	index: number,
}

type Code = {
	file: string,
	content: string,
}

type Content = {
	order: Order[],
	code?: Code[],
	text?: string[]
}

function Blog() {
	const {blogID} = useParams();
	const [data, setData] = useState<Data>({title: ''});

	useEffect( () => {
		db.collection("blogs").doc(blogID).get().then(doc => {
			if (doc.exists) {
				const data = doc.data()
				setData({
					title: data!.title ?? 'No data found',
					content: data!.content
				})
			} else {
				console.error('No data found');
			}
		}).catch(err => {
			console.error(err);
		})
	}, [])

	return (
		<>
			<Navbar/>
			<div className="blog">
				<h1> {data.title} </h1>
				{
					data.content?.order.map(order => {
						const type = order.type
						const content = data.content![type]![order.index];

						if (type == 'text') {
							return <p dangerouslySetInnerHTML={{__html: content}}></p>
						} else if (type == 'code') {
							return <Code content={content.content} fileName={content.file} />
						}
					})
				}
			</div>
		</>
	)
}

export default Blog;
