const { default: chalk } = require("chalk");
const readline = require("readline-sync");

var reelItem = ["A", "B", "C", "D", "E", "L", "M", "N", "O", "X", "Y", "Z"];

// /*Symbols       Prob   Point Symbol-in-Reel
//   A,B,C,D,E     0.5     2        4
//   L,M,N,O       0.3     3        3
//   Y,Z           0.2     5        1
// */

////////////////////////////////////////////////////////////////////////// reel generate

var lowPay = ["A", "B"];
var midPay = ["L", "M"];
var highPay = ["X", "Y"];


var mainReel = [
  "A",
  "B",
  "A",
  "B",
  "A",
  "B",
  "A",
  "B",
  "A",
  "B",
  "L",
  "M",
  "L",
  "M",
  "L",
  "M",
  "X",
  "Y",
  "X",
  "Y",
];

/////////////////////////////////////////////////////////////////////////Reel Making

function generateReel(len) {
  let window = [];

  for (var i = 0; i < len; i++) {
    var reel = [];
    for (var j = 0; j < 3; j++) {
      var randomIndex = Math.floor(Math.random() * mainReel.length);
      reel.push(mainReel[randomIndex]);
    }
    window.push(reel);
  }
  let temp = [];
  for (var i = 0; i < 3; i++) {
    let line = [];
    for (var j = 0; j < 5; j++) {
      line.push(window[j][i]);
    }
    temp.push(line);
  }
  return temp;
}


////////////////////////////////////////////////////////////////possible Patterns

var pattern = [
  ["00", "01", "02", "03", "04"],
  ["10", "11", "12", "13", "14"],
  ["20", "21", "22", "23", "24"],
  ["20", "11", "02", "13", "24"],
  ["00", "11", "22", "13", "14"],
  ["10", "21", "12", "03", "14"],
  ["10", "21", "12", "23", "14"],
  ["00", "11", "02", "13", "04"],
  ["20", "11", "22", "13", "24"],
  ["10", "01", "12", "03", "14"],
  ["00", "01", "12", "03", "04"],
  ["20", "21", "12", "23", "24"],
];

////////////////////////////////////////////////////////////////////////////matchpatterns

var winLine = [];
var credit = 0;

//////////////////////////////////////////////////////////////////////////////////option
debugger;

const matchIndex = (pattern, slotMachine) => {
  let match = "";
  for (var i = 0; i < pattern.length; i++) {
    let x = 0;
    let y;
    let count = 1;
    for (var j = 0; j < 5; j++) {
      let a = pattern[i][j];
      b = a[0];
      c = a[1];
      // console.log(slotMachine[b][c]);
      if (x == slotMachine[b][c]) {
        count++;
      } else {
        x = slotMachine[b][c];
        count = 1;
      }
    }

    if (count >= 3) {
      y = x;
      // console.log(y, pattern[i]);
    }

    /////////////////////////////////////////////////////////////////////////profit count
    if (y == "Y" || y == "Z") {
      credit += 5;
    } else if (y == "A" || y == "B" || y == "C" || y == "D" || y == "E") {
      credit += 2;
    } else if (y == "L" || y == "M" || y == "N" || y == "O") {
      credit += 3;
    }
  }
  console.log(chalk.blue.bgWhite.bold("Your Current Profit = ", credit));
};

function option() {
  console.log(chalk.blue("Press (1) => Start Game"));
  console.log(chalk.blue("Press (2) => Check Credit"));
}
option();

let mainscore = 0;

/////////////////////////////////////////////////////////////Choice Loop For Making Choice
while (true) {
  let choice = parseInt(readline.question("Enter choice "));

  switch (choice) {
    case 1:
      var slotMachine = generateReel(5);
      console.log(slotMachine);
      matchIndex(pattern, slotMachine);
      mainscore += 2;
      console.log(mainscore);

      break;

    case 2:
      console.log(chalk.blue.bgRed.bold("Your Profit = ", credit));
      break;

    case 3:
      process.exit(0);
    default:
      console.log(colorMsgs("Enter valid choice", "err"));
  }
}
