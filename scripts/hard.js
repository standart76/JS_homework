'use strict';

const lang = ['en', 'ru'];
const daysArr = [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']];
const daysObj = {
    'en': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    'ru': ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
};
let userLang = prompt('Введите нужную локализацию локализацию(en/ru)','ru');
//#1
console.log('a. условный оператор');
if(userLang === 'en'){
    console.log(daysArr[0]);
}else if(userLang === 'ru'){
    console.log(daysArr[1]);
}else{
    console.log('ошибка при вводе языка');
}

console.log('b. конструкция "switch"');
switch(userLang){
    case 'en': 
        console.log(daysArr[0]); 
        break;
    case 'ru': 
        console.log(daysArr[1]); 
        break;
    default: 
        console.log('ошибка при вводе языка');
}

console.log('c. многомерный массив');
console.log(daysObj[userLang]);

//#2
const namePerson = prompt('Введите свое имя');
namePerson === 'Артем' ? 
    console.log('Директор') : 
    namePerson === 'Максим' ? console.log('Преподаватель') : console.log('Студент');