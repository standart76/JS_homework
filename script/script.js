'use strict';

const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('todoDataArray')) || [];//#7

const saveToDo=()=>{
    localStorage.setItem('todoDataArray',JSON.stringify(todoData));
};

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item, index){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
        </div>`;

        if(item.completed){//#2
            todoCompleted.append(li);
        }else{
            todoList.append(li);
        }


        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
        const btnTodoDelete = li.querySelector('.todo-remove');//#5
        btnTodoDelete.addEventListener('click', function(){
            todoData.splice(index, 1);
            render();
        });
        saveToDo();//#8
    });
};

todoControl.addEventListener('submit', function(event){//#1
    event.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    if(newTodo.value){//#3
        todoData.push(newTodo);
    }
    headerInput.value = '';//#4
    render();
});



render();