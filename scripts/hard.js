'use strict';

const str = prompt('Введите строку!!!','Какой-то произвольный текст большого размера');

const checkStr = function(a){
    if(!isNaN(a)){
        alert('Вы ввели не строку!');
    }
    a = a.trim();
    if(a.length > 30){
        console.log(a.slice(0,30)+'...');
    }else{
        console.log(a);
    }
};
checkStr(str);