'use strict';

const getTimeOfDay = function(hours){
    if(hours >= 4 && hours < 12){
        return 'Доброе утро';
    }else if(hours >= 12 && hours < 17){
        return 'Добрый день';
    }else if(hours >= 17 && hours < 23){
        return 'Добрый вечер';
    }else{
        return 'Доброй ночи';
    }
};

const getDaysToNewYear = function(today){
    const newYear = new Date('01-01-'+(today.getFullYear()+1));
    return Math.ceil(Math.abs(newYear.getTime() - today.getTime()) / (1000 * 3600 * 24));
};

const getDayOfWeek = function(day){
    const arrWeek = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    return arrWeek[day];
}
const getDates = function(today){

    return `${getTimeOfDay(today.getHours)}
Сегодня: ${getDayOfWeek(today.getDay())}
Текущее время: ${today.toLocaleTimeString('en-US')}
До нового года осталось ${getDaysToNewYear(today)} дней`;
};

console.log(getDates(new Date()));//текущая дата
//console.log(getDates(new Date('06-01-2021'))); //проверка универсальности функции