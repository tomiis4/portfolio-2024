type Section = {
    width: number // %
    height: number // %
    top: number // %
    left: number // %
    rotate?: number // deg
}

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
            width: 29,
            height: 41,
            top: 20,
            left: 5,
            rotate: -35,
        }, {
            width: 48,
            height: 29,
            top: 4,
            left: 63,
            rotate: -13,
        }, {
            width: 34,
            height: 60,
            top: 50,
            left: 62,
            rotate: 0
        }
    ], [ // stage 3
        {
            width: 29,
            height: 41,
            top: 20,
            left: 5,
            rotate: -35,
        }, {
            width: 48,
            height: 29,
            top: 4,
            left: 63,
            rotate: -13,
        }, {
            width: 34,
            height: 60,
            top: 50,
            left: 62,
            rotate: 0
        }
    ], [ // stage 4
        {
            width: 50,
            height: 43,
            top: 2,
            left: -9,
            rotate: 0,
        }, {
            width: 48,
            height: 29,
            top: -1,
            left: 63,
            rotate: 0,
        }, {
            width: 42,
            height: 60,
            top: 57,
            left: 47,
            rotate: 22
        }
    ]
];

export default background_section;
export type { Section }
