/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Furry = function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
};

var Coin = function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};

var Game = function Game() {
    var _this = this;

    this.board = document.querySelectorAll('section#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + y * 10;
    };
    this.showFurry = function () {
        _this.hideFurry();
        _this.board[_this.index(_this.furry.x, _this.furry.y)].classList.add('furry');
    };
    this.hideFurry = function () {
        var furry = document.querySelector('.furry');
        if (furry !== null) {
            furry.classList.remove('furry');
        }
    };
    this.showCoin = function () {
        _this.board[_this.index(_this.coin.x, _this.coin.y)].classList.add('coin');
    };

    this.furryMove = function () {
        if (_this.furry.direction === 'right') {
            _this.furry.x += 1;
        } else if (_this.furry.direction === 'left') {
            _this.furry.x -= 1;
        } else if (_this.furry.direction === 'up') {
            _this.furry.y -= 1;
        } else if (_this.furry.direction === 'down') {
            _this.furry.y += 1;
        }
        _this.gameOver();
        _this.checkCoinCollision();
        _this.showFurry();
    };
    this.furryTurn = function (event) {
        switch (event.which) {
            case 37:
                _this.furry.direction = 'left';
                break;
            case 38:
                _this.furry.direction = 'up';
                break;
            case 39:
                _this.furry.direction = 'right';
                break;
            case 40:
                _this.furry.direction = 'down';
                break;
        }
    };
    this.checkCoinCollision = function () {
        if (_this.furry.x === _this.coin.x && _this.furry.y === _this.coin.y) {
            document.getElementById('pTaken').play();
            _this.board[_this.index(_this.coin.x, _this.coin.y)].classList.remove('coin');
            _this.score += 1;
            var scoreEl = document.querySelector('#score strong');
            scoreEl.innerText = _this.score;
            _this.coin = new Coin();
            _this.showCoin();
        }
    };
    this.gameOver = function () {
        if (_this.furry.x < 0 || _this.furry.x > 9 || _this.furry.y < 0 || _this.furry.y > 9) {
            document.getElementById('gOver').play();
            _this.furry.x = 1;
            _this.furry.y = 1;
            _this.board[_this.index(_this.furry.x, _this.furry.y)].classList.add('invisible');
            clearInterval(_this.idSetInterval);
            document.getElementById("over").classList.remove("invisible");
            document.querySelector("#over strong").innerText = _this.score.toString();
        }
    };
    this.startGame = function () {
        _this.idSetInterval = setInterval(function () {
            _this.furryMove();
        }, 250);
    };
};

var play = new Game();
play.showCoin();
play.startGame();
document.addEventListener("keydown", function (event) {
    play.furryTurn(event);
});

/***/ })
/******/ ]);