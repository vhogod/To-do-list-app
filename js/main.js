'use strict'

const TaskForm = document.getElementById('task-form'),
    TaskInput = document.getElementById('task-input'),
    TaskCount = document.getElementById('task-count'),
    TaskList = document.getElementById('task-list'),
    ClearAllButton = document.getElementById('clear-all-btn');

let tasks = [];

function loadTasks() {
    const saveTasks = localStorage.getItem('myTasks');
    if (saveTasks) {
        tasks = JSON.parse(saveTasks);
    }
    displayTasks();
}

function saveTasks() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    displayTasks();
}


function addTasks(taskText) {
    const newTask = {
        id: Date.now(),
        text: taskText,
        date: new Date().toLocaleDateString()
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();
}


function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    displayTasks();
}

function clearAllTasks() {
    if (tasks.length === 0) {
        alert("No Tasks To Clear"); return;
    }
    if (confirm('Delete All Tasks ?')) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
}

function displayTasks() {
    TaskCount.textContent = tasks.length;

    if (tasks.length === 0) {
        TaskList.innerHTML = ` <div class="no-tasks">No tasks yet! Add one above </div>`;
        return;
    }

    TaskList.innerHTML = tasks.map
        (
            task =>
                `
        <li class="task-item">
                <div class="task-text">
                    ${task.text}
                </div>
                <button class="btn btn-delete" onclick="deleteTask(${task.id})">🗑 Delete</button>
        </li>
        `
        ).join("");
}

TaskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskText = TaskInput.value.trim();
    if (taskText !== "") {
        addTasks(taskText);
        TaskInput.value = "";
    }
});

ClearAllButton.addEventListener('click', clearAllTasks);

// Initial load
loadTasks();
