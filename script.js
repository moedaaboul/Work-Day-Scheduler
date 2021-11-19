var currentDate = moment();
$("#currentDay").text(currentDate.format("dddd, MMMM Do"));

var time = Number(currentDate.format("HH"));

// remove later
time = 14;

console.log("time", time);

let timeSlots = [
  "9AM",
  "10AM",
  "11AM",
  "12AM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
];

var container = document.querySelector(".container");

timeSlots.forEach(function (value, index) {
  let header = document.createElement("div");
  let input = document.createElement("textarea");
  // alterantivly could use input element
  let button = document.createElement("button");
  let timeblock = document.createElement("div");
  header.setAttribute("class", "col hour");
  input.setAttribute("name", index);
  button.setAttribute("class", "col saveBtn");
  button.setAttribute("name", index);
  timeblock.setAttribute("class", "row time-block");
  button.textContent = "Submit";
  header.textContent = value;
  timeblock.appendChild(header);
  timeblock.appendChild(input);
  timeblock.appendChild(button);
  container.appendChild(timeblock);

  if (time < index + 9) {
    input.setAttribute("class", "future col-9 description");
    button.addEventListener("click", handleFormSubmit);
  } else if (time === index + 9) {
    input.setAttribute("class", "present col-9 description");
    button.addEventListener("click", handleFormSubmit);
  } else if (time > index + 9) {
    input.setAttribute("class", "past col-9 description");
  }
});

let test = 0;
let arr = [];

// let scheduleItem = document.querySelector(`input[name="${test}"]`);

function handleFormSubmit(event) {
  event.preventDefault();
  var element = event.target;
  console.log(element.name);
  // select form element by its `name` attribute and get its value
  //   var inputEl = $('input[name="shopping-input"]');
  let scheduleItem = document.querySelector(
    `textarea[name="${element.name}"]`
  ).value;
  //add .value to the line above;
  console.log(scheduleItem);
  arr[element.name] = scheduleItem;
  console.log(arr);
  localStorage.setItem("scheduleArray", arr);
}

function renderLastRegistered() {
  // Retrieve the last stored array
  var localSchedule = localStorage.getItem("scheduleArray");
  arr = localSchedule.split(",");
  console.log("data", localSchedule);
  // TODO :render it to the page
  for (i = 0; i < 9; i++) {
    document.querySelector(`textarea[name="${i}"]`).textContent = arr[i];
  }
}

renderLastRegistered();
