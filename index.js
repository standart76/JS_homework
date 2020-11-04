'use strict';

let startBtn = document.getElementById('start'),
    incomePlus = document.getElementsByTagName("button")[0],
    expensesPlus = document.getElementsByTagName("button")[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    budgetMonthValue = document.querySelector('.budget_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    additionalIncomeItem1 = document.querySelectorAll('.budget_month-value')[0],
    additionalIncomeItem2 = document.querySelectorAll('.budget_month-value')[1],
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    inputListStr = document.querySelectorAll('input[placeholder="Наименование"'),//#2
    inputListNum = document.querySelectorAll('input[placeholder="Сумма"');//#3

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

    let appData = {
        income:{},
        addExpenses: [],
        addIncome: [],
        incomeMonth: 0,
        expenses: {},
        deposit: false,
        budget : 0,
        budgetDay: 0,
        budgetMonth : 0,
        expensesMonth: 0,
        percentDeposite: 0,
        moneyDeposit: 0,
        start: function(){
            appData.budget = +salaryAmount.value;
            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
           
            appData.getAddExpenses();
            appData.getAddIncome();
            
            appData.getBudget();
            appData.showResult();
        },
        showResult: function(){
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = appData.getTargetMonth();
            incomePeriodValue.value = appData.calcSavedMoney();
            periodSelect.addEventListener('input', function(){
                incomePeriodValue.value = appData.calcSavedMoney();
            });
        },
        addExpensesBlock: function(){
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.querySelector('.expenses-title').value = '';//#1
            cloneExpensesItem.querySelector('.expenses-amount').value = '';//#1
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3){
                expensesPlus.style.display = 'none';
            }
        },
        addIncomeBlock: function(){
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.querySelector('.income-amount').value = '';//#1
            cloneIncomeItem.querySelector('.income-title').value = '';//#1
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3){
                incomePlus.style.display = 'none';
            }
        },
        getExpenses: function(){
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },
        getIncome: function(){
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    appData.income[itemIncome] = cashIncome;
                    appData.incomeMonth += +cashIncome; 
                }
            });
        },
        getAddExpenses: function(){
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if(item !== ''){
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function(){
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
            });
        },
        getExpensesMonth: function (){
            for (let key in appData.expenses){
                appData.expensesMonth += +appData.expenses[key];
            }
        },
        getBudget: function (){ 
            appData.budgetMonth = +appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },
        getTargetMonth: function (){
            return Math.ceil(targetAmount.value / appData.budgetMonth);
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
            return appData.budgetMonth * periodSelect.value;
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

    startBtn.addEventListener('mouseover', ()=>{
        if(salaryAmount.value === ''){
            startBtn.removeEventListener('click', appData.start);
        } else {
            startBtn.addEventListener('click', appData.start);
        }
    });

    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);

    periodSelect.addEventListener('input', function(){
        periodAmount.textContent = periodSelect.value;
    });

    inputListStr.forEach((item)=>{//#2
        item.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^А-Яа-я\s,.;:-]/gi,'');
        });
    });
    inputListNum.forEach((item)=>{//#3
        item.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/gi,'');
        });
    });
