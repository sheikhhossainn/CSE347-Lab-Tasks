// Task management
let tasks = [];
let taskIdCounter = 0;
let currentFilter = 'all'; // Track current filter

// Add new task function
function addTask(taskText) {
    if (taskText.trim() === '') return;
    
    const task = {
        id: ++taskIdCounter,
        text: taskText.trim(),
        completed: false
    };
    
    tasks.push(task);
    updateTaskList();
    updateFilterButtonCounts();
    updateClearButton();
}

// Update filter button counts
function updateFilterButtonCounts() {
    const allCount = tasks.length;
    const activeCount = tasks.filter(task => !task.completed).length;
    const completedCount = tasks.filter(task => task.completed).length;
    
    const filterButtons = document.querySelectorAll('.task-filter button');
    filterButtons[0].textContent = `All (${allCount})`;
    filterButtons[1].textContent = `Active (${activeCount})`;
    filterButtons[2].textContent = `Completed (${completedCount})`;
}

// Update task list display
function updateTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    // Filter tasks based on current filter
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
            <span class="task-text ${task.completed ? 'completed' : ''}" id="task-text-${task.id}" onclick="editTask(${task.id})">${task.text}</span>
            <input type="text" class="task-edit-input" id="task-edit-${task.id}" value="${task.text}" style="display: none;" onblur="saveTask(${task.id})" onkeypress="handleEditKeypress(event, ${task.id})">
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        updateTaskList();
        updateFilterButtonCounts();
        updateClearButton();
    }
}

// Edit task
function editTask(id) {
    const taskText = document.getElementById(`task-text-${id}`);
    const taskInput = document.getElementById(`task-edit-${id}`);
    
    // Hide text, show input
    taskText.style.display = 'none';
    taskInput.style.display = 'block';
    taskInput.focus();
    taskInput.select();
}

// Save task after editing
function saveTask(id) {
    const taskText = document.getElementById(`task-text-${id}`);
    const taskInput = document.getElementById(`task-edit-${id}`);
    const newText = taskInput.value.trim();
    
    if (newText !== '') {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.text = newText;
            taskText.textContent = newText;
        }
    } else {
        // Restore original text if empty
        const task = tasks.find(t => t.id === id);
        if (task) {
            taskInput.value = task.text;
        }
    }
    
    // Show text, hide input
    taskText.style.display = 'block';
    taskInput.style.display = 'none';
}

// Handle keypress in edit input
function handleEditKeypress(event, id) {
    if (event.key === 'Enter') {
        saveTask(id);
    } else if (event.key === 'Escape') {
        // Cancel edit - restore original text
        const task = tasks.find(t => t.id === id);
        const taskInput = document.getElementById(`task-edit-${id}`);
        if (task) {
            taskInput.value = task.text;
        }
        saveTask(id);
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateTaskList();
    updateFilterButtonCounts();
    updateClearButton();
}

// Clear all tasks
function clearAllTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        tasks = [];
        updateTaskList();
        updateFilterButtonCounts();
        updateClearButton();
    }
}

// Update clear button state
function updateClearButton() {
    const clearButton = document.getElementById('clear-tasks-btn');
    if (clearButton) {
        clearButton.disabled = tasks.length === 0;
        clearButton.textContent = 'Clear Tasks';
    }
}

// Filter tasks by type
function filterTasks(filterType) {
    currentFilter = filterType;
    
    // Update active filter button
    document.querySelectorAll('.task-filter button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    const filterButtons = document.querySelectorAll('.task-filter button');
    if (filterType === 'all') {
        filterButtons[0].classList.add('active');
    } else if (filterType === 'active') {
        filterButtons[1].classList.add('active');
    } else if (filterType === 'completed') {
        filterButtons[2].classList.add('active');
    }
    
    // Update task display
    updateTaskList();
}

document.addEventListener('DOMContentLoaded', () => {
    const taskFilterButtons = document.querySelectorAll('.task-filter button');
    
    taskFilterButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const filterTypes = ['all', 'active', 'completed'];
            filterTasks(filterTypes[index]);
        });
    });

    // Make "Active" filter active by default
    filterTasks('active');
    
    // Handle form submission
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page refresh
        const taskText = taskInput.value;
        addTask(taskText);
        taskInput.value = ''; // Clear input
        taskInput.focus(); // Keep focus on input
    });
    
    // Handle clear button click
    const clearButton = document.getElementById('clear-tasks-btn');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            clearAllTasks();
        });
    }
    
    // Initialize clear button
    updateClearButton();
    
    // Initialize filter button counts
    updateFilterButtonCounts();
});
