'use strict';
let money=1000;
let income="инвестиции";
let addExpenses="ЖКХ, налоги, транспорт";
let deposit=true;
let mission=500000;
let period=12;

function getExpensesMonth(){//#1
    let sum=0;
    let args=arguments[0];
	for (var i = 0; i < args.length; i++) {
		sum+=Number(args[i]);
    }
	return sum;
}

function getAccumulatedMonth(money, exp){//#2 
	return money-getExpensesMonth(exp);
}

let showTypeOf = function(data){
	console.log(data, typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLocaleLowerCase().split(', '));

money=prompt("Ваш месячный доход?","70000");
addExpenses=prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "ЖКХ, налоги, транспорт");
deposit=confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов?(1)","Машина");
let amount1 = prompt("Ваш месячный доход?(1)","20000");
let expenses2 = prompt("Введите обязательную статью расходов?(2)","Продукты");
let amount2 = prompt("Ваш месячный доход?(2)","10000");

let accumulatedMonth = getAccumulatedMonth(money, [amount1, amount2]);//#3

function getTargetMonth(money, mission){//#4
	return Math.ceil(mission/money);
}

let budgetDay = Math.floor(accumulatedMonth / 30);//#6

console.log('Расходы за месяц', getExpensesMonth([amount1, amount2]));

console.log('Срок достижения цели', getTargetMonth(accumulatedMonth,mission));

console.log("Бюджет на день:",budgetDay);


let getStatusIncome=function(){
	if(budgetDay>=1200){
		return "У вас высокий уровень дохода";
	}else if(budgetDay>=600 && budgetDay<1200){
		return "У вас средний уровень дохода";
	}else if(budgetDay>=0 && budgetDay<600){
		return "К сожалению у вас уровень дохода ниже среднего";
	}else{
		return "Что то пошло не так";
	}
};

console.log(getStatusIncome());
