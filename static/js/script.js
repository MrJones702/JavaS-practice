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
