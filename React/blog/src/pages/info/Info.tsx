import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import './info.scss';

type Lang = 'ReactJs' | 'TypeScript' | 'SCSS' | 'GoLang';


const data = {
	ReactJs: {
		years: 1.8,
		projects: 8,
		skill: 8
	},
	TypeScript: {
		years: 2,
		projects: 14,
		skill: 9
	},
	SCSS: {
		years: 1.5,
		projects: 8,
		skill: 8
	},
	GoLang: {
		years: 0.5,
		projects: 8,
		skill: 7
	}
};

function Info() {
	const [lang, setLang] = useState<Lang>('ReactJs');
	const languages: Lang[] = ['ReactJs', 'TypeScript', 'SCSS', 'GoLang'];

	const handleLangSelect = (lang: Lang) => {
		setLang(lang);
	}


	return (
		<div className='info'>
			<Navbar />
			<div id='about-me'>
				<h1> About me </h1>
				<ul>
					<li> self-taught </li>
					<li> young front-end & software developer </li>
					<li> 2 years of experience </li>
					<li>
						{
							languages.map(elem => {
								return <s onClick={() => handleLangSelect(elem)}>
									{elem}
								</s>
							})
						}
					</li>
					{/* <li> ReactJs | TypeScript | SCSS | GoLang </li> */}
				</ul>
				<div className='lang-stats'>
					<h3> {lang} </h3>
					<div className='stat'>
						<h5> {data[lang].years} </h5>
						<p> years </p>
					</div>
					<div className='stat'>
						<h5> {data[lang].projects} </h5>
						<p> projects </p>
					</div>
					<div className='stat'>
						<h5> {data[lang].skill}/10 </h5>
						<p> complexity </p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Info;
