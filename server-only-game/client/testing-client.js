//! HTTP Request 
// const http = require('http')

// const main = () => {
//   const request = http.get('http://localhost:4200/join?name=tomiis&skinID=42069&serverID=69', (res) => {
//     res.on('data', (chunkData) => {
//       const data = chunkData.toString()
//       console.log(data)
//     })
//   })

//   request.end()
// }

// main()

//? Screen

// Start timer
console.time("timeFunction");

// Welcome screen
const welcomeScreen = ' ###########################################################################\n ###########################################################################\n ##                                                                       ##\n ##                                                                       ##\n ##                                                                       ##\n ##                       # # # #  ### ### # # ###                        ##\n ##                       ### # #  #   # # ### #                          ##\n ##                       # #  #   # # ### # # ##                         ##\n ##                       # #  #   # # # # # # #                          ##\n ##                       # #  #   ### # # # # ###                        ##\n ##                                                                       ##\n ##                                                                       ##\n ##                                                                       ##\n ##                           #################                           ##\n ##                           ##    ENTER    ##                           ##\n ##                           #################                           ##\n ##                                                                       ##\n ##                                                                       ##\n ##                                                                       ##\n ##                                                                       ##\n ##                                                                       ##\n ##                                                   ### ### # # #  ##   ##\n ##                                                    #  # # ### #  #    ##\n ##                                                    #  ### # # # ##    ##\n ##                                                                       ##\n ###########################################################################\n ###########################################################################';

// Variables
const space = ' ';
const char = '#';
const newLine = '\n';
let screen = '';

// Functions
const generateHorizontalLines = () => {
  // Create 2 char wide horizontal line
  for (let j=0; j<2; j++) {
    // Create 1 char wide horizontal line
    for (let i=0; i<75; i++) {
      screen += char;
    };
    
    screen += newLine;
  };
};
const generateVerticalLines = () => {
  // Create 23 char height
  for (let j=0; j<23; j++) {
    // Add 2 chars at left
    screen += char;
    screen += char;
  
    // Create 71 char wide blank screen
    for (let i=0; i<71; i++) {
      screen += space;
    };
    
    // Add 2 chars at right & new line
    screen += char;
    screen += char;
    screen += newLine;
  };
};
const getIndex = (x, y) => {
  return (76 * ((y +2) -1)) + ((x +2)-1);
};
const generateNewScreen = () => {
  generateHorizontalLines();
  generateVerticalLines();
  generateHorizontalLines();
};

// Generate screen & convert it to the array
generateNewScreen();
screen = screen.split('');

// screen[getIndex(2,2)] = 'X';

// Display screen
console.log(screen.toString().replaceAll(',', ''));

// End timer
console.timeEnd("timeFunction");


//? Controls

// Variables
const positions = [
  [ // Player1
    [ // Head
      [6,3],
      [7,3],
      [8,3],
    ],
    [ // Body
      [6,4],
      [7,4],
      [8,4],
    ],
  ],

  [ // Player2
    [ // Head
      [6,20],
      [7,20],
      [8,20],
    ],
    [ // Body
      [6,21],
      [7,21],
      [8,21],
    ],
  ],

  [ // Player3
    [ // Head
      [64,3],
      [65,3],
      [66,3],
    ],
    [ // Body
      [64,4],
      [65,4],
      [66,4],
    ],
  ],

  [ // Player4
    [ // Head
      [64,20],
      [65,20],
      [66,20],
    ],
    [ // Body
      [64,21],
      [65,21],
      [66,21],
    ],
  ],
]; 


// screen = screen.split('');

positions.forEach((_, playerIndex) => {
  positions[playerIndex].forEach((_, bodyPartIndex) => {
    positions[playerIndex][bodyPartIndex].forEach((_, chordsIndex) => {
      const xPosition = positions[playerIndex][bodyPartIndex][chordsIndex][0]
      const yPosition = positions[playerIndex][bodyPartIndex][chordsIndex][1]
      const bodyPart = (bodyPartIndex == 0) ? 'O' : 'X'

      screen[getIndex(xPosition, yPosition)] = bodyPart
    })
  })
})

// screen[getIndex(2,2)] = 'X';

console.log(screen.toString().replaceAll(',', ''));
