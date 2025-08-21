const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const counter = document.getElementById("counter");
const progressFill = document.querySelector(".progress-fill");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = "";
  const completedCount = tasks.filter(t => t.completed).length;

  tasks.forEach((task, idx) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    // checkbox
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = task.completed;
    cb.addEventListener("change", () => {
      tasks[idx].completed = cb.checked;
      renderTasks();
    });

    // text
    const text = document.createElement("div");
    text.className = "txt";
    text.textContent = task.text;

    // actions
    const actions = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.className = "action-btn edit";
    editBtn.innerHTML = "✎";
    editBtn.title = "Edit";
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        tasks[idx].text = newText.trim();
        renderTasks();
      }
    });

    const delBtn = document.createElement("button");
    delBtn.className = "action-btn del";
    delBtn.innerHTML = "🗑";
    delBtn.title = "Delete";
    delBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(idx, 1);
        renderTasks();
      }
    });

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(cb);
    li.appendChild(text);
    li.appendChild(actions);
    taskList.appendChild(li);
  });

  // counter update
  counter.textContent = `${completedCount} / ${tasks.length}`;

  // progress update
  const percent = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;
  progressFill.style.width = `${percent}%`;
}

// Add on click or Enter
addBtn.addEventListener("click", () => {
  const val = taskInput.value.trim();
  if (val) {
    tasks.push({ text: val, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

renderTasks();
