document.todo = {
    tasks: [],

    // Dodajemy zadanie do listy
    addTask: function(taskText, dueDate) {
        if (taskText.length >= 3 && taskText.length <= 255) {
            let task = {
                text: taskText,
                date: dueDate ? this.formatDate(dueDate) : undefined // Formatujemy datę
            };
            this.tasks.push(task);
            this.saveTasks();
            this.draw();
        } else {
            alert('Zadanie musi mieć od 3 do 255 znaków.');
        }
    },

    // Funkcja formatowania daty na dd-mm-rrrr
    formatDate: function(dateString) {
        let date = new Date(dateString);
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiące są liczone od 0
        let year = date.getFullYear();
        return `${day}-${month}-${year}`;
    },

    // Wyświetlanie listy zadań
    draw: function() {
        let todoList = document.getElementById('todo-list');
        todoList.innerHTML = ''; // Czyścimy listę

        this.tasks.forEach((task, index) => {
            let taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerText = task.text;

            // Dodajemy datę, jeśli istnieje
            if (task.date) {
                let date = document.createElement('span');
                date.classList.add('task-date');
                date.innerText = ` ${task.date}`;
                taskItem.appendChild(date);
            }

            // Dodajemy przycisk usuwania
            let deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '&#128686';
            deleteBtn.addEventListener('click', () => {
                this.deleteTask(index);
            });
            taskItem.appendChild(deleteBtn);

            // Funkcja do edycji zadania po kliknięciu
            taskItem.addEventListener('click', () => {
                this.editTask(taskItem, task, index);
            });

            todoList.appendChild(taskItem);
        });
    },

    // Funkcja edycji zadania
    editTask: function(taskItem, task, index) {
        let input = document.createElement('input');
        input.type = 'text';
        input.value = task.text;
        taskItem.innerHTML = ''; // Usuwamy stary tekst
        taskItem.appendChild(input);

        input.addEventListener('blur', () => {
            task.text = input.value; // Zmieniamy treść zadania
            this.saveTasks();
            this.draw();
        });
    },

    // Usuwanie zadania
    deleteTask: function(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        document.getElementById('search').value = ''; // Reset wyszukiwania
        this.draw();
    },

    // Zapisywanie zadań do LocalStorage
    saveTasks: function() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    // Ładowanie zadań z LocalStorage
    loadTasks: function() {
        let savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            this.tasks = savedTasks;
            this.draw();
        }
    }
};

// Obsługa dodawania zadań
// Obsługa dodawania zadań
document.getElementById('add-task').addEventListener('click', function() {
    let taskText = document.getElementById('add').value;
    let dueDate = document.getElementById('due-date').value;

    document.todo.addTask(taskText, dueDate);

    // Resetowanie pól po dodaniu zadania
    document.getElementById('add').value = '';
    document.getElementById('due-date').value = '';
});


// Obsługa wyszukiwania
document.getElementById('search').addEventListener('input', function() {
    let searchText = this.value.toLowerCase();
    document.todo.tasks.forEach((task, index) => {
        let taskItem = document.getElementsByClassName('task-item')[index];

        if (task.text.toLowerCase().includes(searchText)) {
            taskItem.style.display = 'block';
            taskItem.innerHTML = task.text.replace(new RegExp(searchText, 'gi'), (match) => {
                return `<span class="highlight">${match}</span>`;
            });

            // Dodanie przycisku usuwania po wyszukiwaniu
            let deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Usuń';
            deleteBtn.addEventListener('click', () => {
                document.todo.deleteTask(index);
            });
            taskItem.appendChild(deleteBtn);

        } else {
            taskItem.style.display = 'none'; // Ukrywamy niepasujące zadania
        }
    });
});

// Wczytujemy zadania przy załadowaniu strony
document.todo.loadTasks();
