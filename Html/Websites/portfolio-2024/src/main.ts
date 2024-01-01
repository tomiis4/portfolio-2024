import background_section, { Section } from './data';
import './style.scss';

const params = new URLSearchParams(window.location.search)
const window_height = window.innerHeight;

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
    const next_stage = direction == 'up' && stage != 0 ? stage - 1 : 
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
