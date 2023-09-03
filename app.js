const inputBox = document.getElementById("add-task-input");
const addButton = document.querySelector(".add-task-button");
const todoList = document.querySelector(".todo-list");
let time = document.getElementById("current-time");
const filterOption = document.querySelector(".filter-todo");

setInterval(() => {
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString();
}, 1000);

filterOption.addEventListener("click", filter);


inputBox.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTask();
    }
});

todoList.addEventListener('click', deleteCheck);


function addTask() {
    if (inputBox.value === "") {
        return;
    }
    else {
        // Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = inputBox.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Checkmark Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // Trash Button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append to List
        todoList.appendChild(todoDiv);

    
    }
    inputBox.value = "";
    filter();
    saveData();
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === 'trash-btn')
    {
        item.parentElement.remove();
        saveData();
    }

    if (item.classList[0] === 'complete-btn') {
        item.parentElement.classList.toggle("completed");
        filter();
        saveData();
    }
}

function filter(e) {
    const todos = todoList.querySelectorAll('.todo');

    todos.forEach(function(todo) {
        switch(filterOption.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveData() {
    localStorage.setItem("data", todoList.innerHTML);
}

function showTasks() {
    todoList.innerHTML = localStorage.getItem("data");
}

showTasks();



