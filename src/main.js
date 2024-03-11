let taskDetail = [
  {
    taskName: "Walk the dog",
    priority: "low",
    status: "Done",
    deadline: "1402-12-21",
  },
];

const btnAdd = document.getElementById("addTask");

btnAdd.addEventListener("click", () => createTask(taskDetail[0]));

function createTask(task) {
  const table = document.getElementById("taskName");
  const row = document.createElement("tr");
  table.append(row);
  const taskName = document.createElement("td");
  taskName.innerText = task.taskName;
  const priority = document.createElement("td");
  priority.innerText = task.priority;
  const status = document.createElement("td");
  status.innerText = task.status;
  const date = document.createElement("td");
  date.innerText = task.deadline;
  row.append(taskName, priority, status, date);
}

const btnNewTask = document.getElementById("read-task");

btnNewTask.addEventListener("click", () => readTasks());

async function readTasks() {
  const taskList = await fetch("http://localhost:2314/tasks").then((data) =>
    data.json()
  );
  for (let task of taskList) {
    createTask(task);
  }
}
