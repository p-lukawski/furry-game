
let Furry = function () {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
};

let Coin = function () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};

let Game = function () {
    this.board = document.querySelectorAll('section#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = (x,y) => {
        return x + (y * 10);
    };
    this.showFurry = () => {
        this.hideFurry();
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    };
    this.hideFurry = () => {
        let furry = document.querySelector('.furry');
        if(furry !== null){
            furry.classList.remove('furry');
        }
    };
    this.showCoin = () => {
        this.board[ this.index(this.coin.x, this.coin.y) ].classList.add('coin');
    };

    this.furryMove = () => {
        if(this.furry.direction === 'right'){
            this.furry.x += 1;
        }else if(this.furry.direction === 'left'){
            this.furry.x -= 1;
        }else if(this.furry.direction === 'up'){
            this.furry.y -=1;
        }else if(this.furry.direction === 'down'){
            this.furry.y +=1;
        }
        this.gameOver();
        this.checkCoinCollision();
        this.showFurry();
    };
    this.furryTurn = event => {
        switch (event.which){
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };
    this.checkCoinCollision = () => {
        if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
            this.board[this.index(this.coin.x,this.coin.y)].classList.remove('coin');
            this.score += 1;
            let scoreEl = document.querySelector('#score strong');
            scoreEl.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = () => {
      if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){
          clearInterval(this.idSetInterval);
          this.hideFurry();
          document.getElementById("over").classList.remove("invisible");
          document.querySelector("#over strong").innerText = (this.score).toString();
      }
    };
    this.startGame = () => {
        this.idSetInterval = setInterval(() =>{
            this.furryMove();
        },250);
    }



};

let play = new Game();
play.showCoin();
play.startGame();
document.addEventListener("keydown", (event) => {
    play.furryTurn(event);
});