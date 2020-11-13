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
    inputListStr = document.querySelectorAll('input[placeholder="Наименование"'),
    inputListNum = document.querySelectorAll('input[placeholder="Сумма"'),
    inputListData,
    resetBtn = document.getElementById('cancel');
   
    const AppData = function(){
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
    };



    const appData = new AppData();

  