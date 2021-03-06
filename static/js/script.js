//Challenge 1: Age in Days

function ageInDays() {
    let birthyear = prompt('What year were you born?');
    let daysOld = (2021 - birthyear) * 365;
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are ' + daysOld + ' days old.');
    h1.setAttribute('id', 'daysOld');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function resetButton() {
    document.getElementById('daysOld').remove();
}

//Challange 2: Recruit Soldier

function recruitSoldier(){
    let image = document.createElement('img');
    let div = document.getElementById('flex-soldier');
    image.src= "/Users/mojo/Desktop/clever projects/JS_weeks_CC/static/images/soldier.jpeg";
    div.appendChild(image);
}

// Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice) {
    console.log(yourChoice);
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numToChoice(randToRpsInt());

    console.log('Computer Choice:', botChoice);
    results = decideWinner(humanChoice, botChoice); //[0,1] human lost | bot won
    console.log(results);

    message = finalMessage(results);  //{'message': 'You won!', 'color': 'green'} 
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
return Math.floor(Math.random() *3);
}

function numToChoice(number) {
return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
let rpsDatabase = {
    'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
    'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
    'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
};

let yourScore = rpsDatabase[yourChoice][computerChoice];
let computerScore = rpsDatabase[computerChoice][yourChoice];

return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore ===0) {
    return{'message': 'You Lost!', 'color': 'red'};
    } else if (yourScore === 0.5) {
    return{'message': 'Tie Game!', 'color': 'yellow'};
    } else {
    return{'message': 'You Won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImgChoice, botImgChoice, finalMessage){
    let imgDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }

    //lets remove all images once choice is made so that we may replace it later on.
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv =  document.createElement('div');
    let botDiv =  document.createElement('div');
    let messageDiv =  document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imgDatabase[humanImgChoice] + "' height=200 width=200 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    messageDiv.innerHTML ="<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "<h1>"
    botDiv.innerHTML ="<img src='" + imgDatabase[botImgChoice] + "' height=200 width=200 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//Challenge 4: Change the Color of All Buttons

let allButtons= document.getElementsByTagName('button');

let copyAllButtons = [];
for (let i= 0; i<allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);
}

function buttonColorChange(buttonThingy){
    if (buttonThingy.value === 'red'){
        buttonsRed();
    } else if (buttonThingy.value === 'black'){
        buttonsBlack();
    } else if (buttonThingy.value=== 'reset'){
        buttonsReset();
    } else if (buttonThingy.value=== 'random'){
        buttonsRandom();
    }
}

function buttonsRed(){
    for (let i=0; i< allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonsBlack(){
    for (let i=0; i< allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-dark');
    }
}

function buttonsReset(){
    for (let i=0; i< allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom(){
    let choices=['btn-primary', 'btn-danger', 'btn-secondary', 'btn-dark'];

    for (i=0; i< allButtons.length; i++){
        let randomNum= Math.floor(Math.random()* 3)
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNum]);
    }
}
//Challenge 4: Change the Color of All Buttons

//Challenge 5: BlackJack 21

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false, 
};

const You= blackjackGame['you'];
const Dealer= blackjackGame['dealer'];

const hitSound= new Audio('static/sounds/swish.m4a');
const winSound= new Audio('static/sounds/cash.mp3');
const lossSound= new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
    if (blackjackGame['isStand'] === false){
        let card = randomCard();
        console.log(card);
        showCard(card, You);
        updateScore(card, You);
        showScore(You);
    } else {
        alert("Your turn is over once you hit 'stand'");
    }
    blackjackGame['turnsOver'] = false;
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()* 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21) {
        let cardImg= document.createElement('img');
        cardImg.src= `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImg);
        hitSound.play();
    }
}

function blackjackDeal(){
    // showResult(computeWinner()); doesn't belong here unless u want to play 2 player will need to put this somewhere else otherwise
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        for (i=0; i< yourImages.length; i++) {
            yourImages[i].remove();
        }
        
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (i=0; i< dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        You['score'] = 0;
        Dealer['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';
        blackjackGame['turnsOver'] = true;
    } else {
        alert('There must be a Winner. Please proceed...');
    }
} 

function updateScore(card, activePlayer){
    if (card === 'A'){ 
    //if adding 11 keeps me <= 21, add 11. Otherwise, add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <=21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }

    } else {
        activePlayer['score'] += blackjackGame['cardsMap'] [card];
    }
}
function showScore(activePlayer){
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    // } else(activePlayer['score'] = 21){
    //     document.querySelector(activePlayer['scoreSpan']).textContent = 'BlackJack';
    //     document.querySelector(activePlayer['scoreSpan']).style.color = 'green';
    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand(){
    blackjackGame['isStand'] = true;

    while(Dealer['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, Dealer);
        updateScore(card, Dealer); 
        showScore(Dealer);
        await sleep(1500);
    }
   
    blackjackGame['turnsOver'] = true; 
    let winner = computeWinner();
    showResult(winner);
}

//compute winner and return who just won the game
//update the wins, draws, and losses
function computeWinner(){
    let winner;

    if (You['score'] <= 21 ){
        
        if (You['score'] > Dealer['score'] || (Dealer['score'] > 21)) {
            blackjackGame['wins']++;
            winner= You;

        } else if (You['score'] < Dealer['score']) {
            blackjackGame['losses']++;
            winner= Dealer;

        } else if (You['score'] === Dealer['score']) {
            blackjackGame['draws']++;
            console.log("It's a Draw");
        }
    } else if (You['score'] > 21 && Dealer['score'] <= 21 ) {
        blackjackGame['losses']++;
        winner= Dealer;

    } else if (You['score'] > 21 && Dealer['score'] > 21) {
        blackjackGame['draws']++;
    }
    
    console.log('Winner is ', winner);
    console.log(blackjackGame);
    return winner;
}

function showResult(winner){
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true){
        if (winner === You) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message= 'You Won!';
            messageColor= "green";
            winSound.play();
        } else if (winner === Dealer) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = "red";
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = "It's a Tie"
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}
// Challenge 5: BlackJack 21
