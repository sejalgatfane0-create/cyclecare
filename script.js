function predictCycle() {

    let dateInput = document.getElementById("lastDate").value;
    let cycleLength = parseInt(document.getElementById("cycleLength").value);
    let mood = document.getElementById("mood").value;

    if (dateInput === "") {
        alert("Please select a date!");
        return;
    }

    let lastDate = new Date(dateInput);

    let nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + cycleLength);

    let ovulation = new Date(nextDate);
    ovulation.setDate(nextDate.getDate() - 14);

    let resultText =
        "🌸 Next Period: " + nextDate.toDateString() + "<br>" +
        "💫 Ovulation: " + ovulation.toDateString() + "<br>" +
        "😊 Mood: " + mood;

    document.getElementById("result").innerHTML = resultText;

    // SAVE DATA
    let data = {
        date: dateInput,
        cycle: cycleLength,
        mood: mood
    };

    let history = JSON.parse(localStorage.getItem("cycleData")) || [];
    history.push(data);
    localStorage.setItem("cycleData", JSON.stringify(history));

    displayHistory();
}

// SHOW HISTORY
function displayHistory() {
    let history = JSON.parse(localStorage.getItem("cycleData")) || [];
    let list = document.getElementById("history");

    list.innerHTML = "";

    history.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `Date: ${item.date}, Cycle: ${item.cycle}, Mood: ${item.mood}`;
        list.appendChild(li);
    });
}

// LOAD HISTORY ON PAGE LOAD
window.onload = displayHistory;