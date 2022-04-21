//button responsible for starting the test
const startAimTestButton = document.getElementById('start-aim-test');
//img with the red dot that the user wants to click
const dotImg = document.getElementById('dot');
//img with the grid on which the dot appears - need this variable to check the real size of img on site
const gridImg = document.getElementById('grid');
//button responsible for going back to main page
const goBackButton = document.getElementById('back-button');
//current user points
let aimTestPoints = 0;
//interval that we can assign and clear later
let aimTestInterval;

//event listener - when the page loads, we check the current theme and change the variables in css file accordingly
window.addEventListener('load', () => {
    const root = document.querySelector(':root');
    let theme = sessionStorage.getItem('theme');
    if (theme === 'dark') {
        root.style.setProperty('--main-color', '#719FB0');
        root.style.setProperty('--secondary-color', '#1c1b1b');
        //removing the transition duration for buttons because transition from base light color to dark looked bad
        startAimTestButton.style.transitionDuration = "0s";
        goBackButton.style.transitionDuration = "0s";
    }
});

//event listener - when the button is clicked we move back to the index page
goBackButton.addEventListener('click', () => {
    location.href = '../index.html';
});

//event listener - we add a point after the dot is clicked and hide it
dotImg.addEventListener('click', () => {
    aimTestPoints++;
    dotImg.hidden = true;
});

startAimTestButton.addEventListener('click', () => {
    startAimTestButton.hidden = true; //we hide the start button
    startAimTest(); //we start the aim test
});

//function that randomly changes the dot position within the grid img
function randomiseDotPosition() {
    dotImg.hidden = true;
    const randomTop = Math.floor(Math.random() * (0.9 * gridImg.clientHeight));
    const randomLeft = Math.floor(Math.random() * (0.9 * gridImg.clientWidth));
    dotImg.style.top = `${randomTop}px`;
    dotImg.style.left = `${randomLeft}px`;
    dotImg.hidden = false;
}

//function that sets up the game
function startAimTest() {
    let oneAimTestTime = 800;
    let numOfTries = 10;
    randomiseDotPosition();
    //we set the interval
    aimTestInterval = setInterval(randomiseDotPosition, oneAimTestTime);
    //after a given number of intervals we want to end the game
    setTimeout(endAimTest, numOfTries * oneAimTestTime);
}

//function that finishes the test and reverses everything to the start state
function endAimTest() {
    //we clear the interval
    clearInterval(aimTestInterval);
    dotImg.hidden = true;
    console.log(aimTestPoints);
    alert(`Your score is ${aimTestPoints} out of 10! Congrats`);
    aimTestPoints = 0;
    startAimTestButton.hidden = false;
}