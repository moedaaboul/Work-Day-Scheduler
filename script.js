// Obtains today's date from moment.js
const currentDate = moment();
// formats todays date into desired format e.g. Saturday, November 20th
$("#currentDay").text(currentDate.format("dddd, MMMM Do"));
// Obtains current hour from moment.js
const time = Number(currentDate.format("HH"));

// Define array with timeslot headers
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

// This is an index to align loop starting from zero as starts from 9AM.
const startTime = 9;

// Renders time-block elements within container by the nine hours we are considering i.e. from 9AM - 5PM
for (i = 0; i < timeSlots.length; i++) {
  $(`<div class="row time-block"></div>`).appendTo(".container");
}

// Renders column elements within each timeblock row for each to constitue a column header, textarea and button
for (i = 0; i < timeSlots.length; i++) {
  $(`<div class="col-1 hour">${timeSlots[i]}</div>`).appendTo(
    `.time-block:eq(${i})`
  );
  $(`<textarea class="col-10" name="${i}">`).appendTo(`.time-block:eq(${i})`);
  $(
    `<button class="col-1 saveBtn" name="${i}"><i class="fas fa-save"></i></button>`
  ).appendTo(`.time-block:eq(${i})`);
}

// Adjusts class depending on time of day
for (i = 0; i < timeSlots.length; i++) {
  const textElement = $("textarea").eq(i);
  if (time < i + startTime) {
    textElement.addClass("future");
  } else if (time === i + startTime) {
    textElement.addClass("present");
  } else if (time > i + startTime) {
    textElement.addClass("past");
  }
}

// Adds event listener to the buttons to handle click events
$("button").on("click", handleFormSubmit);

// Registers array when saving input values
let arr = [];

// Submit button handler function to save input to local storage
function handleFormSubmit(event) {
  event.preventDefault();
  const element = event.target;
  // selects form element by its `name` attribute and get its value
  const scheduleItem = $(`textarea[name="${element.name}"]`).val();
  arr[element.name] = scheduleItem;
  localStorage.setItem("scheduleArray", JSON.stringify(arr));
}

//  Retrieve the last stored array, updates global arr variable and renders to the page,
function renderLastRegistered() {
  const localSchedule = JSON.parse(localStorage.getItem("scheduleArray"));
  arr = localSchedule;
  for (i = 0; i < 9; i++) {
    $(`textarea[name="${i}"]`).text(arr[i]);
  }
}
//Calls renderLastRegistered() function upon loading a new doc
renderLastRegistered();
