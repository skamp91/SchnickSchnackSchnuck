/*big shorthand arrow function, for the hole game
where every other function is inside */
const game = () => {
  //scoping everything inside this function ->no global variables
  //makes the code self-containing
  let pScore = 0;
  let cScore = 0;

  //start the game function
  const startGame = () => {
    //scope of the Play Button in the function startGame to start the game
    const playBtn = document.querySelector('.intro button');
    //const to fadeOut the Intro after click playBtn
    const introScreen = document.querySelector('.intro');
    //const to fadeIn match screen after click playBtn
    const match = document.querySelector('.match');

    /*anonymous function written as shorthand arrow function
      -> übernimmt die Aufgabe des Listeners für click-Events
      ->bei click auf playBtn wird dem der intro class die fadeout class
        zugewiesen
    */
    playBtn.addEventListener('click', () => {
      introScreen.classList.add('fadeOut');
      match.classList.add('fadeIn');
    });
  };

  //Play Match
  const playMatch = () => {
    //select all buttons from the options class
    const options = document.querySelectorAll('.options button');
    const playerHand = document.querySelector('.player_hand');
    const computerHand = document.querySelector('.computer_hand');

    //remove Animation for Intro
    const hands = document.querySelectorAll('.hands img');
    const winner = document.querySelector('.winner');

    hands.forEach(hand => {
      hand.addEventListener('animationend', function() {
        this.style.animation = '';

        setTimeout(() => {
          computerHand.classList.remove('computerLose', 'computerWin', 'tieComputer');
          playerHand.classList.remove('playerLose', 'playerWin', 'tiePlayer');
          playerHand.src = `./assets/ROCK.png`;
          computerHand.src = `./assets/ROCK.png`;

          winner.textContent = 'Take your choice';
        }, 2000)
      })
    });

    /*computer options has to be generated
      1. create array with the options as strings -> ROCK, PAPER, SCISSORS
      2. generate a random number
         and reference to the array index (computerNumber)
      3. add to every button an eventListener click
        -> only 1 parameter -> the brackets can leave out for the arrow function
        -> dont use anonymous function, because using the "this" keyword to call the function
           -> "this" in arrow functions hasn't an own this.keyword,
              because "this" refers to the "this" of teh enclosing context
              (this verweist auf das this des umschließenden Kontextes)
              -> by using an arrow function ()=> and use console.log(this)
                the output is "Window http://localhost:7777/index.html"
                for ROCK SCISSORS PAPERS on click
      4. assign  computerNumber as computerChoice to the array index of computerOptions
        -> computerOptions[computerNumber];
           returns a random ROCK,PAPER or SCISSORS
    */
    const computerOptions = ['ROCK', 'PAPER', 'SCISSORS'];
    options.forEach(option => {
      option.addEventListener('click', function() {
        /*console.log(this);*/

        //computer choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];
        //console.log(computerChoice);

        //Set the Timeout for the Winner!!!
        setTimeout(() => {
          //Here we call compare hands
          compareHands(this.textContent, computerChoice);

          //update Images - PfadDerImg/
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;

        }, 1500)

        //Intro Animation
        playerHand.style.animation = 'shakePlayer 1.5s ease';
        computerHand.style.animation = 'shakeComputer 1.5s ease';

      });
    });
  };

  //Update the Scores
  const updateScore = () => {
    const playerScore = document.querySelector('.playerscore p');
    const computerScore = document.querySelector('.computerscore p');
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  }

  //check who is winning
  const compareHands = (playerChoice, computerChoice) => {
    /*update Text -> with textContent
                  -> ähnlich dem innerHTML, gibt allerdings den Text zurück
                    nicht das html tag
                  */
    const winner = document.querySelector('.winner');
    const computerLose = document.querySelector('.computer_hand');
    const computerWin = document.querySelector('.computer_hand');
    const tieComputer = document.querySelector('.computer_hand');
    const playerLose = document.querySelector('.player_hand');
    const playerWin = document.querySelector('.player_hand');
    const tiePlayer = document.querySelector('.player_hand');

    //check for TIE
    if (playerChoice === computerChoice) {
      winner.textContent = "IT'S A DRAW";
      tiePlayer.classList.add('tiePlayer');
      tieComputer.classList.add('tieComputer');
      return;
    }
    //check for Rock
    if (playerChoice === 'ROCK') {
      if (computerChoice === 'SCISSORS') {
        winner.textContent = "YOU WIN";
        computerLose.classList.add('computerLose');
        playerWin.classList.add('playerWin');
        //increment the pScore
        pScore++;
        //call the function to update
        updateScore();

        return;
      } else {
        winner.textContent = "COMPUTER WIN";
        playerLose.classList.add('playerLose');
        computerWin.classList.add('computerWin');
        //increment the cScore
        cScore++;
        //call the function to update
        updateScore();
        return;
      }
    }
    //check for PAPER
    if (playerChoice === 'PAPER') {
      if (computerChoice === 'ROCK') {
        winner.textContent = "YOU WIN";
        computerLose.classList.add('computerLose');
        playerWin.classList.add('playerWin');
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "COMPUTER WIN";
        playerLose.classList.add('playerLose');
        computerWin.classList.add('computerWin');
        cScore++;
        updateScore();
        return;
      }
    }
    //check for SCISSORS
    if (playerChoice === 'SCISSORS') {
      if (computerChoice === 'PAPER') {
        winner.textContent = "YOU WIN";
        computerLose.classList.add('computerLose');
        playerWin.classList.add('playerWin');
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "COMPUTER WIN";
        playerLose.classList.add('playerLose');
        computerWin.classList.add('computerWin');
        cScore++;
        updateScore();
        return;
      }
    }
  }

  //call all the inner functions
  startGame();
  playMatch();
};

//call the game function
game();