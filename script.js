// script.js (Updated for Local Storage)

// Define elements globally within the DOMContentLoaded scope for use in all functions
let taskInput;
let taskList;

// ------------------------------------------
// Part 1: Task Addition and Removal Logic (Modified to handle 'save')
// ------------------------------------------

// Adjust `addTask` to optionally save tasks to Local Storage to avoid duplication when loading
function addTask(taskText, save = true) {

    // Check if taskText is empty (only needed when called from user input, but good practice)
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // --- Task Creation ---

    // Create a new li element
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // Create the Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-btn');

    // Assign an onclick event to handle removal from DOM and Local Storage
    removeBtn.onclick = function () {
        // Remove from DOM
        taskList.removeChild(listItem);

        // Remove from Local Storage
        removeTaskFromStorage(taskText);
    };

    // Append the remove button to the li element
    listItem.appendChild(removeBtn);

    // Append the li to taskList
    taskList.appendChild(listItem);

    // 8. Update Local Storage if the task is a new user-added task
    if (save) {
        saveTaskToStorage(taskText);
        // Only clear input if it was a user action (i.e., save is true)
        taskInput.value = "";
    }
}


// ------------------------------------------
// Part 2: Local Storage Handlers
// ------------------------------------------

// Function to save a new task to Local Storage
function saveTaskToStorage(taskText) {
    // Retrieve existing tasks or an empty array if none exist
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Add the new task
    storedTasks.push(taskText);

    // Save the updated array back to Local Storage
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

// Function to remove a task from Local Storage
function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Filter the array to exclude the task that was removed
    storedTasks = storedTasks.filter(task => task !== taskText);

    // Save the new array back to Local Storage
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

// Function to load tasks from Local Storage when the page loads
function loadTasks() {
    // Retrieve tasks and parse JSON, defaulting to an empty array
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Loop through stored tasks and add them to the DOM
    storedTasks.forEach(taskText => {
        // Call addTask with save=false to avoid resaving the existing task
        addTask(taskText, false);
    });
}


// ------------------------------------------
// Part 3: Initialization (DOMContentLoaded)
// ------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

    // Select DOM Elements (assign to the global variables defined at the top)
    const addButton = document.getElementById('add-task-btn');
    taskInput = document.getElementById('task-input');
    taskList = document.getElementById('task-list'); // Assigns to the global variable

    // 1. Load existing tasks from Local Storage before setting up listeners
    loadTasks();

    // Attach Event Listeners to the button and input field

    // Listener for button click (calls addTask, which defaults to save=true)
    addButton.addEventListener('click', function () {
        addTask(taskInput.value.trim());
    });

    // Listener for 'keypress' event (Enter key)
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });
});