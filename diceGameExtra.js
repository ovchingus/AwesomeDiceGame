/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
*/

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

// Score need for win
var winScore;

// array of 3 ints contains [Dice, Dice2, playerNumberWhoRolled]
var previousRollScores;

init();

function displayDice(value, diceNumber, isPrevious, player) {
  var cssClass = ".dice";
  if (diceNumber === 0) {
    cssClass += "0";
  } else if (diceNumber === 1) {
    cssClass += "1";
  }
  if (isPrevious) {
    cssClass += "-pp";
  }
  if (player === 0) {
    cssClass += "0";
  } else if (player === 1) {
    cssClass += "1";
  }
  var diceDOM = document.querySelector(`${cssClass}`);
  console.log(cssClass);
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + value + ".png";
}

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    var dice0, dice1;

    // 0. If there not the first roll save dices to prev
    if (previousRollScores[0] !== 0 && previousRollScores[1] !== 0) {
      if (previousRollScores[2] === 0) {
        displayDice(previousRollScores[0], 0, true, 0);
        displayDice(previousRollScores[1], 1, true, 0);
      } else if (previousRollScores[2] === 1) {
        displayDice(previousRollScores[0], 0, true, 1);
        displayDice(previousRollScores[1], 1, true, 1);
      }
    }
    // 1. Random number
    dice0 = Math.floor(Math.random() * 6) + 1;
    dice1 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    // first dice
    displayDice(dice0, 0, false);
    // second dice
    displayDice(dice1, 1, false);

    // 3. Update the round score IF each rolled number was NOT a 1
    if (dice0 !== 1 && dice1 !== 1) {
      // Add score
      roundScore += dice0 + dice1;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      previousRollScores[0] = dice0;
      previousRollScores[1] = dice1;
      previousRollScores[2] = activePlayer;
      console.log(previousRollScores);
    } else {
      previousRollScores[0] = 0;
      previousRollScores[1] = 0;
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add current score to GlOBAL score
    scores[activePlayer] += roundScore;

    // Update the ui
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      hideAllDice;
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      previousRollScores[0] = 0;
      previousRollScores[1] = 0;
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  // Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  hideAllDice();
}

function hideAllDice() {
  document.querySelector(".dice0").style.display = "none";
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice0-pp0").style.display = "none";
  document.querySelector(".dice1-pp0").style.display = "none";
  document.querySelector(".dice0-pp1").style.display = "none";
  document.querySelector(".dice1-pp1").style.display = "none";
}

function init() {
  console.log("init");
  scores = [0, 0];
  previousRollScores = [0, 0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  hideAllDice();

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  winScore = prompt("Choose score for win");
}
