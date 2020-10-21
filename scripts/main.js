'use strict';

const isNumber = function(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
};

/*	функция проверки ввода данных по типу
task - вопрос для модального окна, typeData - тип данных(строка='str' или число='num')*/
const checkDataInput = function (task, typeData){
	let result;
	switch(typeData){
		case 'str':{
			do{
				result = prompt(task);
			}while(isNumber(result) || result === '');
			break;
		}
		case 'num':{
			do{
				result = prompt(task);
			}while(!isNumber(result) || result === '');
			break;
		}
	}
	return result;
};

let money, start = function(){
	money = checkDataInput('Ваш месячный доход?','num');
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
	percentDeposite: 0,
	moneyDeposit: 0,
	asking: function(){
		if(confirm('Есть ли у вас дополнительный заработок?')){
			let itemIncome = checkDataInput('Какой у вас дополнительный заработок?','str');
			let cashIncome = checkDataInput('Сколько в месяц вы на этом зарабатываете?','num');
			appData.income[itemIncome] = cashIncome;
		}
		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
			'ЖКХ, налоги, транспорт');
		appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		for (let i = 0; i < 2; i++) {
			let expPrice;
			let expName= checkDataInput('Введите обязательную статью расходов?','str');
			expPrice = checkDataInput('Во сколько это обойдется?','num');
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
			return 'У вас высокий уровень дохода';
		}else if(appData.budget >= 600 && appData.budget < 1200){
			return 'У вас средний уровень дохода';
		}else if(appData.budget >= 0 && appData.budget < 600){
			return 'К сожалению у вас уровень дохода ниже среднего';
		}else{
			return 'Что то пошло не так';
		}
	},
	gedInfoDeposit: function(){
		if(appData.deposit){
			appData.percentDeposite = checkDataInput('Какой годовой процент?','num');
			appData.moneyDeposit = checkDataInput('Какая сумма заложена?','num');
		}
	},
	calcSavedMoney: function(){
		return appData.budgetMonth * appData.period;
	},
	writeAddExpenses: function(){
		let res='';
		for(let i = 0; i < appData.addExpenses.length; i++){
			if(i!==appData.addExpenses.length-1){
				res+=appData.addExpenses[i].charAt(0).toUpperCase()+appData.addExpenses[i].slice(1)+', ';
			}else{
				res+=appData.addExpenses[i].charAt(0).toUpperCase()+appData.addExpenses[i].slice(1);
			}
		}
		console.log(res);
	}
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.writeAddExpenses();

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