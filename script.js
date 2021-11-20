var currentDate = moment();
$("#currentDay").text(currentDate.format("dddd, MMMM Do"));

var time = Number(currentDate.format("HH"));

// remove later
// time = 14;

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

for (i = 0; i < 9; i++) {
  $(`<div class="row time-block"></div>`).appendTo(".container");
}

for (i = 0; i < 9; i++) {
  $(`<div class="col-1 hour">${timeSlots[i]}</div>`).appendTo(
    `.time-block:eq(${i})`
  );
  $(`<textarea class="col-10" name="${i}">`).appendTo(`.time-block:eq(${i})`);
  $(
    `<button class="col-1 saveBtn" name="${i}"><i class="fas fa-save"></i></button>`
  ).appendTo(`.time-block:eq(${i})`);
}

for (i = 0; i < 9; i++) {
  let variable = $("textarea").eq(i);
  if (time < i + 9) {
    variable.addClass("future");
  } else if (time === i + 9) {
    variable.addClass("present");
  } else if (time > i + 9) {
    variable.addClass("past");
  }
}

$("button").on("click", handleFormSubmit);

let test = 0;
let arr = [];

function handleFormSubmit(event) {
  event.preventDefault();
  var element = event.target;
  console.log(element.name);
  // select form element by its `name` attribute and get its value
  let scheduleItem = $(`textarea[name="${element.name}"]`).val();
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
  //render it to the page
  for (i = 0; i < 9; i++) {
    $(`textarea[name="${i}"]`).text(arr[i]);
  }
}

renderLastRegistered();
