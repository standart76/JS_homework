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
    inputListStr = document.querySelectorAll('input[placeholder="Наименование"]'),
    inputListNum = document.querySelectorAll('input[placeholder="Сумма"]'),
    inputListData,
    resetBtn = document.getElementById('cancel');

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
            inputListData = document.querySelector('.data').querySelectorAll('input[type=text]');
            inputListData.forEach(item=>{
                item.readOnly = true;
            });
            startBtn.style.display = 'none';
            resetBtn.style.display = 'block';
            depositCheck.readOnly = true;
        },
        reset: function(){
            inputListData.forEach(item=>{
                item.readOnly = false;
                item.value = '';
            });
            expensesItems.forEach(function(item,index){
                if(index!==0){
                    item.remove();
                }
            });
            expensesPlus.style.display = 'block';
            incomeItems.forEach(function(item,index){
                if(index!==0){
                    item.remove();
                }
            });
            incomePlus.style.display = 'block';
            startBtn.style.display = 'block';
            resetBtn.style.display = 'none';
            appData.income = {};
            appData.addExpenses = [];
            appData.addIncome = [];
            appData.incomeMonth = 0;
            appData.expenses = {};
            appData.deposit = false;
            appData.budget = 0;
            appData.budgetDay = 0;
            appData.budgetMonth = 0;
            appData.expensesMonth = 0;
            appData.percentDeposite = 0;
            appData.moneyDeposit = 0;
            budgetMonthValue.value = '';
            budgetDayValue.value = '';
            expensesMonthValue.value = '';
            additionalExpensesValue.value = '';
            additionalIncomeValue.value = '';
            targetMonthValue.value = '';
            incomePeriodValue.value = '';
            periodSelect.value = 1;
            periodAmount.textContent = 1;
            depositCheck.checked = false;
            depositCheck.readOnly = false;

        },
        showResult: function(){
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = this.calcSavedMoney();
            periodSelect.addEventListener('input', function(){
                incomePeriodValue.value = appData.calcSavedMoney();
            });
        },
        addExpensesBlock: function(){
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.querySelector('.expenses-title').value = '';
            cloneExpensesItem.querySelector('.expenses-title').addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/[^А-Яа-я\s,.;:-]/gi,'');
            });
            cloneExpensesItem.querySelector('.expenses-amount').value = '';
            cloneExpensesItem.querySelector('.expenses-amount').addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/gi,'');
            });
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3){
                expensesPlus.style.display = 'none';
            }
        },
        addIncomeBlock: function(){
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.querySelector('.income-amount').value = '';
            cloneIncomeItem.querySelector('.income-amount').addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/\D/gi,'');
            });
            cloneIncomeItem.querySelector('.income-title').value = '';
            cloneIncomeItem.querySelector('.income-title').addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/[^А-Яа-я\s,.;:-]/gi,'');
            });
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3){
                incomePlus.style.display = 'none';
            }
        },
        getExpenses: function(){
            let _this = this;
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    _this.expenses[itemExpenses] = cashExpenses;
                }
            });
        },
        getIncome: function(){
            let _this = this;
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    _this.income[itemIncome] = cashIncome;
                    _this.incomeMonth += +cashIncome; 
                }
            });
        },
        getAddExpenses: function(){
            let _this = this;
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if(item !== ''){
                    _this.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function(){
            let _this = this;
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    _this.addIncome.push(itemValue);
                }
            });
        },
        getExpensesMonth: function (){
            for (let key in appData.expenses){
                this.expensesMonth += +this.expenses[key];
            }
        },
        getBudget: function (){ 
            this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        },
        getTargetMonth: function (){
            return Math.ceil(targetAmount.value / this.budgetMonth);
        },
        calcSavedMoney: function(){
            return this.budgetMonth * periodSelect.value;
        }
    };

    startBtn.addEventListener('mouseover', ()=>{
        if(salaryAmount.value === ''){
            startBtn.removeEventListener('click', appData.start);
        } else {
            startBtn.addEventListener('click', appData.start);
        }
    });
    resetBtn.addEventListener('click', appData.reset);

    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);

    periodSelect.addEventListener('input', function(){
        periodAmount.textContent = periodSelect.value;
    });

    inputListStr.forEach((item)=>{
        item.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^А-Яа-я\s,.;:-]/gi,'');
        });
    });
    inputListNum.forEach((item)=>{
        item.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/gi,'');
        });
    });

  