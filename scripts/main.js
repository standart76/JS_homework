'use strict';

let getRandom = function(){
	return  Math.floor(Math.random() * 101);
};

let isNumber = function(n){
	return !isNaN(n) && isFinite(n);
};

let game = function(){
	let numberPC = getRandom();
	return function play(){
		let numberUser = prompt('Угадай число от 1 до 100');
		if(numberUser === null){//отмена ввода
			alert('Игра окончена');
			return '';
		}
		if(!isNumber(numberUser)){//проверка ввода на формат числа
			alert('Введи число!');
			return play();
		}
		if(numberUser > numberPC){
			alert('Загаданное число меньше');
			return play();
		}
		if(numberUser < numberPC){
			alert('Загаданное число больше');
			return play();
		}
		return alert('Поздравляю, Вы угадали!!!');
	};
};

let game1 = game();

game1();