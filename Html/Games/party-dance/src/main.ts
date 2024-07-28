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
const img2 = document.querySelector("#i2");

const drawRow = (row, nRow, it, dir) => {
    row.forEach((block, n, array) => {
        if (block == 1) {
            let getX, getY = 0;

            if (dir == "up") {
                // up
                // getX = (nRow - n) * (width / 2) - (nRow * 0.5 * width);
                // getY = (nRow + n) / 2 * (width / 2) - (nRow * 0.75 * width) - width / 2;

                // roatateed 90deg
                getX = (nRow - n) * (width / 2) - (nRow * 0.5 * width) + (n * width) - (width);
                getY = (nRow + n) / 2 * (width / 2) - (nRow * 0.75 * width)
            } else if (dir == "down") {
                // down
                getX = (nRow - n) * (width / 2);
                getY = (nRow + n) / 2 * (width / 2);
            }

            ctx!.imageSmoothingEnabled = false;
            ctx!.drawImage(it, getX + 200, getY + 250, width, width);
        }
    })
}

const drawObject = (object, it) => {
    const data = object.data;

    if (object.type == "up") {
        data.reverse()
    }

    data.forEach((row, n) => {
        drawRow(row, n, it, object.type)
    })
}
const generateRandomGrid = (rows, cols) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            // row.push(Math.floor(Math.random() * 2));
            row.push(1);
        }
        grid.push(row);
    }
    return grid;
}

const objects = {
    board: {
        type: "down",
        rotation: 0,
        data: [
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
        ]
    },
    portal: {
        type: "up",
        rotation: 90,
        data: [
            [1, 1, 1],
            [1, 0, 1],
            [1, 0, 0],
            [1, 0, 1],
            [1, 1, 1],
        ]
    }
}

const loop = () => {
    ctx!.clearRect(0, 0, cWidth, cHeight);

    drawObject(objects.board, img)
    drawObject(objects.portal, img2)

    // window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
