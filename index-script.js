//Your Age in Days

function generateDays(){
    let birthYear=prompt('What year were you born in?');
    if(birthYear!=null){
    let days=(2021-birthYear)*365;
    let textanswer= document.createElement('h2');
    textanswer.setAttribute('id','ageindays')
    let answer=document.createTextNode('Your age in days is: '+days+' days');
    textanswer.appendChild(answer);
    document.getElementById('result-box-1').appendChild(textanswer);
    }
}

function resetAge(){
    document.getElementById('ageindays').remove();
}

//Cat Generator

function generateCat(){
    let catImage= document.createElement('img');
    catImage.setAttribute('id','cat-image');
    let container= document.getElementById('result-box-2');
    catImage.src="https://source.unsplash.com/1600x900/?cat,pet";
    container.appendChild(catImage);
}

function resetCat(){
    document.getElementById('cat-image').remove();
}

//Rock, Paper, Scissors

function rpsGame(choice){
    var humanChoice,botChoice;
    humanChoice= choice.id;
    botChoice= chooseRandom();
    result=decideWinner(humanChoice,botChoice);
    message=finalMessage(result);
    displayResult(humanChoice,botChoice,message);
}

function chooseRandom(){
    let num=Math.floor((Math.random())*3);
    return ['rock','paper','scissor'][num];
}

function decideWinner(humanChoice,botChoice){
    let rpsDatabase={
        'rock': {'scissor':1,'rock':0.5,'paper':0},
        'paper': {'rock':1,'paper':0.5,'scissor':0},
        'scissor':{'paper':1,'scissor':0.5,'rock':0}
    }
    var humanScore=rpsDatabase[humanChoice][botChoice];
    var botScore=rpsDatabase[botChoice][humanChoice];
    return [humanScore,botScore];
}

function finalMessage([humanScore,botScore]){
    if(humanScore===0){
        return {'message': 'You lost!', 'color': 'red'}
    }else if(humanScore===1){
        return {'message': 'You win!', 'color': 'blue'}
    }else{
        return {'message': 'Its a tie.', 'color': 'yellow'}
    }
}

function displayResult(humanChoice,botChoice,message){
    var imageDatabase={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv= document.createElement('div');
    var messageDiv= document.createElement('div');
    var botDiv= document.createElement('div');

    humanDiv.innerHTML= "<img src='"+ imageDatabase[humanChoice] + "' height=100px width=100px style='box-shadow: 0 0 25px rgb(75, 170, 255);'>";
    messageDiv.innerHTML= "<h1 style='color:" + message.color + ";'>" + message.message + "</h1>";
    botDiv.innerHTML= "<img src='"+ imageDatabase[botChoice] + "' height=100px width=100px style='box-shadow: 0 0 25px rgb(255,0,20);'>";

    console.log(humanDiv);

    document.getElementById("result-box-3").appendChild(humanDiv);
    document.getElementById("result-box-3").appendChild(messageDiv);
    document.getElementById("result-box-3").appendChild(botDiv);
}

//Change color of all Buttons

var allButtons= document.getElementsByTagName('button');
var allButtonsCopy=[];

for(let i=0; i<allButtons.length ; i++){
    allButtonsCopy[i]=allButtons[i].classList[1];
}

function colorChange(color){
    if(color.value === 'red'){
        colorChangeRed();
    }else if(color.value === 'blue'){
        colorChangeBlue();
    }else if(color.value === 'random'){
        colorChangeRandom();
    }else if(color.value === 'reset'){
        colorChangeReset();
    }
}

function colorChangeBlue(){
    for(let i=0; i<allButtons.length ; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('bluebtn');
    }
}

function colorChangeRed(){
    for(let i=0; i<allButtons.length ; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('redbtn');
    }
}

function colorChangeRandom(){
    let buttonColorDatabase=['bluebtn','redbtn','greenbtn','yellowbtn']
    for(let i=0; i<allButtons.length; i++){
        let randomNumber=Math.floor(Math.random()*4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(buttonColorDatabase[randomNumber]);
    }
}

function colorChangeReset(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(allButtonsCopy[i]);
    }
}

//Blackjack: Lets Play!

const blackjackDatabase={
    player: {scorespan:'player-score', div:'player-area', score:0},
    dealer: {scorespan:'dealer-score', div:'dealer-area', score:0},
    cardmap: {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':1},
    wins:0,loss:0,draws:0,
};
const cardSound=new Audio('swish.m4a');
const winSound=new Audio('cash.mp3');
const loseSound=new Audio('aww.mp3');
let isHit=true,isStand=false,isDeal=false;


//Part 1: 'Hitting' a card
document.querySelector('#blackjackHit').addEventListener('click',hitCard);

function hitCard(){
    if(isHit===true){
    let card=randomCard();
    showCard(card,blackjackDatabase.player);
    updateScore(card,blackjackDatabase.player);
    isStand=true;
    }
}

function randomCard(){
    let cards=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    let randomCard=Math.floor(Math.random()*13);
    return cards[randomCard];
}

function showCard(card,cardSide){
    if(cardSide.score<=21){
    let cardImage= document.createElement('img');
    cardImage.src= `${card}.png`;
    document.getElementById(cardSide.div).appendChild(cardImage);
    cardSound.play();
    }
}

function updateScore(card,cardSide){
    if(card==='A'){
        if(cardSide.score + 11 <= 21){
            cardSide.score+= 11;
        }else{
            cardSide.score+= 1;
        }
    }else{
        cardSide.score+= blackjackDatabase.cardmap[card]; 
    }
    document.getElementById(cardSide.scorespan).textContent= cardSide.score;
 
 if(cardSide.score>21){
    document.getElementById(cardSide.scorespan).textContent= 'BUST';
    document.getElementById(cardSide.scorespan).style.color= 'red';
 }
}

//Part 2: 'Dealing' a Game
document.querySelector('#blackjackDeal').addEventListener('click',dealGame)

function dealGame(){
    if(isDeal===true){
        let allImages=document.querySelector('.blackjack-playing-area').querySelectorAll('img');
        for(let i=0; i<allImages.length; i++){
            allImages[i].remove();
        }
        blackjackDatabase.player.score=0;
        blackjackDatabase.dealer.score=0;
        document.getElementById(blackjackDatabase.player.scorespan).textContent=0;
        document.getElementById(blackjackDatabase.dealer.scorespan).textContent=0;
        document.getElementById(blackjackDatabase.player.scorespan).style.color='white';
        document.getElementById(blackjackDatabase.dealer.scorespan).style.color='white';
        document.querySelector('#blackjack-result').textContent="Let's Play!";
        document.querySelector('#blackjack-result').style.color="black";
        isHit=true;
    }
}

//Part 3: 'Standing' for the bot
document.querySelector('#blackjackStand').addEventListener('click',botLogic);

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function botLogic(){
    if(isStand===true){
        isHit=false;
        while(blackjackDatabase.dealer.score<16){
        let card=randomCard();
        showCard(card,blackjackDatabase.dealer);
        updateScore(card,blackjackDatabase.dealer);
        await sleep(1000);
        }

        if(blackjackDatabase.dealer.score>15){
            isDeal=true;
            declareMessage();
            isStand=false;
        }
    }
}

//Deciding winner and declaring message
function computeWinner(){
    let winner;
    let blackjackPlayerScore=blackjackDatabase.player.score;
    let blackjackDealerScore=blackjackDatabase.dealer.score;

    if(blackjackPlayerScore<=21 && blackjackDealerScore<=21){
        if(blackjackPlayerScore>blackjackDealerScore){
            blackjackDatabase.wins++;
            document.querySelector('#blackjackWins').textContent=blackjackDatabase.wins;
            winner='player';
        }else if(blackjackDealerScore>blackjackPlayerScore){
            blackjackDatabase.loss++;
            document.querySelector('#blackjackLoss').textContent=blackjackDatabase.loss;
            winner='dealer';
        }else if(blackjackPlayerScore===blackjackDealerScore){
            blackjackDatabase.draws++;
            document.querySelector('#blackjackDraws').textContent=blackjackDatabase.draws;
            winner='none';
        }
    }else if(blackjackPlayerScore>21){
        if(blackjackDealerScore<=21){
            blackjackDatabase.loss++;
            document.querySelector('#blackjackLoss').textContent=blackjackDatabase.loss;
            winner='dealer';
        }else if(blackjackDealerScore>21){
            blackjackDatabase.draws++;
            document.querySelector('#blackjackDraws').textContent=blackjackDatabase.draws;
            winner='none';
        }
    }else if(blackjackDealerScore>21){
       if(blackjackPlayerScore<=21){
           blackjackDatabase.wins++;
           document.querySelector('#blackjackWins').textContent=blackjackDatabase.wins;
           winner='player';
       }
    }
    return winner;
}

function declareMessage(){
    let blackjackWinner=computeWinner();
    let message,messagecolor;
    
    if(blackjackWinner==='player'){
        message='You win!';
        messagecolor='rgb(75, 170, 255)'
        winSound.play();
    }else if(blackjackWinner==='dealer'){
        message='You lost!'
        messagecolor='rgb(255,0,20)'
        loseSound.play();
    }else if(blackjackWinner==='none'){
        message='Its a draw!';
        messagecolor='rgb(255, 251, 0)';
    }

    document.querySelector('#blackjack-result').textContent=message;
    document.querySelector('#blackjack-result').style.color=messagecolor;
}