const exercises = [
  { name: "walking_2.0", met: 2.0, desc: "Walk (2.0 mph)" },
  { name: "walking_2.5", met: 2.8, desc: "Walk (2.5 mph)" },
  { name: "walking_3.0", met: 3.3, desc: "Walk (3.0 mph)" },
  { name: "walking_3.5", met: 3.8, desc: "Walk (3.5 mph)" },
  { name: "hiking", met: 6.0, desc: "Hike (moderate)" },
  { name: "biking", met: 8.0, desc: "Bike (12-14 mph)" },
  { name: "jogging", met: 7.0, desc: "Jog (5 mph)" },
];

// Load saved weight from localStorage when the page loads
const weightInput = document.getElementById("weight");
const caloriesInput = document.getElementById("calories");
const resultsList = document.getElementById("results");

const savedWeight = localStorage.getItem("weight");
if (savedWeight) {
  weightInput.value = savedWeight;
}

weightInput.addEventListener("input", update);
caloriesInput.addEventListener("input", update);

function update() {
  const calories = parseFloat(caloriesInput.value);
  const weight = parseFloat(weightInput.value);

  if (isNaN(calories) || isNaN(weight)) {
    resultsList.innerHTML = "";
    return;
  }

  saveWeight(weight);

  resultsList.innerHTML = calculateRequiredExcercise(calories, weight)
    .map((it) => `<li>${it}</li>`)
    .join("");
}

function saveWeight(weight) {
  localStorage.setItem("weight", weight);
}

function calculateRequiredExcercise(calories, weight) {
  const weightKg = weight / 2.20462;
  return exercises.map((exercise) => {
    const burnRate = exercise.met * weightKg; // calories per hour
    const hours = calories / burnRate;
    return `${exercise.desc}: ${toHoursMinutes(Math.round(hours * 60))}`;
  });
}

function toHoursMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) return `${remainingMinutes} min`;
  return `${hours} hr ${remainingMinutes} min`;
}
