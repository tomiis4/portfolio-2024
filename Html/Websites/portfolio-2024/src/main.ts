// TODO: use same things (%, vw, vh)

import './style.scss';

type Section = {
    width: number // %
    height: number // %
    top: number // %
    left: number // %
    rotate?: number // deg
}

const params = new URLSearchParams(window.location.search)
const body = document.body;
const window_height = window.innerHeight;
const background_colors = [
    '#001016', '#010B0E', 
    '010607', '#010607', '#000000'
];
const background_section: Section[][] = [
    [ // stage 0
        {
            width: 35,
            height: 37,
            top: 0,
            left: 0,
            rotate: 0,
        }, {
            width: 20,
            height: 20,
            top: 10,
            left: 77,
            rotate: 0,
        }, {
            width: 65,
            height: 39,
            top: 71,
            left: 14,
            rotate: 0,
        }
    ], [ // stage 1
        {
            width: 61,
            height: 119,
            top: -13,
            left: -12,
            rotate: -8,
        }, {
            width: 20,
            height: 20,
            top: -5,
            left: 85,
            rotate: 0,
        }, {
            width: 49,
            height: 30,
            top: 50,
            left: 75,
            rotate: 3,
        }
    ], [ // stage 2
        {
            width: 61,
            height: 119,
            top: -13,
            left: -12,
            rotate: -8,
        }, {
            width: 20,
            height: 20,
            top: -5,
            left: 85,
            rotate: 0,
        }, {
            width: 49,
            height: 30,
            top: 50,
            left: 75,
            rotate: 3,
        }
    ]
];

let stage = 0;
let language = params.get('l') ? params.get('l') : 'cz';


document.addEventListener('scroll', () => {
    const button = document.querySelector('#section-0 .change-lang');
    const scrolled = document.scrollingElement!.scrollTop;
    const new_stage = Math.floor(scrolled / window_height);

    if (stage != new_stage) { stage = new_stage; }

    const direction = (scrolled / window_height) > stage ? 'down' : 'up';
    setStageBg(direction);


    // stage 0
    if (scrolled / window_height >= 0.5) {
        button!.classList.add('fade-out');
        button!.classList.remove('fade-in');
    } else {
        button!.classList.remove('fade-out');
        button!.classList.add('fade-in');
    }
})

const changeLang = () => {
    const switch_to_lang = language == 'cz' ? 'en' : 'cz';
    const button: HTMLImageElement|null = document.querySelector('#section-0 .change-lang');

    button!.src = `./src/img/${switch_to_lang}-flag.jpg`;
    button!.addEventListener('click', () => {
        let lang = '';

        if (!button!.src.includes('en')) {
            params.set('l', 'cz');
            button!.src = `./src/img/en-flag.jpg`;
            lang = 'cz';
        } else {
            params.set('l', 'en');
            button!.src = `./src/img/cz-flag.jpg`;
            lang = 'en';
        }

        window.location.search = window.location.search.replace(/cz|en/, lang)
    })
}

const setStageBg = (direction: 'up'|'down'|'none') => {
    body.style.background = background_colors[stage]
    const next_stage = direction == 'up' ? stage - 1 : 
        direction == 'down' ? stage + 1 : stage

    for (let i:number=0; i < 3; i++) {
        const style_a: Section = background_section[stage][i]
        const style_b: Section = background_section[next_stage][i]
        const scrolled = document.scrollingElement!.scrollTop;

        const section: HTMLElement|null = document.querySelector('.s-' + i);

        for (const key_a in style_a) {
            const value_a = style_a[key_a];
            const value_b = style_b[key_a];
            const arr_range = calcLength(value_a, value_b, window_height);
            const unit = key_a == 'rotate' ? 'deg' : '%';

            section!.style[key_a] = arr_range[scrolled - stage * window_height] + unit
            console.log(arr_range[scrolled - stage * window_height] + unit)
        }


        // section!.style.width = style.width
        // section!.style.height = style.height
        // section!.style.top = style.top
        // section!.style.left = style.left
        // section!.style.rotate = style.rotate || 0
    }
}

const calcLength = (A: number, B: number, N: number): number[] => {
    const step = (B - A) / (N - 1);
    let result: number[] = [];

    for (let i = 0; i < N; i++) {
        result.push(A + i * step);
    }

    return result;
}


setStageBg('none');
changeLang();
/*


display height (100)
start scroll (0)
end scroll (100)

bod A (1)
bod B (15)



- array from A -> B (len 100)
    - [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]















*/
