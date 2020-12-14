'use strict';

const week = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
const today = new Date();
const text = document.querySelector('.days');
let param;
week.forEach((day, index) => {
	param = day;
	if(index === 0 || index === 6){
		param = `<em>${param}</em>`;
	}
	if(index === today.getDay()){
		param = `<b>${param}</b>`;
	}
	text.innerHTML += param + '<br>';
});