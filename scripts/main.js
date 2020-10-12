let money=1000; 
let income="инвестиции";
let addExpenses="ЖКХ, налоги, транспорт";
let deposit=true;
let mission=500000;
let period=12;

console.log(money,income,deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей.`);

addExpenses = addExpenses.toLocaleLowerCase().split(', ');
console.log(addExpenses);

let budgetDay = money / 30;
console.log(budgetDay);