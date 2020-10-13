'use strict';
let money=1000;
let income="инвестиции";
let addExpenses="ЖКХ, налоги, транспорт";
let deposit=true;
let mission=500000;
let period=12;

function getExpensesMonth(){//#1 функция без явных аргументов для универсальности
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

console.log(typeof money,typeof income,typeof deposit);


addExpenses = addExpenses.toLocaleLowerCase().split(', ');
console.log(addExpenses);

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

console.log('Срок достижения цели', getTargetMonth(money,mission));

console.log("Бюджет на день:",budgetDay);


/*
несяно где инфа об объявлении getStatusIncome, в какому уроке?
*/