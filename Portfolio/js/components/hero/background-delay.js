
'use strict'

// Created script, which listens to scroll event and specifically when scroll event ends.
// When scroll event ends it checks if scroll was up or down and depending on that
// it slightly delays Hero background image move up or down

function backgroundDelay() {
    var isScrolling;
    var direction;  //scroll direction
    var move = 0;  //how much to move
    const hero = document.querySelector('.hero');
    
    
    
    // DETECTING WHEN SCROLLING IS FINISHED 
    
    // event listener for scroll event
    window.addEventListener('scroll', function (event) {
    
        // DETECTING SCROLL DIRECTION UP OR DOWN
        document.addEventListener('mousewheel', function (event) {
            //  return event.wheelDelta >= 0 ? 'up' : 'down'
            direction = event.wheelDelta;
        });
    
    
        // I call clearTimeout method and I put callback function as an argument inside it
        // clearTimeout function goes to stack first and callback function is executed 70ms after clearTimeout completes
        // in that case we have an effect when actions in callback function are executed when scroll is finished
        window.clearTimeout(isScrolling);
    
        // Set timeout is called when scrolling is finished
        isScrolling = setTimeout(function () {
            // console.log(direction);
            move += direction >= 0 ? 30 : -30;
            if (window.scrollY === 0) {
                move = 0;
            }
    
            // console.log(move);
    
            hero.style = `transition: background-position .2s ease-in; background-position: 0 ${move}px;`;
        }, 70);
    
    });    
};

export { backgroundDelay };