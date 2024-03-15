const addBtn = document.getElementById("addTask");
console.log(addBtn);
addBtn.addEventListener("click", viewModals);

function insertTaskToLocalStorage(task) {
  let taskListStr = localStorage.getItem("taskList");
  if (taskListStr == undefined) {
    let taskArray = [task];
    let taskArrayStr = JSON.stringify(taskArray);
    localStorage.setItem("taskList", taskArrayStr);
  } else {
    let parseData = JSON.parse(taskListStr);
    parseData.push(task);
    let taskArrayStr = JSON.stringify(parseData);
    localStorage.setItem("taskList", taskArrayStr);
  }
}

function viewModals() {
  const modal = document.getElementById("modal");
  modal.innerHTML = "";
  modal.style.position = "fixed";
  modal.style.zIndex = "1";
  const closeModalDiv = document.createElement("div");
  closeModalDiv.classList.add("flex", "justify-end", "px-3", "py-2");
  modal.append(closeModalDiv);
  const closeIcon = document.createElement("img");
  closeIcon.src = `./img/gg--close-r.svg`;
  closeIcon.addEventListener("click", () => closeModal());
  closeModalDiv.append(closeIcon);

  const modalContent = document.createElement("div");
  modalContent.classList.add("font-serif", "flex", "flex-col", "p-3");
  modal.append(modalContent);

  const form = document.createElement("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputTaskName = taskName.value;
    const inputPrority = prioritySelector.value;
    const inputSatus = statusSelector.value;
    const inputDeadline = deadline.value;
    const task = {
      id: Math.random().toString(10),
      taskName: inputTaskName,
      priority: inputPrority,
      status: inputSatus,
      deadline: inputDeadline,
    };
    insertTaskToLocalStorage(task);
    render();
  });

  modalContent.append(form);

  const divTask = document.createElement("div");
  const taskLable = document.createElement("label");
  taskLable.innerText = "Task Name: ";
  divTask.append(taskLable);
  const taskName = document.createElement("input");
  taskName.setAttribute("type", "text");
  taskName.setAttribute("id", "taskName");
  taskName.setAttribute("placeholder", "Name Task");
  taskName.classList.add(
    "px-4",
    "py-2",
    "mt-2",
    "text-gray-700",
    "border",
    "border-gray-300",
    "rounded-md"
  );
  divTask.append(taskName);

  const priorityDiv = document.createElement("div");
  const priorityLable = document.createElement("label");
  priorityLable.innerText = "Priority: ";
  const prioritySelector = document.createElement("select");
  priorityDiv.append(priorityLable, prioritySelector);
  prioritySelector.classList.add(
    "px-4",
    "py-3",
    "mt-2",
    "mx-6",
    "text-gray-700",
    "bg-white",
    "border",
    "border-gray-300",
    "rounded-md"
  );
  const optionSelect = document.createElement("option");
  optionSelect.value = "Select";
  optionSelect.textContent = "Select";
  const optionHigh = document.createElement("option");
  optionHigh.value = "High";
  optionHigh.textContent = "High";
  const optionMedium = document.createElement("option");
  optionMedium.value = "Medium";
  optionMedium.textContent = "Medium";
  const optionLow = document.createElement("option");
  optionLow.value = "Low";
  optionLow.textContent = "Low";
  prioritySelector.append(optionSelect, optionHigh, optionMedium, optionLow);

  const statusDiv = document.createElement("div");
  const statusLable = document.createElement("label");
  statusLable.innerText = "Status: ";
  const statusSelector = document.createElement("select");
  statusSelector.classList.add(
    "px-4",
    "py-2",
    "mt-2",
    "mx-8",
    "text-gray-700",
    "bg-white",
    "border",
    "border-gray-300",
    "rounded-md",
    "shadow-sm",
    "focus:outline-none",
    "focus:ring-indigo-500",
    "focus:border-indigo-500"
  );
  const optionSelectStatus = document.createElement("option");
  optionSelectStatus.value = "Select";
  optionSelectStatus.textContent = "Select";
  const optionToDo = document.createElement("option");
  optionToDo.value = "To Do";
  optionToDo.textContent = "To Do";
  const optionDoing = document.createElement("option");
  optionDoing.value = "Doing";
  optionDoing.textContent = "Doing";
  const optionDone = document.createElement("option");
  optionDone.value = "Done";
  optionDone.textContent = "Done";
  statusSelector.append(
    optionSelectStatus,
    optionToDo,
    optionDoing,
    optionDone
  );
  statusDiv.append(statusLable, statusSelector);

  const deadlineDiv = document.createElement("div");
  const deadlineLable = document.createElement("label");
  deadlineLable.innerText = "Deadline: ";
  const deadline = document.createElement("input");
  deadline.setAttribute("type", "date");
  deadline.setAttribute("id", "deadline");
  deadline.setAttribute("placeholder", "Deadline");
  deadline.classList.add(
    "px-4",
    "py-2",
    "mt-2",
    "mx-3",
    "text-gray-300",
    "bg-white",
    "border",
    "border-gray-300",
    "rounded-md"
  );
  deadlineDiv.append(deadlineLable, deadline);

  const btnDiv = document.createElement("div");
  const button = document.createElement("button");
  button.classList.add(
    "bg-blue-400",
    "w-full",
    "p-1",
    "shadow-md",
    "rounded-md",
    "mt-3"
  );
  button.setAttribute("type", "submit");
  button.textContent = `Submit`;
  btnDiv.append(button);

  form.append(divTask, priorityDiv, statusDiv, deadlineDiv, btnDiv);
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.innerHTML = "";
  modal.style.position = "";
  modal.style.zIndex = "-10";
}

function render() {
  const table = document.getElementById("render-data");
  let dataFromLocalStorage = localStorage.getItem("taskList");
  let parseData = JSON.parse(dataFromLocalStorage);
  table.innerHTML = "";
  parseData.map((item) => {
    let taskRow = document.createElement("tr");
    let nameTd = document.createElement("td");
    nameTd.classList.add("border", "border-slate-300", "h-15", "p-2");
    nameTd.innerText = item.taskName;

    let priorityTd = document.createElement("td");
    priorityTd.classList.add(
      "border",
      "border-slate-300",
      "h-15",
      "text-center"
    );
    priorityTd.innerText = item.priority; // renderPriority(item.priority);

    let statusTd = document.createElement("td");
    statusTd.classList.add("border", "border-slate-300", "h-15", "text-center");
    statusTd.innerText = item.status; // statusRender(item.status);

    let deadlineTd = document.createElement("td");
    deadlineTd.classList.add(
      "border",
      "border-slate-300",
      "h-15",
      "text-center"
    );
    deadlineTd.innerText = item.deadline; // deadlineRender(item.deadline);

    let actionTd = document.createElement("td");
    actionTd.classList.add("border", "border-slate-300", "h-15", "text-center");
    actionTd.innerText = "action"; // actionButtons(item.id)
    let btnDelet = document.createElement("button");
    btnDelet.classList.add(
      "border",
      "border-red-600",
      "bg-red-600",
      "rounded-md",
      "w-5",
      "h-5"
    );

    taskRow.append(nameTd, priorityTd, statusTd, deadlineTd);
    table.append(taskRow);
  });
}
render();

function renderPriority() {}

// const btnNewTask = document.getElementById("read-task");

// btnNewTask.addEventListener("click", () => readTasks());

// async function readTasks() {
//   const taskList = await fetch("http://localhost:2314/tasks").then((data) =>
//     data.json()
//   );
//   for (let task of taskList) {
//     createTask(task);
//   }
// }
