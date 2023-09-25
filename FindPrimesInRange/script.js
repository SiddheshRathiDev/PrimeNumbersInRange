function getPrimesInRange(start, end) {
  const startTime = performance.now();

  let nonPrimes = [], primes = [];
  for (let i = 2; i <= end; ++i) {
    if (!nonPrimes[i]) {
      if (i >= start) {
        primes.push(i);
      }
      for (let j = i + i; j <= end; j += i) {
        nonPrimes[j] = true;
      }
    }
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;

  displayPerformanceMetrics(executionTime);

  return { primes, executionTime };
}

function displayPrimes(primes) {
  const primeListElement = document.getElementById("primeList");
  primeListElement.innerHTML = "";

  if (primes.length === 0) {
    primeListElement.innerHTML = "<li>No prime numbers in this range.</li>";
  } else {
    primes.forEach((prime) => {
      const li = document.createElement("li");
      li.textContent = prime;
      primeListElement.appendChild(li);
    });
  }
}

function displayPerformanceMetrics(executionTime) {
  const performanceMetricsElement = document.getElementById("performanceMetrics");
  performanceMetricsElement.textContent = `Execution Time: ${executionTime} milliseconds`;
}

document.addEventListener("DOMContentLoaded", function () {
  const startInput = document.getElementById("start");
  const endInput = document.getElementById("end");
  const findPrimesButton = document.getElementById("findPrimes");

  findPrimesButton.addEventListener("click", function () {
    const start = parseInt(startInput.value);
    const end = parseInt(endInput.value);

    if (!isNaN(start) && !isNaN(end)) {
      const { primes, executionTime } = getPrimesInRange(start, end);
      displayPrimes(primes);
    } else {
      alert("Please enter valid start and end numbers.");
    }
  });
});