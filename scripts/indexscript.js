//button responsible for changing the theme
const themeToogleButton = document.getElementById('theme-toogle-button');

//event listener - when the button is clicked, we check the current theme and change the variables in css file accordingly
themeToogleButton.addEventListener('click', () => {
    const root = document.querySelector(':root');
    let theme = sessionStorage.getItem('theme');
    if (theme !== "dark") {
        root.style.setProperty('--main-color', '#719FB0');
        root.style.setProperty('--secondary-color', '#1c1b1b');
        themeToogleButton.innerText = 'Light theme';
        sessionStorage.setItem('theme', 'dark');
    }
    else {
        root.style.setProperty('--main-color', '#379ece');
        root.style.setProperty('--secondary-color', 'white');
        themeToogleButton.innerText = 'Dark theme';
        sessionStorage.setItem('theme', 'light');
    }
});

//event listener - when the page loads, we check the current theme and change the variables in css file accordingly
window.addEventListener('load', () => {
    const root = document.querySelector(':root');
    const theme = sessionStorage.getItem('theme');
    if (theme === 'dark') {
        root.style.setProperty('--main-color', '#719FB0');
        root.style.setProperty('--secondary-color', '#1c1b1b');
        //removing the transition duration for button because transition from base light color to dark looked bad
        themeToogleButton.style.transitionDuration = "0s";
        themeToogleButton.innerText = 'Light theme';
        //removing the transition duration for game icons because transition from base light color to dark looked bad
        const icons = document.getElementsByClassName('game-icon');
        Array.prototype.map.call(icons, icon => {
            icon.style.transitionDuration = "0s";
        }
        )
    }
});
