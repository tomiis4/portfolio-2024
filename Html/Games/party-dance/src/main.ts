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
const img = <CanvasImageSource>document.querySelector("#i")!;
const img2 = <CanvasImageSource>document.querySelector("#i2")!;

const drawRow = (row: number[], nRow: number, image: CanvasImageSource, data: Object) => {
    const { type, rotation } = data

    row.forEach((block, nBlock) => {
        let getX = 0, getY = 0;

        if (block == 0) {
            return
        } else if (type == "up") {
            getX = (nRow - nBlock) * (width / 2) - (nRow * 0.5 * width) - (width / 2);
            getY = (nRow + nBlock) / 2 * (width / 2) - (nRow * 0.75 * width) - (width / 4);
        } else if (type == "down") {
            getX = (nRow - nBlock) * (width / 2);
            getY = (nRow + nBlock) / 2 * (width / 2);
        }

        //FIXME UP only
        if (rotation == 90) {
            getX += (nBlock * width) - (width);
            getY += width / 2;
        } else if (rotation == 180) {
            getX -= width;
            getY += width / 2;
        } else if (rotation == 270) {
            getX += (nBlock * width) - (width*2) ;
        }


        ctx!.drawImage(image, getX + 200, getY + 250, width, width);
    })
}

const drawObject = (object: Object, image: CanvasImageSource) => {
    const data = object.data;

    if (object.type == "up") {
        data.reverse()
    }

    data.forEach((row, idx) => {
        if (object.rotation != 90 && object.rotation != 180) {
            row.reverse()
        }
        drawRow(row, idx, image, object)
    })
}

type Objects = { [key: string]: Object }
type Object = {
    type: "up" | "down",
    rotation: number,
    data: number[][]
}


const objects: Objects = {
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
        rotation: 270,
        data: [
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 0],
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
