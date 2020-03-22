/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, rollCounter, winningScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        if (winningScore === undefined) {
            document.querySelector(".warning").textContent = "Please set a winning score before you start the game!";
        } else {

            //1. Random Number
            var diceValue1 = Math.floor(Math.random() * 6) + 1;
            var diceValue2 = Math.floor(Math.random() * 6) + 1;

            //2. Display the result
            var domDice1 = document.querySelector("#dice-1");
            var domDice2 = document.querySelector("#dice-2");

            domDice1.style.display = "block";
            domDice2.style.display = "block";

            domDice1.src = "dice-" + diceValue1 + ".png";
            domDice2.src = "dice-" + diceValue2 + ".png";
            rollCounter++;

            //3. Update the round score IF the rolled number was NOT a 1
            if (diceValue1 > 1 && diceValue2 > 1) {
                if (diceValue1 === diceValue2 && diceValue2 + diceValue1 < 12) {
                    roundScore += (diceValue2 + diceValue2)*2
                    document.querySelector("#current-" + activePlayer).textContent = roundScore + " (" + rollCounter + ")";
                    document.querySelector(".warning").textContent = "Player " + (activePlayer+1) + " rolls " + (diceValue1 + diceValue2)*2 + " (double Points for Doublets)";
                } else if (diceValue2 + diceValue1 === 12) {
                    scores[activePlayer] = 0;
                    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
                    document.querySelector(".warning").textContent = "Player " + (activePlayer+1) + " rolls doublets of 6 and loses ALL Points!";
                    nextPlayer();
                } else {
                    //Add Score
                    roundScore += diceValue2 + diceValue1;
                    document.querySelector("#current-" + activePlayer).textContent = roundScore + " (" + rollCounter + ")";
                    document.querySelector(".warning").textContent = "Player " + (activePlayer+1) + " rolls " + (diceValue1 + diceValue2);
                }
            } else {
                //Next Player
                document.querySelector(".warning").textContent = "Player " + (activePlayer+1) + " rolls a 1 and loses the points for this turn!";
                nextPlayer();
            } 
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector("#dice-1").style.display = "none";
            document.querySelector("#dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            document.querySelector(".warning").textContent = "Player " + (activePlayer+1) + " wins the Match!";
            gamePlaying = false;
        } else {
            document.querySelector(".warning").textContent = "Player " + (activePlayer+1) + " holds " + roundScore + " Points and finishes the turn";
            nextPlayer();
        }
    }
});

document.querySelector(".btn-score").addEventListener("click", function() {
    winningScore = document.querySelector(".input-score").value;
    document.querySelector(".display-score").innerHTML = "Score to win: " + winningScore;
    document.querySelector(".display-score").style.display = "block";
    document.querySelector(".btn-score").style.display = "none";
    document.querySelector(".input-score").style.display = "none";

    document.querySelector(".warning").textContent = "";
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    rollCounter = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    //document.querySelector(".dice").style.display = "none";
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    rollCounter = 0;
    winningScore = undefined;

    document.querySelector(".warning").textContent = "";

    document.querySelector("#dice-1").style.display = "none";
    document.querySelector("#dice-2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

    document.querySelector(".display-score").style.display = "none";
    document.querySelector(".btn-score").style.display = "block";
    document.querySelector(".input-score").style.display = "block";

    gamePlaying = true;
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/