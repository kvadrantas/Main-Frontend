// This script is for all buttons background animation. It covers both the effect on hover and the
// effect on out of hover. 

let hoverTime;
let unhoverTime;


// FUNCTION RENDERS ONE EXACT BUTTON
function renderButton(button, buttonID) {
    let buttonText = button.innerHTML;
    buttonText = buttonText.toUpperCase();

    // Generates button html
    button.innerHTML = `
    <div id="main-button${buttonID}" class="main-button">
        <div id="button-overlay${buttonID}" class="button-overlay"> 
        </div>
        ${buttonText}
    </div>
    `
    // DOM variables for text and background animation
    const textAnimation = document.getElementById(`main-button${buttonID}`); 
    const backgroundAnimation = document.getElementById(`button-overlay${buttonID}`);

    // Animation for hover begins. Button mouseenter listener
    button.addEventListener('mouseenter', (time) => {
        hoverTime = time.timeStamp;
        textAnimation.classList.add('text-animation');
        backgroundAnimation.classList.add('background-animation');

    setTimeout(() => {
        textAnimation.style.color = 'black';
        textAnimation.style.backgroundColor = 'var(--third)';
    }, 300);

    // Clears animation classes after animation is finished
    setTimeout(() => {
        textAnimation.classList.remove('text-animation');
        backgroundAnimation.classList.remove('background-animation');
        textAnimation.classList.remove('reverse');
        backgroundAnimation.classList.remove('reverse');
    }, 300);

    });

    // Animation for unhover begins. Button mouseleave listener
    button.addEventListener('mouseleave', (time) => {
        unhoverTime = time.timeStamp;
        // Internal function for unhover animation
        function unhover() {
            textAnimation.style = '';
            // textAnimation.style.backgroundColor = 'var(--primary)';
            
            textAnimation.classList.add('text-animation');
            backgroundAnimation.classList.add('background-animation');
            textAnimation.classList.add('reverse');
            backgroundAnimation.classList.add('reverse');
            
            // Clears animation classes after animation is finished
            setTimeout(() => {
                textAnimation.classList.remove('text-animation');
                backgroundAnimation.classList.remove('background-animation');
                textAnimation.classList.remove('reverse');
                backgroundAnimation.classList.remove('reverse');
            }, 300);
        }

        // Hover animation takes 0.3s and unhover animation takes also 0.3s.
        // If you swipe too fast throuhg button hover and unhover happens almost emediately and it results
        // animation display error as hover animation is not finished when unhover animation begins.
        // To solve this I have created function which checks if time between hover and unhover is less then 0.3s
        // and in that case it waits for hover animation to finish befo running unhover animation. Else it runs
        // unhover animation emediately
        if (unhoverTime - hoverTime <= 300) {
            setTimeout(() => {
                unhover();
            }, 300);
        } else {
            unhover();
        }
        
    });
};

// FUNCTIONS GOES THROUG HTML DOCUMENTS GRABS ALL BUTTONS AND CALLS RENDERBUTTON FUNCTION TO RENDER EACH OF BUTTON
function allButtonAnimation() {
    let buttonID = 0;
    const buttons = document.querySelectorAll('.new-per-button');
    for (const button of buttons) {
        renderButton(button, buttonID++);
    }
}

export { allButtonAnimation };
