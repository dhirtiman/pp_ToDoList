document.addEventListener("DOMContentLoaded", function () {


    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.querySelector(".box ul");


    taskList.addEventListener("click", function (event) {
        const clickedElement = event.target;

        if (clickedElement.classList.contains("taskDone")) {

            const taskDiv = clickedElement.closest("li").querySelector(".taskText");
            taskDiv.classList.toggle("done");

        } else if (clickedElement.classList.contains("taskDel")) {

            const taskItem = clickedElement.closest("li");
            taskList.removeChild(taskItem);
        }


    });



    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const newTask = document.createElement("li");

            newTask.innerHTML = `
            <div class = "taskText">${taskText}</div>
            <div class="buttons">
                            <button class="taskDone">✔</button>
                            <button class="taskDel">❌</button>
            </div>
           
            `;

            taskList.appendChild(newTask);
            taskInput.value = "";
        }

    });


    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

});