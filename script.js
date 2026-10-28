function changeTheme() {
    document.body.classList.toggle("light");
    let button = document.getElementById("themeButton");
    if (document.body.classList.contains("light")) {
        button.innerHTML = "🌙";
    } else {
        button.innerHTML = "🌞";
    }
}

// add a New Task
function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please write your task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    // create new list item
    let li = document.createElement("li");

    // create task text
    let span = document.createElement("span");
    span.textContent = taskText;

    // mark task as completed
    span.onclick = function() {
        li.classList.toggle("done");
        updateCounter();
    };

    // Delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "❌";
    deleteButton.style.background = "none";
    deleteButton.style.border = "none";
    deleteButton.style.cursor = "pointer";
    deleteButton.onclick = function() {
        li.remove();
        updateCounter();
    };

    // add text and delete button to list item
    li.appendChild(span);
    li.appendChild(deleteButton);

    // add task to list
    taskList.appendChild(li);

    // clear input
    input.value = "";

    // Update numbers
    updateCounter();
}

// update task counter and bar
function updateCounter() {
    let tasks = document.querySelectorAll("#taskList li");
    let completed = document.querySelectorAll("#taskList li.done");
    
    let total = tasks.length;
    let done = completed.length;
    
    document.getElementById("counter").innerHTML = done + " / " + total;
    
    let percentage = 0;
    if (total > 0) {
        percentage = (done / total) * 100;
    }
    document.getElementById("progressFill").style.width = percentage + "%";
}

// enter key to add a task
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
