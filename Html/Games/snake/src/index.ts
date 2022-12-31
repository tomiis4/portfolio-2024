const canvasElem= document.querySelector('canvas');
const ctx = canvasElem!.getContext('2d');
const width = window.innerHeight* 0.60, height = window.innerHeight* 0.60; 

const scoreEl = document.querySelector('#score');

canvasElem!.width = width; 
canvasElem!.height = height;

const randNum = (max: number) => Math.floor( Math.random()*max )
const delay = (ms: number) => { return new Promise(res => setTimeout(res,ms)) }

const colors = ['#6affa2', '#31934b'];
const boardColors: string[] = [];
const gridLen = 10
const speed = 500;
const blockLen = width / gridLen;

let snakePosition: number[][] = [[0,0]];
let snakeDir = 'right'

let applePos: number[] | null[] = [];

let score = 0;

function getBoard() {  
   if (!boardColors[0]) {
      for(let y=0; y < gridLen; y++){
         for(let x=0; x < gridLen; x++){      
            boardColors.push(colors[randNum(colors.length)]);
            
            ctx!.fillStyle = colors[randNum(colors.length)];
            ctx!.fillRect(
               x*blockLen,
               y*blockLen,
               blockLen,
               blockLen
            );
         }
      }
   } else {
      let looped = 0
     
      for(let y=0; y < gridLen; y++){
         for(let x=0; x < gridLen; x++){
            ctx!.fillStyle = boardColors[looped];
            ctx!.fillRect(
               x*blockLen,
               y*blockLen,
               blockLen,
               blockLen
            );
            looped++;
         }
      }
   }
}

function appendApple() {
   if (applePos[0]) {
      ctx!.fillStyle = 'red';
      ctx!.fillRect(
         applePos[0]!*blockLen,
         applePos[1]!*blockLen,
         blockLen,
         blockLen
      );
   } else {
      const xPos = randNum(10);
      const yPos = randNum(10);

      applePos = [xPos,yPos];
      return appendApple();
   } 
}

function checkApple() {
   if (
      snakePosition[0][0] == applePos[0]
      && snakePosition[0][1] == applePos[1]
   ) {
      switch (snakeDir) {
         case 'left':
            snakePosition.push([
               snakePosition[snakePosition.length-1][0]+1,
               snakePosition[snakePosition.length-1][1]
            ]);
            break;
         case 'right':
            snakePosition.push([
               snakePosition[snakePosition.length-1][0]-1,
               snakePosition[snakePosition.length-1][1]
            ]);
            break;
         case 'up':
            snakePosition.push([
               snakePosition[snakePosition.length-1][0],
               snakePosition[snakePosition.length-1][1]+1
            ]);
            break;
         case 'down':
            snakePosition.push([
               snakePosition[snakePosition.length-1][0],
               snakePosition[snakePosition.length-1][1]-1
            ]);
            break;
         default: return;
      }
          
      score++;
      scoreEl!.innerHTML = `Score: ${score}`;
      applePos = [null,null];
      appendApple();
   }
}

// buttons
function changeDir(dir: string) {
   if (
      (dir == 'up' && snakeDir == 'down')
      || (dir == 'down' && snakeDir == 'up')
      || (dir == 'left' && snakeDir == 'right')
      || (dir == 'right' && snakeDir == 'left')
   ) {
      snakeDir;
   } else {
      snakeDir = dir;
   }
}
// keyboard
document.addEventListener('keypress', (e: KeyboardEvent) => {
   const key = e.key
   const eventKey = {
      'w': 'up',
      's': 'down',
      'a': 'left',
      'd': 'right'
   }
   
   if (
      (eventKey[key] == 'up' && snakeDir == 'down')
      || (eventKey[key] == 'down' && snakeDir == 'up')
      || (eventKey[key] == 'left' && snakeDir == 'right')
      || (eventKey[key] == 'right' && snakeDir == 'left')
   ) {
      snakeDir;
   } else {
      snakeDir = eventKey[key];
   }
})

async function moveSnake() {
   await delay(speed);
   
   switch (snakeDir) {
      case 'left':
         snakePosition.unshift([
            snakePosition[0][0] - 1,
            snakePosition[0][1]
         ]);
         break;
      case 'right':
         snakePosition.unshift([
            snakePosition[0][0] + 1,
            snakePosition[0][1]
         ]);
         break;
      case 'up':
         snakePosition.unshift([
            snakePosition[0][0],
            snakePosition[0][1] - 1
         ]);
         break;
      case 'down':
         snakePosition.unshift([
            snakePosition[0][0],
            snakePosition[0][1] + 1
         ]);
         break;
      default: return;
   }    
   snakePosition.pop()
}

function snake() {
   snakePosition.forEach((arr,i) => {
      ctx!.fillStyle = i==0 ? 'black':'rgb(20,20,20)';
      ctx!.fillRect(arr[0]*blockLen,arr[1]*blockLen,blockLen,blockLen)
   })
}


getBoard();
const loop = async () => {
   ctx!.clearRect(0,0, width, height);

   getBoard();
   appendApple();
   checkApple();
   snake();
   await moveSnake();

   window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
