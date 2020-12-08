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
    depositBank = document.querySelector('.deposit-bank'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    inputListStr = document.querySelectorAll('input[placeholder="Наименование"'),
    inputListNum = document.querySelectorAll('input[placeholder="Сумма"'),
    inputListData,
    resetBtn = document.getElementById('cancel');

    class AppData{
            constructor(){
                this.income = {};
                this.addExpenses = [];
                this.addIncome = [];
                this.incomeMonth = 0;
                this.expenses = {};
                this.deposit = false;
                this.budget = 0;
                this.budgetDay = 0;
                this.budgetMonth = 0;
                this.expensesMonth = 0;
                this.percentDeposite = 0;
                this.moneyDeposit = 0;
        }
        start(){
            if(salaryAmount.value === ''){
                startBtn.setAttribute('disabled','true');
                return;
            }
            //this.checkDepositPercent();
            this.budget = +salaryAmount.value;
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getInfoDeposit();
            this.getBudget();
            this.showResult();
            inputListData = document.querySelector('.data').querySelectorAll('input[type=text]');
            inputListData.forEach(item=>{
                item.readOnly = true;
            });
            startBtn.style.display = 'none';
            resetBtn.style.display = 'block';
            depositCheck.readOnly = true;
        }
        reset(){
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
            this.income = {};
            this.addExpenses = [];
            this.addIncome = [];
            this.incomeMonth = 0;
            this.expenses = {};
            this.deposit = false;
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.expensesMonth = 0;
            this.percentDeposite = 0;
            this.moneyDeposit = 0;
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
        }

        showResult(){
            const _this = this;
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = this.calcSavedMoney();
            periodSelect.addEventListener('input', function(){
                incomePeriodValue.value = _this.calcSavedMoney();
            });
        }
        addExpensesBlock(){
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
        }
        addIncomeBlock(){
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
        }
        getExpenses(){
            const _this = this;
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    _this.income[itemIncome] = cashIncome;
                    _this.incomeMonth += +cashIncome; 
                }
            });
        }
        getIncome(){
            const _this = this;
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    _this.income[itemIncome] = cashIncome;
                    _this.incomeMonth += +cashIncome; 
                }
            });
        }

        getAddExpenses(){
            const _this = this;
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if(item !== ''){
                    _this.addExpenses.push(item);
                }
            });
        }
        getAddIncome(){
            const _this = this;
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    _this.addIncome.push(itemValue);
                }
            });
        }
        getExpensesMonth(){
            for (let key in this.expenses){
                this.expensesMonth += +this.expenses[key];
            }
        }
        getBudget(){
            const monthDeposit = this.moneyDeposit * (this.percentDeposite / 100);
            this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        }
       getTargetMonth(){
            return Math.ceil(targetAmount.value / this.budgetMonth);
        }
        calcSavedMoney(){
            return this.budgetMonth * periodSelect.value;
        }
        checkDepositPercent(){
            if(isNaN(depositPercent.value) || +depositPercent.value < 0 || +depositPercent.value > 100){
                alert('Введите корректное значение в поле проценты');
                startBtn.setAttribute('disabled','true');
            }else{
                startBtn.removeAttribute('disabled');
            }
        }
        changePercent(){
            const valueSelect = this.value;
            if(valueSelect === 'other'){
                depositPercent.style.display = 'inline-block';
            }else{
                depositPercent.style.display = 'none';
                depositPercent.value = valueSelect;
            }
        }
        getInfoDeposit(){
            if(this.deposit){
                this.percentDeposite = depositPercent.value;
                this.moneyDeposit = depositAmount.value;
            }
        }
        depositHandler(){
            if(depositCheck.checked){
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                
                this.deposit = true;
                depositBank.addEventListener('change',this.changePercent);
                
            }else{  
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositPercent.style.display = 'none';
                depositBank.value = '';
                depositAmount.value = '';
                depositPercent.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change',this.changePercent);
            }
        }
        eventsListeners(){
            startBtn.addEventListener('click', this.start.bind(this));
  
            resetBtn.addEventListener('click', this.reset);
        
            expensesPlus.addEventListener('click', this.addExpensesBlock);
            incomePlus.addEventListener('click', this.addIncomeBlock);
        
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

            depositCheck.addEventListener('change', this.depositHandler.bind(this));
            depositPercent.addEventListener('input',this.checkDepositPercent.bind(this));
        }
    }

    const appData = new AppData();
    appData.eventsListeners();