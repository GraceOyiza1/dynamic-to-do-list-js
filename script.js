// script.js

// ------------------------------------------
// Part 1: Function Definitions
// ------------------------------------------

function addTask() {
    // 1. Retrieve and trim the value from the task input field
    const taskText = taskInput.value.trim();

    // 2. Check if taskText is not empty
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // --- Task Creation ---

    // 3. Create a new <li> element
    const listItem = document.createElement('li');
    // Set its textContent to the taskText
    listItem.textContent = taskText;

    // 4. Create the Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    // Give it the specified class name
    removeBtn.className = 'remove-btn';

    // 5. Assign an onclick event to the remove button
    removeBtn.onclick = function () {
        // When clicked, remove the parent <li> element from the <ul>
        taskList.removeChild(listItem);
    };

    // 6. Append the remove button to the <li> element
    listItem.appendChild(removeBtn);

    // 7. Append the new <li> (containing the task and the button) to the <ul>
    taskList.appendChild(listItem);

    // 8. Clear the task input field
    taskInput.value = "";
}


// ------------------------------------------
// Part 2: Setup Event Listener and Select Elements
// ------------------------------------------

// 1. Setup Event Listener for Page Load: Ensures script runs after HTML loads
document.addEventListener('DOMContentLoaded', function () {

    // 2. Select DOM Elements (defined globally inside this function)
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 3. Attach Event Listeners to the button and input field

    // Listener for button click
    addButton.addEventListener('click', addTask);

    // Listener for 'keypress' event (Enter key)
    taskInput.addEventListener('keypress', function (event) {
        // Check if event.key is equal to 'Enter'
        if (event.key === 'Enter') {
            addTask();
        }
    });
});