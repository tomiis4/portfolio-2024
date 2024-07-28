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

const drawRow = (row, nRow, image, data) => {
    const { type, rotation } = data

    row.forEach((block, nBlock) => {
        let getX, getY = 0;

        if (block == 0) {
            return
        } else if (type == "up") {
            getX = (nRow - nBlock) * (width / 2) - (nRow * 0.5 * width);
            getY = (nRow + nBlock) / 2 * (width / 2) - (nRow * 0.75 * width);
        } else if (type == "down") {
            getX = (nRow - nBlock) * (width / 2);
            getY = (nRow + nBlock) / 2 * (width / 2);
        }

        if (rotation == 90) {
            getX += (nBlock * width) - (width);
            getY += width / 2;
        }

        ctx!.drawImage(image, getX + 200, getY + 250, width, width);
    })
}

const drawObject = (object, image) => {
    const data = object.data;

    if (object.type == "up") {
        data.reverse()
    }

    data.forEach((row, idx) => {
        drawRow(row, idx, image, object)
    })
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
