'use strict';
let money=1000;
let income="инвестиции";
let addExpenses="ЖКХ, налоги, транспорт";
let deposit=true;
let mission=500000;
let period=12;

console.log(typeof money,typeof income,typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей.`);

addExpenses = addExpenses.toLocaleLowerCase().split(', ');
console.log(addExpenses);

let budgetDay = money / 30;
console.log(budgetDay);

//lesson03
money=prompt("Ваш месячный доход?","70000");//#2
addExpenses=prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "ЖКХ, налоги, транспорт");//#3
deposit=confirm("Есть ли у вас депозит в банке?");//#4

let expenses1 = prompt("Введите обязательную статью расходов?(1)","Машина");//#5
let amount1 = prompt("Ваш месячный доход?(1)","20000");
let expenses2 = prompt("Введите обязательную статью расходов?(2)","Продукты");
let amount2 = prompt("Ваш месячный доход?(2)","10000");

let budgetMonth = money-amount1-amount2;//#6
console.log("Бюджет на месяц:",budgetMonth);

console.log("Цель будет достигнута за",Math.ceil(mission/budgetMonth), "месяцев");//#7
budgetDay = Math.floor(budgetMonth / 30);//#8
console.log("Бюджет на день:",budgetDay, "месяцев");

if(budgetDay>=1200){//#9
	console.log("У вас высокий уровень дохода");
}else if(budgetDay>=600 && budgetDay<1200){
	console.log("У вас средний уровень дохода");
}else if(budgetDay>=0 && budgetDay<600){
	console.log("К сожалению у вас уровень дохода ниже среднего");
}else{
	console.log("Что то пошло не так");
}
