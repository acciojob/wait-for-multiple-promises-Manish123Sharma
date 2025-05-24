const output = document.getElementById("output");

// Step 1: Show the "Loading..." row initially
const loadingRow = document.createElement("tr");
loadingRow.id = "loading"; // ✅ Needed for the test to detect "Loading..."
const loadingCell = document.createElement("td");
loadingCell.colSpan = 2;
loadingCell.textContent = "Loading...";
loadingRow.appendChild(loadingCell);
output.appendChild(loadingRow);

// Helper to create a promise with random timeout between 1-3 seconds
function createPromise() {
  const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
  return new Promise(resolve => {
    setTimeout(() => resolve(time), time * 1000);
  });
}

// Record start time
const startTime = performance.now();

// Create and resolve all 3 promises
const promises = [createPromise(), createPromise(), createPromise()];

Promise.all(promises).then(times => {
  // Step 2: Remove "Loading..." row
  output.innerHTML = "";

  // Step 3: Add rows for each promise
  times.forEach((time, index) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const timeCell = document.createElement("td");

    nameCell.textContent = `Promise ${index + 1}`;
    timeCell.textContent = time.toFixed(3);

    row.appendChild(nameCell);
    row.appendChild(timeCell);
    output.appendChild(row);
  });

  // Step 4: Add the total time row
  const endTime = performance.now();
  const totalTime = (endTime - startTime) / 1000;

  const totalRow = document.createElement("tr");
  const totalNameCell = document.createElement("td");
  const totalTimeCell = document.createElement("td");

  totalNameCell.textContent = "Total";
  totalTimeCell.textContent = totalTime.toFixed(3);

  totalRow.appendChild(totalNameCell);
  totalRow.appendChild(totalTimeCell);
  output.appendChild(totalRow);
});
