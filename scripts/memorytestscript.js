//button responsible for going back to main page
const goBackButton = document.getElementById('back-button');
//button responsible for starting the test
const startMemoryTestButton = document.getElementById('start-memory-test');
//input field in which numbers are dosplayed and put in
const inputField = document.getElementById('input');
//current random number to be remembered by the user
let currentNumber = 0;
//current user points
let points = 0;

//event listener - when the page loads, we check the current theme and change the variables in css file accordingly
window.addEventListener('load', () => {
    const root = document.querySelector(':root');
    let theme = sessionStorage.getItem('theme');
    if (theme === 'dark') {
        root.style.setProperty('--main-color', '#719FB0');
        root.style.setProperty('--secondary-color', '#1c1b1b');
        //removing the transition duration for buttons because transition from base light color to dark looked bad
        startMemoryTestButton.style.transitionDuration = "0s";
        goBackButton.style.transitionDuration = "0s";
    }
});

//event listener - when the button is clicked we move back to the index page
goBackButton.addEventListener('click', () => {
    location.href = '../index.html';
});

//event listener - when the button is clicked we takie different actions depending on current state of game and user answer
startMemoryTestButton.addEventListener('click', () => {
    //if user starts the game
    if (startMemoryTestButton.textContent !== 'Check your answer') {
        //call to the function responsible for generating and displaying new number
        showNewNumber();
        //changing the button text, it's changed back after user loses the game
        startMemoryTestButton.textContent = 'Check your answer';
        //after 3 seconds we want to ask for answer
        setTimeout(askForAnswer, 3000);
    }
    else {
        //if user remembered and correctly typed the number
        if (inputField.value == currentNumber) {
            points++;
            //call to the function responsible for generating and displaying new number
            showNewNumber();
            //after 3 seconds we want to ask for answer
            setTimeout(askForAnswer, 3000);
        }
        //if user typed the wrong value we finish the game and return to start state
        else {
            console.log(points);
            inputField.disabled = true;
            inputField.value = "";
            startMemoryTestButton.textContent = 'Start!';
            alert(`Your score is ${points}! Congrats`);
            points = 0;
        }
    }
});

//function that generates a new number with number of digits one bigger than current number of points
//0 point - 1 digit - correct guess - 1 point - 2 digits etc...
//it puts the number in the inputField after disabling it and hiding the button
function showNewNumber() {
    inputField.disabled = true;
    startMemoryTestButton.hidden = true;
    let minNumber = Math.pow(10, points);
    let maxNumber = Math.pow(10, (points + 1));
    currentNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
    inputField.value = currentNumber;
}

//function that clears the input field and shows the check button to allow user to type
function askForAnswer() {
    inputField.value = "";
    inputField.disabled = false;
    startMemoryTestButton.hidden = false;
}
