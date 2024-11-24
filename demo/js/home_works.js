/// Email checker

const gmailInput = document.querySelector("#gmail_input")
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "OK"
        gmailResult.style.color = "green"
    } else {
        gmailResult.innerHTML = "NOT OK"
        gmailResult.style.color = "red"
    }
}



/// move block


const child_block = document.querySelector('.child_block')
const child_iphone = document.querySelector('.child_iphone')
//

  const colors = ['#ff7f50', '#ff6347', '#ff1493', '#8a2be2']; // Array of colors
  let colorIndex = 0;

  // Function to interpolate colors smoothly
  function interpolateColor(color1, color2, factor) {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);

    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `rgb(${r}, ${g}, ${b})`;
  }

  let startTime = null;
  function animateColorChange(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsedTime = timestamp - startTime;
    const factor = Math.min(elapsedTime / 2000, 1); // Transition duration 2 seconds

    const color1 = colors[colorIndex];
    const color2 = colors[(colorIndex + 1) % colors.length]; // Get the next color

    const color = interpolateColor(color1, color2, factor);
    
    // Apply the interpolated color to both blocks
    child_block.style.backgroundColor = color;
    child_iphone.style.backgroundColor = color;

    if (factor === 1) {
      colorIndex = (colorIndex + 1) % colors.length;
      startTime = null;
    }

    requestAnimationFrame(animateColorChange);
  }

  requestAnimationFrame(animateColorChange); // Start the animation

//
let posX = 0
let posY = 0
let direction = 'right' 


const moveBlock = () => {
	
	if (direction === 'right') {
		posX++
		if (posX >= 450) direction = 'down'
	} else if (direction === 'down') {
		posY++
		if (posY >= 450) direction = 'left'
	} else if (direction === 'left') {
		posX--
		if (posX <= 0) direction = 'up'
	} else if (direction === 'up') {
		posY--
		if (posY <= 0) direction = 'right'
	}

	child_block.style.left = `${posX}px`
	child_block.style.top = `${posY}px`

	requestAnimationFrame(moveBlock)
}

moveBlock()
///




//// timer

const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");
const secondsOnDisplay = document.querySelector("#seconds");

let seconds = 0
let timerInterval

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

function updateDisplay() {
    secondsOnDisplay.textContent = seconds;
}
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
}
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}
function resetTimer() {
    stopTimer();
    seconds = 0;
    updateDisplay();
}

updateDisplay();
const characterList = document.querySelector("#characters");

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
///Characters 


const renderCharacterList = (data) => {
    data.forEach((character) => {
        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

        const characterImage = document.createElement("img");
        characterImage.setAttribute("src", character.image);

        const characterName = document.createElement("p");
        characterName.innerText = character.name;

        const characterAge = document.createElement("span");
        characterAge.innerText = character.age;

        characterCard.append(characterImage);
        characterCard.append(characterName);
        characterCard.append(characterAge);

        characterList.append(characterCard);
    });
};

const loadCharacters = async () => {
    const data = await fetchData("../data/persons.json");
    if (data) {
        console.log(data);
        renderCharacterList(data);
    }
};

const loadAnyData = async () => {
    const data = await fetchData("../data/any.json");
    if (data) {
        console.log(data);
    }
};

loadCharacters();
loadAnyData();

















