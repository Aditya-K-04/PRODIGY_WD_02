let startTime, elapsedTime = 0, timerInterval;

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);
  
  let ms = Math.floor((time % 1000) / 10); // Calculate milliseconds (10ms intervals)

  let formattedHH = hh.toString().padStart(2, '0');
  let formattedMM = mm.toString().padStart(2, '0');
  let formattedSS = ss.toString().padStart(2, '0');
  let formattedMS = ms.toString().padStart(2, '0'); // Format milliseconds

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`; // Include milliseconds
}

function print(txt) {
  document.getElementById('display').innerHTML = txt;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10); // Update every 10ms for millisecond accuracy
  document.getElementById('startStopBtn').innerHTML = 'Stop';
}

function stop() {
  clearInterval(timerInterval);
  document.getElementById('startStopBtn').innerHTML = 'Start';
}

function reset() {
  clearInterval(timerInterval);
  print('00:00:00:00'); // Reset to include milliseconds
  elapsedTime = 0;
  document.getElementById('startStopBtn').innerHTML = 'Start';
  document.getElementById('laps').innerHTML = '';
}

function lap() {
  const lapTime = document.createElement('li');
  lapTime.textContent = timeToString(elapsedTime);
  document.getElementById('laps').appendChild(lapTime);
}

function startCountdown() {
  let countdownTime = document.getElementById('countdownInput').value * 1000;
  let countdownInterval = setInterval(function() {
    countdownTime -= 10; // Decrement by 10ms
    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      print("00:00:00.00"); // Show reset time with milliseconds
      alert("Time's up!");
    } else {
      print(timeToString(countdownTime));
    }
  }, 10); // Update countdown every 10ms for millisecond accuracy
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');

  const themeSwitcherBtn = document.getElementById('themeSwitcherBtn');
  if (document.body.classList.contains('dark-mode')) {
    themeSwitcherBtn.innerHTML = 'Toggle White Mode';
  } else {
    themeSwitcherBtn.innerHTML = 'Toggle Dark Mode';
  }
}

document.getElementById('themeSwitcherBtn').addEventListener('click', toggleTheme);
document.getElementById('countdownBtn').addEventListener('click', startCountdown);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);

document.getElementById('startStopBtn').addEventListener('click', function() {
  if (this.innerHTML === 'Start') {
    start();
  } else {
    stop();
  }
});
