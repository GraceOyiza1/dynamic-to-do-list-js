// script.js

// ------------------------------------------
// Part 1: Setup Event Listener and Select Elements
// ------------------------------------------

// Ensures script runs only after the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM Elements: MUST be done inside DOMContentLoaded to ensure they exist
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ------------------------------------------
    // Part 2: Task Addition and Removal Logic (The addTask Function)
    // ------------------------------------------

    function addTask() {

        // 1. Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // 2. Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // --- Task Creation and Removal Logic ---

        // Create a new li element. Set its textContent to taskText.
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a new button element for removing the task. 
        const removeBtn = document.createElement('button');

        // Set its textContent to "Remove"
        removeBtn.textContent = "Remove";

        // Give it a class name of 'remove-btn'
        removeBtn.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeBtn.onclick = function () {
            // Removes the li element from taskList
            taskList.removeChild(listItem);
        };

        // Append the remove button to the li element
        listItem.appendChild(removeBtn);

        // Append the li to taskList
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = "";
    }


    // ------------------------------------------
    // Part 3: Attach Event Listeners
    // ------------------------------------------

    // Add an event listener to addButton that calls addTask when clicked.
    addButton.addEventListener('click', addTask);

    // Add an event listener to taskInput for the 'keypress' event (Enter key)
    taskInput.addEventListener('keypress', function (event) {
        // Check if event.key is equal to 'Enter' before calling addTask
        if (event.key === 'Enter') {
            addTask();
        }
    });
}); // End of DOMContentLoaded