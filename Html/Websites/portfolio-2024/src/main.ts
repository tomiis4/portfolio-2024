import './style.scss';

type Section = {
    width: string
    height: string
    position: string[] // top, left
}

let stage = 0;

const body = document.body;
const background_colors = ['#001016', '#010B0E', 'rgba(0, 0, 0, 0.93)', '#000000'];
const background_section: Section[][] = [
    [
        {
            width: '35%',
            height: '37%',
            position: ['0', '0'],
        }, {
            width: '20%',
            height: '20%',
            position: ['10%', '77vw'],
        }, {
            width: '65%',
            height: '39%',
            position: ['71%', '14%'],
        }
    ]
];


const stageBg = () => {
    body.style.background = background_colors[stage]
    for (let i:number=0; i < 3; i++) {
        const section: HTMLElement|null = document.querySelector('.s-' + i);
        const style: Section = background_section[stage][i]

        section!.style.width = style.width
        section!.style.height = style.height
        section!.style.top = style.position[0]
        section!.style.left = style.position[1]
    }
}


stageBg();
