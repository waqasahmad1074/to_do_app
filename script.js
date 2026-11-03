function changeTheme() {
    document.body.classList.toggle("dark");

    const themeIcon = document.getElementById("themeIcon");

    if (document.body.classList.contains("dark")) {
        themeIcon.src = "images/moon.png";
        themeIcon.alt = "Moon";
    } else {
        themeIcon.src = "images/sun.gif";
        themeIcon.alt = "Sun";
    }
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please write your task!");
        input.focus();
        return;
    }

    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskText;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Edit button
    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.textContent = "✎";
    editButton.title = "Edit task";
    editButton.setAttribute("aria-label", "Edit task");

    editButton.onclick = function () {
        const newText = prompt("Edit your task:", span.textContent);

        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
    };

    // Complete button
    const checkButton = document.createElement("button");
    checkButton.className = "check";
    checkButton.textContent = "✓";
    checkButton.title = "Complete task";
    checkButton.setAttribute("aria-label", "Complete task");

    checkButton.onclick = function () {
        if (!li.classList.contains("done")) {
            li.classList.add("done");
              blaskConfetti(); 
        } else {
            li.classList.remove("done");
        }

        updateCounter();
    };

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.title = "Delete task";
    deleteButton.setAttribute("aria-label", "Delete task");

    const deleteImage = document.createElement("img");
    deleteImage.src = "images/cross.png";
    deleteImage.alt = "Delete";

    deleteButton.appendChild(deleteImage);

    deleteButton.onclick = function () {
        li.remove();
        updateCounter();
    };

    actions.appendChild(editButton);
    actions.appendChild(checkButton);
    actions.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);

    input.value = "";
    input.focus();

    updateCounter();
}

function updateCounter() {
    const tasks = document.querySelectorAll("#taskList li");
    const completed = document.querySelectorAll("#taskList li.done");

    const total = tasks.length;
    const done = completed.length;

    document.getElementById("counter").textContent = done + " / " + total;

    const percentage = total > 0 ? (done / total) * 100 : 0;

    document.getElementById("progressFill").style.width = percentage + "%";
}

// Add a task by pressing Enter
document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// White fireworks animation
const blaskConfetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};