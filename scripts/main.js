var money=1000; 
var income="инвестиции";
var addExpenses="ЖКХ, налоги, транспорт";
var deposit=true;
var mission=500000;
var period=12;

console.log(money,income,deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей.`);

addExpenses = addExpenses.toLocaleLowerCase().split(', ');
console.log(addExpenses);

var budgetDay = money / 30;
console.log(budgetDay);