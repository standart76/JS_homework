'use strict';

const getRandom = () => {
	return  Math.floor(Math.random() * 101);
};

const isNumber = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const game = () => {
	const numberPC = getRandom();
	let count = 10;
	console.log(numberPC);
	return function play(){
		console.log('count =', count);
		if(count < 1){
			return confirm("Попытки закончились, хотите сыграть еще?") ? game()() : '';
		}
		let numberUser = prompt('Угадай число от 1 до 100');
		console.log('number=',numberUser);
		if(numberUser === null){
			alert('Игра окончена');
			return;
		}
		if(!isNumber(numberUser)){
			alert('Введи число!');
			return play();
		}
		if(numberUser > numberPC){
			count--;
			alert('Загаданное число меньше, осталось попыток ' + count);
			return play();
		}
		if(numberUser < numberPC){
			count--;
			alert('Загаданное число больше, осталось попыток ' + count);
			return play();
		}
		return confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?') ? game()() : '';
	};
};

const game1 = game();

game1();