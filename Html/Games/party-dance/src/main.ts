import './style.scss';

const canvas = document.querySelector('canvas');
canvas!.width = window.innerWidth;
canvas!.height = window.innerHeight;

const [cWidth, cHeight] = [canvas!.width, canvas!.height];
const ctx = canvas!.getContext('2d');

// TODO
// - velká mapa
// - z toho co vidí uživatel -> střed = postavička
// - přidávání objektů na mapu

const width = 55;
const img = document.querySelector("#i");

const drawRow = (row, nRow) => {
    row.forEach((block, n) => {
        if (block == 1) {
            const getX = (nRow * 1 + n * -1) * (width / 2);
            const getY = (nRow * 0.5 + n * 0.5) * (width / 2);

            ctx!.imageSmoothingEnabled = false;
            ctx!.drawImage(img, getX + 200, getY + 100, width, width)
        }
    })
}

const drawMap = (board) => {
    board.forEach((row, n) => {
        drawRow(row, n)
    })
}
const generateRandomGrid = (rows, cols) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Math.floor(Math.random() * 2));
        }
        grid.push(row);
    }
    return grid;
}

const objects = {
    board: [
        [0, 1, 0],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [0, 1, 0],
    ],
    portal: [
        [0, 1, 1],
    ]
}

const loop = () => {
    ctx!.clearRect(0, 0, cWidth, cHeight);
    // drawMap(objects.board)
    drawMap(generateRandomGrid(25,25))

    // window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
