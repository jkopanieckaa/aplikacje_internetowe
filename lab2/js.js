class TodoApp {
    constructor() {
        this.tasks = [];
        this.loadTasks();
        this.initEventListeners();
    }

    addTask(taskText, dueDate) {
        if (!this.isValidTaskText(taskText)) return alert('Zadanie musi mieć od 3 do 255 znaków.');

        const task = {
            text: taskText,
            date: dueDate ? this.formatDate(dueDate) : undefined,
        };

        this.tasks.push(task);
        this.updateView();
    }

    isValidTaskText(taskText) {
        return taskText.length >= 3 && taskText.length <= 255;
    }

    formatDate(dateString) {
        const [day, month, year] = new Date(dateString).toLocaleDateString('pl-PL').split('.');
        return `${day}-${month}-${year}`;
    }

    updateView(filteredTasks = null) {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';

        const tasksToDisplay = filteredTasks || this.tasks;

        tasksToDisplay.forEach((task, index) => {
            todoList.appendChild(this.createTaskElement(task, index));
        });
        this.saveTasks();
    }

    createTaskElement(task, index) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        const taskText = document.createElement('span');
        taskText.classList.add('task-item-text');
        taskText.innerHTML = this.highlightText(task.text, document.getElementById('search').value.toLowerCase());
        taskItem.appendChild(taskText);

        if (task.date) {
            const dateElement = document.createElement('span');
            dateElement.classList.add('task-date');
            dateElement.innerText = ` ${task.date}`;
            taskItem.appendChild(dateElement);
        }

        const deleteBtn = this.createDeleteButton(index);
        taskItem.appendChild(deleteBtn);

        taskItem.addEventListener('dblclick', () => this.editTask(taskItem, task, index));
        return taskItem;
    }

    createDeleteButton(index) {
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&#128686;';
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            this.deleteTask(index);
        });
        return deleteBtn;
    }

    editTask(taskItem, task, index) {
        const inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.value = task.text;

        const inputDate = document.createElement('input');
        inputDate.type = 'date';
        inputDate.value = task.date ? new Date(task.date.split('-').reverse().join('-')).toISOString().split('T')[0] : ''; // Formatowanie daty na `YYYY-MM-DD`

        taskItem.innerHTML = '';
        taskItem.appendChild(inputText);
        taskItem.appendChild(inputDate);

        inputText.addEventListener('blur', () => {
            task.text = inputText.value;
            task.date = inputDate.value ? this.formatDate(inputDate.value) : undefined;
            this.updateView();
        });

        inputDate.addEventListener('blur', () => {
            task.text = inputText.value;
            task.date = inputDate.value ? this.formatDate(inputDate.value) : undefined;
            this.updateView();
        });
    }


    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.updateView();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) this.tasks = savedTasks;
        this.updateView();
    }

    initEventListeners() {
        document.getElementById('add-task').addEventListener('click', () => {
            const taskText = document.getElementById('add').value;
            const dueDate = document.getElementById('due-date').value;
            this.addTask(taskText, dueDate);

            document.getElementById('add').value = '';
            document.getElementById('due-date').value = '';
        });

        document.getElementById('search').addEventListener('input', (event) => {
            const searchText = event.target.value.toLowerCase();
            this.searchTasks(searchText);
        });
    }

    searchTasks(searchText) {
        const filteredTasks = this.tasks.filter((task) =>
            task.text.toLowerCase().includes(searchText)
        );
        this.updateView(filteredTasks);
    }

    highlightText(text, searchText) {
        if (!searchText) return text;
        const regex = new RegExp(`(${searchText})`, 'gi');
        return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    }
}

document.addEventListener('DOMContentLoaded', () => new TodoApp());
