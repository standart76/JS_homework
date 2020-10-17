'use strict';

let isNumber = function(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
};
let money, start = function(){
	do{
		money = prompt("Ваш месячный доход?");
	}while(!isNumber(money));
};
start();

let appData = {
	income:{},
	addExpenses: [],
	expenses: {},
	deposit: false,
	mission: 500000,
	period: 3,
	budget : money,
	budgetDay: 0,
	budgetMonth : 0,
	expensesMonth: 0,
	asking: function(){
		let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", 
			"ЖКХ, налоги, транспорт");
		appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ');
		appData.deposit = confirm("Есть ли у вас депозит в банке?");
		for (let i = 0; i < 2; i++) {
			let expName,expPrice;
			expName= prompt("Введите обязательную статью расходов?");
			do{
				expPrice = prompt("Во сколько это обойдется?");
			}while(!isNumber(expPrice));
			appData.expenses[expName] = expPrice;
		}
	},
	getExpensesMonth: function (){
		for (let key in appData.expenses){
			appData.expensesMonth += +appData.expenses[key];
		}
	},
	getBudget: function (){ 
		appData.budgetMonth = +appData.budget-appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},
	getTargetMonth: function (){
		return Math.ceil(appData.mission / appData.budgetMonth);
	},
	getStatusIncome: function(){
		if(appData.budget >= 1200){
			return "У вас высокий уровень дохода";
		}else if(appData.budget >= 600 && appData.budget < 1200){
			return "У вас средний уровень дохода";
		}else if(appData.budget >= 0 && appData.budget < 600){
			return "К сожалению у вас уровень дохода ниже среднего";
		}else{
			return "Что то пошло не так";
		}
	}
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц', appData.budgetMonth);

if(appData.getTargetMonth() > 0){
	console.log('Срок достижения цели', appData.getTargetMonth()); 
} else { 
	console.log('Цель не будет достигнута');
}
appData.getStatusIncome();

for(let key in appData){
	console.log(appData[key]);
}