const addBtn = document.getElementById("addTask");
addBtn.addEventListener("click", () => viewModals());

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
function viewModals(item) {
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
    const idNumber = Math.random().toString(10);
    const task = {
      id: idNumber,
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
  if (item !== undefined) {
    taskName.value = item.taskName;
  }
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
  if (item !== undefined) {
    prioritySelector.value = item.priority;
  }
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
  if (item !== undefined) {
    statusSelector.value = item.status;
  }

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
  if (item !== undefined) {
    deadline.value = item.deadline;
  }

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
  if (item === undefined) {
    button.setAttribute("type", "submit");
    button.textContent = `Submit`;
  } else if (item !== undefined) {
    button.setAttribute("type", "button");
    button.textContent = `Update`;
    button.addEventListener("click", () =>
      updateTask(
        item.id,
        taskName.value,
        prioritySelector.value,
        statusSelector.value,
        deadline.value
      )
    );
  }

  btnDiv.append(button);

  form.append(divTask, priorityDiv, statusDiv, deadlineDiv, btnDiv);
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.innerHTML = "";
  modal.style.position = "";
  modal.style.zIndex = "-10";
}

const renderPriority = (priority) => {
  const btn = document.createElement("button");
  btn.innerHTML = priority;
  btn.classList.add("rounded-full");
  if (priority === "Low") {
    btn.classList.add("bg-gray-300", "w-12");
  } else if (priority === "High") {
    btn.classList.add("bg-red-600", "w-16");
  } else {
    btn.classList.add("bg-orange-600", "w-20");
  }
  return btn;
};

const renderStatus = (status) => {
  const btn = document.createElement("button");
  btn.innerHTML = status;
  btn.classList.add("rounded-full");
  if (status === "To Do") {
    btn.classList.add("bg-red-600", "w-14", "text-white");
  } else if (status === "Doing") {
    btn.classList.add("bg-orange-600", "w-16");
  } else {
    btn.classList.add("bg-green-600", "w-16", "text-white");
  }
  return btn;
};

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
    priorityTd.append(renderPriority(item.priority));

    let statusTd = document.createElement("td");
    statusTd.classList.add("border", "border-slate-300", "h-15", "text-center");
    statusTd.append(renderStatus(item.status));
    // statusTd.innerText = item.status; // statusRender(item.status);

    let deadlineTd = document.createElement("td");
    deadlineTd.classList.add(
      "border",
      "border-slate-300",
      "h-15",
      "text-center"
    );
    let btnDeadline = document.createElement("button");
    btnDeadline.classList.add(
      "border",
      "border-blue-300",
      "rounded-full",
      "w-28",
      "lining-nums"
    );
    btnDeadline.innerText = item.deadline;
    deadlineTd.append(btnDeadline);

    let actionTd = document.createElement("td");
    actionTd.classList.add("border", "border-slate-300", "h-15", "text-center");
    let btnDelete = document.createElement("button");
    btnDelete.classList.add(
      "border",
      "border-red-600",
      "bg-red-600",
      "rounded-md",
      "w-5",
      "h-5",
      "m-2"
    );
    btnDelete.setAttribute("id", "delete");
    let deleteIcon = document.createElement("img");
    deleteIcon.src = `./img/mingcute--delete-fill.svg`;
    btnDelete.addEventListener("click", () => deletItem(item.id));
    btnDelete.append(deleteIcon);
    actionTd.append(btnDelete);

    let btnEdit = document.createElement("button");
    btnEdit.classList.add(
      "border",
      "border-blue-600",
      "bg-blue-600",
      "rounded-md",
      "w-5",
      "h-5",
      "m-2"
    );
    let editIcon = document.createElement("img");
    editIcon.src = `./img/mdi--edit.svg`;
    btnEdit.addEventListener("click", () => viewModals(item));
    btnEdit.append(editIcon);
    actionTd.append(btnEdit);

    let btnView = document.createElement("button");
    btnView.classList.add(
      "border",
      "border-gray-500",
      "bg-gray-500",
      "rounded-md",
      "w-5",
      "h-5",
      "m-2"
    );
    let viewIcon = document.createElement("img");
    viewIcon.src = `./img/carbon--view-filled.svg`;
    btnView.addEventListener("click", () => ViewItem(item.id));
    btnView.append(viewIcon);
    actionTd.append(btnView);

    taskRow.append(nameTd, priorityTd, statusTd, deadlineTd, actionTd);
    table.append(taskRow);
  });
}
render();

function deletItem(taskId) {
  let dataFromLocalStorage = localStorage.getItem("taskList");
  let taskList = JSON.parse(dataFromLocalStorage);
  let newTaskList = [];
  for (const task of taskList) {
    if (task.id !== taskId) {
      newTaskList.push(task);
    }
  }
  let newTaskListStr = JSON.stringify(newTaskList);
  localStorage.setItem("taskList", newTaskListStr);
  render();
}

function ViewItem(taskId) {
  let dataFromLocalStorage = localStorage.getItem("taskList");
  let taskList = JSON.parse(dataFromLocalStorage);
  let foundTask;
  for (const task of taskList) {
    if (task.id === taskId) {
      foundTask = task;
      break;
    }
  }
  viewTask(foundTask);
}

function viewTask(task) {
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
  modalContent.classList.add("font-serif", "p-3");
  modal.append(modalContent);

  const divTask = document.createElement("div");
  divTask.classList.add("flex", "gap-3", "items-center");
  const taskLable = document.createElement("label");
  taskLable.innerText = "Task Name: ";
  divTask.append(taskLable);
  const taskName = document.createElement("h5");
  taskName.innerText = task.taskName;
  taskName.classList.add(
    "px-4",
    "py-2",
    "mt-2",
    "w-60",
    "text-gray-700",
    "border",
    "border-gray-300",
    "rounded-md",
    "bg-white"
  );
  divTask.append(taskName);

  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("flex", "gap-3", "items-center");
  const priorityLable = document.createElement("label");
  priorityLable.innerText = "Priority: ";
  const prioritySelector = document.createElement("h5");
  prioritySelector.innerText = task.priority;
  prioritySelector.classList.add(
    "px-4",
    "py-3",
    "mt-2",
    "mx-6",
    "w-60",
    "text-gray-700",
    "bg-white",
    "border",
    "border-gray-300",
    "rounded-md"
  );
  priorityDiv.append(priorityLable, prioritySelector);

  const statusDiv = document.createElement("div");
  statusDiv.classList.add("flex", "gap-3", "items-center");
  const statusLable = document.createElement("label");
  statusLable.innerText = "Status: ";
  const statusSelector = document.createElement("h5");
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
  statusSelector.innerText = task.status;
  statusDiv.append(statusLable, statusSelector);

  const deadlineDiv = document.createElement("div");
  deadlineDiv.classList.add("flex", "gap-3", "items-center");
  const deadlineLable = document.createElement("label");
  deadlineLable.innerText = "Deadline: ";
  const deadline = document.createElement("h5");
  deadline.innerText = task.deadline;
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

  modalContent.append(divTask, priorityDiv, statusDiv, deadlineDiv);
}

function updateTask(
  itemId,
  taskName,
  prioritySelector,
  statusSelector,
  deadline
) {
  let dataFromLocalStorage = localStorage.getItem("taskList");
  let taskList = JSON.parse(dataFromLocalStorage);
  let newTaskList = [];
  for (let task of taskList) {
    if (task.id === itemId) {
      task.taskName = taskName;
      task.priority = prioritySelector;
      task.status = statusSelector;
      task.deadline = deadline;
    }
    newTaskList.push(task);
  }
  let newTaskListStr = JSON.stringify(newTaskList);
  localStorage.setItem("taskList", newTaskListStr);
  render();
}
