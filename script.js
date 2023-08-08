document.addEventListener("DOMContentLoaded", function () {

    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.querySelector(".box ul");

    // Retrieve tasks from local storage (if available)
    let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to update tasks array and local storage
    function updateTasks() {
        // Update tasks on the webpage
        taskList.innerHTML = tasksArray.map(task => `
            <li>
                <div class="taskText ${task.done ? 'done' : ''}">${task.text}</div>
                <div class="buttons">
                    <button class="taskDone">✔</button>
                    <button class="taskDel">❌</button>
                </div>
            </li>
        `).join('');

        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    taskList.addEventListener("click", function (event) {
        const clickedElement = event.target;

        if (clickedElement.classList.contains("taskDone")) {
            const taskItem = clickedElement.closest("li");
            const index = Array.from(taskList.children).indexOf(taskItem);
            tasksArray[index].done = !tasksArray[index].done; // Toggle done status
            updateTasks();
        } else if (clickedElement.classList.contains("taskDel")) {
            const taskItem = clickedElement.closest("li");
            const index = Array.from(taskList.children).indexOf(taskItem);
            tasksArray.splice(index, 1);
            updateTasks();
        }
    });

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            tasksArray.push({ text: taskText, done: false }); // Add task with done status
            updateTasks();
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    // Initial rendering of tasks
    updateTasks();
});
