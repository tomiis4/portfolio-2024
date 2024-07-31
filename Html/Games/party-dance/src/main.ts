import './style.scss';

const canvas = document.querySelector('canvas');
canvas!.width = window.innerWidth;
canvas!.height = window.innerHeight;

const [cWidth, cHeight] = [canvas!.width, canvas!.height];
const ctx = canvas!.getContext('2d');

// TODO
// - velká mapa
// - z toho co vidí uživatel -> střed = postavička
//
// TODO: add map center movment -> player
//
// TODO: add map center movment -> player

const width = 55;
const img = <CanvasImageSource>document.querySelector("#i")!;
const img2 = <CanvasImageSource>document.querySelector("#i2")!;
const p = <CanvasImageSource>document.querySelector("#p")!;

const drawRow = (row: number[], nRow: number, image: CanvasImageSource, data: Object) => {
    const { type, rotation, position } = data
    const [movX, movY] = position;

    row.forEach((block, nBlock) => {
        let getX = 0, getY = 0;

        if (block == 0) {
            return
        } else if (type == "up") {
            getX = -(0.5 * width * nBlock) - (0.5 * width)
            getY = (-2 * nRow * width + nBlock * width) / 4 - (0.25 * width)
        } else if (type == "down") {
            getX = (nRow - nBlock) * (width / 2);
            getY = (nRow + nBlock) / 2 * (width / 2);
        }

        //FIXME UP only
        if (rotation == 90) {
            getX += nBlock * width - width;
            getY += width / 2;
        } else if (rotation == 180) {
            getX -= width;
            getY += width / 2;
        } else if (rotation == 270) {
            getX += (nBlock * width) - (width * 2);
        }

        getX += (movX * width / 2) - (movY * width / 2);
        getY += (movY * width / 4) + (movX * width / 4);

        ctx!.drawImage(image, getX + 200, getY + 250, width, width);
    })
}

const drawObject = (object: Object, image: CanvasImageSource) => {
    const { type, rotation, data } = object

    if (type == "up") {
        // data.reverse()
    }

    data.forEach((row, idx) => {
        if (![90, 180].includes(rotation)) {
            row.reverse()
        }

        drawRow(row, idx, image, object)
    })
}

type Objects = { [key: string]: Object }
type Object = {
    type: "up" | "down",
    position: [number, number],
    rotation: number,
    data: number[][]
}


let objects: Objects = {
    board: {
        type: "down",
        position: [0, 0],
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
        position: [4, 0],
        rotation: 90,
        data: [
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 0],
            [1, 0, 1],
            [1, 1, 1],
        ]
    },
    player: {
        type: "up",
        position: [2,2],
        rotation: 0,
        data: [[1]]
    }
}

document.addEventListener("keydown", (k) => {
    if (k.key == "w") {
        objects.player.position[0] += 0.3;
    }
    if (k.key == "s") {
        objects.player.position[0] -= 0.3;
    }
    if (k.key == "a") {
        objects.player.position[1] += 0.3;
    }
    if (k.key == "d") {
        objects.player.position[1] -= 0.3;
    }
})

const loop = () => {
    ctx!.clearRect(0, 0, cWidth, cHeight);

    drawObject(objects.board, img)
    drawObject(objects.portal, img2)
    drawObject(objects.player, p)

    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
