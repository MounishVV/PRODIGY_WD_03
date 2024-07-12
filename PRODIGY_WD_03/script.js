let playerXNameInput = document.getElementById('playerXName');
let playerONameInput = document.getElementById('playerOName');
let startBtn = document.getElementById('startBtn');
let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let playerXName, playerOName;

startBtn.addEventListener('click', () => {
  playerXName = playerXNameInput.value.trim() || "Player X";
  playerOName = playerONameInput.value.trim() || "Player O";

  playerText.innerHTML = `${playerXName}'s turn`;

  startGame();
});

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer == X_TEXT ? playerXName : playerOName} has won!`;
      let winning_blocks = playerHasWon();

      winning_blocks.forEach(box => boxes[box].style.backgroundColor = winnerIndicator);
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    playerText.innerHTML = `${currentPlayer == X_TEXT ? playerXName : playerOName}'s turn`;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
  spaces.fill(null);

  boxes.forEach(box => {
    box.innerText = '';
    box.style.backgroundColor = '';
  });

  playerText.innerHTML = 'Tic Tac Toe';
  currentPlayer = X_TEXT;

  // Clear player names
  playerXNameInput.value = '';
  playerONameInput.value = '';
}
