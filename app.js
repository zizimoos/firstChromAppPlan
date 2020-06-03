const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = `fas fa-check-circle`;
const UNCHECK = `far fa-circle`;
const LINE_THROUGH = "lineThrough";

let LIST = [],
  id = 0;

const options = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("kr", options);

addToDo = (toDo, id, done, trash) => {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
                <li class="item">
                <i class="${DONE}" job="complete" id=${id}></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="far fa-trash-alt" job="delete" id=${id}></i>
                </li>
                `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
};

document.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    const toDo = input.value;
    if (!toDo) {
      return;
    } else {
      addToDo(toDo, id, false, false);
      LIST.push({ name: toDo, id: id, done: false, trash: false });
      localStorage.setItem("TODO", JSON.stringify(LIST));
    }
    id++;
    input.value = "";
  }

  console.log(LIST);
});

let data = localStorage.getItem("TODO");
const loadList = (array) => {
  array.forEach((element) => {
    addToDo(element.name, element.id, element.done, element.trash);
  });
};
if (data) {
  console.log(data);
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

completeToDo = (element) => {
  if (element.classList.contains("fa-check-circle")) {
    element.classList.remove("fa-check-circle");
    element.classList.remove("fas");
    element.classList.add("far");
    element.classList.add("fa-circle");
  } else if (element.classList.contains("fa-circle")) {
    element.classList.remove("fa-circle");
    element.classList.remove("far");
    element.classList.add("fas");
    element.classList.add("fa-check-circle");
  }

  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
};

removeToDo = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
};

list.addEventListener("click", (event) => {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") {
    removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
