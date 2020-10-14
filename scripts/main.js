'use strict';

let isNumber = function(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
	income = "инвестиции",
	addExpenses = "ЖКХ, налоги, транспорт",
	deposit = true,
	mission = 500000,
	period = 12;


let start = function(){
	do{ //#1
		money = prompt("Ваш месячный доход?");
	}while(!isNumber(money));
};
start();

let expenses = [];
let getExpensesMonth = function (){
    let sum = 0, price = 0;
	for (var i = 0; i < 2; i++) {
		expenses[i] = prompt("Введите обязательную статью расходов?");
		do{ //#2
			price = prompt("Во сколько это обойдется?");
		}while(!isNumber(price));

		sum += +price;
	}
	console.log(expenses);
	return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function (money,expense){ 
	return money-expense;
};

let showTypeOf = function(data){
	console.log(data, typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

addExpenses=prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "ЖКХ, налоги, транспорт");
deposit=confirm("Есть ли у вас депозит в банке?");

console.log(addExpenses.toLocaleLowerCase().split(', '));

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

let getTargetMonth = function (money, mission){
	return Math.ceil(mission / money);
};

let budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Расходы за месяц', expensesAmount);

let monthProfit = getTargetMonth(accumulatedMonth, mission);
if(monthProfit > 0){ //#3
	console.log('Срок достижения цели', monthProfit); 
} else { 
	console.log('Цель не будет достигнута');
}

console.log("Бюджет на день:", budgetDay);


let getStatusIncome = function(money){
	if(money >= 1200){
		return "У вас высокий уровень дохода";
	}else if(money >= 600 && money < 1200){
		return "У вас средний уровень дохода";
	}else if(money >= 0 && money < 600){
		return "К сожалению у вас уровень дохода ниже среднего";
	}else{
		return "Что то пошло не так";
	}
};

console.log(getStatusIncome(budgetDay));
