let btnFilter = document.querySelector(".btn-title");
let searchInput = document.getElementById("search");
let btnAll = document.querySelector(".btn-all");
let filter_all = document.getElementById("all");
let filter_done = document.getElementById("done");
let filter_unfinished = document.getElementById("unfinished");
let filter_complate = document.getElementById("complate");
let filter_delete_done = document.getElementById("delete-done");
let filter_delete_all = document.getElementById("delete-all");
let select_All_btn = document.querySelectorAll(".btn");
let taskInput = document.getElementById("task-text");
let taskAddBtn = document.getElementById("task-add");
let tasksArea = document.querySelector(".tasks-area");
let task_Data = [];

if (localStorage.getItem("task")) {
  task_Data = JSON.parse(localStorage.getItem("task"));
}

taskAddBtn.addEventListener("click", () => {
  if (taskInput.value !== "") {
    taskInfo(taskInput.value);
    taskInput.value = "";
  }
});

function taskInfo(taskText) {
  const the_Task = {
    id: Date.now(),
    content: taskText,
    done: false,
    delete: false,
  };

  task_Data.push(the_Task);
  buildTasks(task_Data);
}

function buildTasks(task_Data) {
  tasksArea.innerHTML = "";

  task_Data.forEach((data) => {
    let task_box = document.createElement("div");
    task_box.className = "task-box";
    task_box.setAttribute("id", `${data.id}`);

    let task_box_content = document.createElement("div");
    task_box_content.className = "task-box-content";

    let task_box_content_span = document.createElement("span");
    task_box_content_span.className = "status";

    let task_span_img = document.createElement("img");
    task_span_img.setAttribute("src", "image/icons8-ok-96.png");

    let task_box_content_text = document.createElement("div");
    task_box_content_text.className = "text";

    let text_span = document.createElement("span");
    let text_span_value = document.createTextNode(data.content);

    if (data.done === true) {
      task_box_content_span.appendChild(task_span_img);
      text_span.style.textDecoration = "line-through";
      task_box.classList.add("done");
    }

    let text_date = document.createElement("div");
    text_date.className = "task-date";
    let text_date_value = document.createTextNode("08/21/2022 06:06 PM");

    let task_box_control = document.createElement("div");
    task_box_control.className = "task-box-control";

    let task_box_control_done = document.createElement("div");
    task_box_control_done.className = "done";

    let control_done = document.createElement("span");
    control_done.textContent = "done";

    let control_done_img = document.createElement("img");
    control_done_img.setAttribute("src", "./image/icons8-pass-96.png");

    let task_box_control_delete = document.createElement("div");
    task_box_control_delete.className = "delete";

    let control_delete = document.createElement("span");
    control_delete.textContent = "delete";

    let control_delete_img = document.createElement("img");
    control_delete_img.setAttribute("src", "./image/icons8-remove-96.png");

    // Append Child All Elements
    task_box.appendChild(task_box_content);
    task_box_content.appendChild(task_box_content_span);
    task_box_content.appendChild(task_box_content_text);
    task_box_content_text.appendChild(text_span);
    text_span.appendChild(text_span_value);
    task_box_content_text.appendChild(text_date);
    text_date.appendChild(text_date_value);
    //
    task_box.appendChild(task_box_control);
    task_box_control.appendChild(task_box_control_done);
    task_box_control_done.appendChild(control_done);
    task_box_control_done.appendChild(control_done_img);
    //
    task_box_control.appendChild(task_box_control_delete);
    task_box_control_delete.appendChild(control_delete);
    task_box_control_delete.appendChild(control_delete_img);
    //
    tasksArea.appendChild(task_box);
  });

  setDataToStorage(task_Data);
  deleteTask();
  doneTask(task_Data);
}

// FUnctuion Set Data To Local Storage
function setDataToStorage(myData) {
  let theData = JSON.stringify(myData);
  if (theData) {
    localStorage.setItem("task", theData);
  }
}

function getDataFromStorage() {
  let data = JSON.parse(localStorage.getItem("task"));
  if (data) {
    setDataToStorage(data);
  }
  buildTasks(data);
}
getDataFromStorage();

let taskBox = document.querySelectorAll(".task-box");

// Delete Function
function deleteTask() {
  let deleteBtn = document.querySelectorAll(".delete");
  if (deleteBtn) {
    deleteBtn.forEach((delButton) => {
      let id;
      id = delButton.parentElement.parentElement.getAttribute("id");
      delButton.addEventListener("click", () => {
        task_Data = task_Data.filter((ele) => ele.id !== Number(id));
        buildTasks(task_Data);
      });
    });
  }
}

// Done Function
function doneTask(task_Data) {
  let doneBtn = document.querySelectorAll(".done");
  if (doneBtn) {
    doneBtn.forEach((done) => {
      let id;
      id = done.parentElement.parentElement.getAttribute("id");
      done.addEventListener("click", () => {
        task_Data.forEach((task) => {
          if (task.id === Number(id)) {
            task.done = true;
            buildTasks(task_Data);
          }
        });
      });
    });
  }
}

// filter Buttons
btnFilter.addEventListener("click", () => {
  btnAll.classList.toggle("show");
});

// Heddin All Filter Buttons
select_All_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btnAll.classList.toggle("show");
  });
});

// Show All Tasks
filter_all.addEventListener("click", () => {
  task_Data = task_Data.filter((task) => task);
  buildTasks(task_Data);
});

// Done FIlter
filter_done.addEventListener("click", () => {
  let tasks = document.querySelectorAll(".task-box");
  tasks.forEach((task) => {
    if (task.classList.contains("done")) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
});

// unfinished Filter
filter_unfinished.addEventListener("click", () => {
  let tasks = document.querySelectorAll(".task-box");
  tasks.forEach((task) => {
    if (!task.classList.contains("done")) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
});

// complate All Buttons
filter_complate.addEventListener("click", () => {
  task_Data.forEach((task) => (task.done = true));
  buildTasks(task_Data);
});

// Delete Done task
filter_delete_done.addEventListener("click", () => {
  task_Data = task_Data.filter((task) => task.done === false);
  buildTasks(task_Data);
});

// Delete All Tasks
filter_delete_all.addEventListener("click", () => {
  task_Data = [];
  buildTasks(task_Data);
});

// Srearh Function
searchInput.addEventListener("keyup", () => {
  let taskTextValue = document.querySelectorAll(".task-box-content .text span");
  let tasks = document.querySelectorAll(".task-box");
  //taskTextValue[0].textContent[0]
  for (let i = 0; i < taskTextValue.length; i++) {
    if (searchInput.value === "") {
      taskTextValue[i].parentElement.parentElement.parentElement.style.display =
        "flex";
    } else if (
      searchInput.value[0].toUpperCase() ===
      taskTextValue[i].textContent[0].toUpperCase()
    ) {
      taskTextValue[i].parentElement.parentElement.parentElement.style.display =
        "flex";
    } else if (
      searchInput.value[0].toUpperCase() !==
      taskTextValue[i].textContent[0].toUpperCase()
    ) {
      taskTextValue[i].parentElement.parentElement.parentElement.style.display =
        "none";
    }
  }
});
