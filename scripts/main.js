'use strict';

let numberPC = Math.floor(Math.random() * 100);
console.log(numberPC);
let numberUser = 0;

let isNumber = function(n){
	return !isNaN(n) && isFinite(n);
};

	

let start = function(){
	
	numberUser = prompt('Угадай число от 1 до 100');
	if(numberUser === null){//отмена ввода
		alert('Игра окончена');
		return '';
	}
	if(!isNumber(numberUser)){//проверка ввода на формат числа
		alert('Введи число!');
		return start();
	}
	if(numberUser > numberPC){
		alert('Загаданное число меньше');
		return start();
	}
	if(numberUser < numberPC){
		alert('Загаданное число больше');
		return start();
	}
	return alert('Поздравляю, Вы угадали!!!');
};

start();