function sticky() {
    // This is script for top sticky menu and for mobile navbar menu

const targetDOM = document.querySelector(['.sticky-begin']);
const navigationDOM = document.querySelector('.hero nav');
const navbarDOM = document.getElementById('navigation');
const logoDOM = document.querySelector('.logo');
const logo2DOM = document.querySelector('.logo2');
const navbarExpandDOM = document.querySelector('.hero .navigation');
let isVisible = false;
// let isVisible = window.innerWidth <= 861 ? true : false;

// console.log(window);
window.innerWidth <= 861 ? navbarExpandDOM.classList.add('expanded') : navbarExpandDOM.classList.remove('expanded');

// Listener for navbar click event. It expands menu if it is shrinked and vice versa
navbarDOM.addEventListener('click', function() {
    if (isVisible) {
        navbarExpandDOM.style.display = "none";
        isVisible = false;
    } else {
        navbarExpandDOM.style.display = "inline-block";
        isVisible = true;
    }
    
});

// It enables sticky menu when certain position of the Heoro section is reached
addEventListener('scroll', () => {
    // console.log(scrollY);
    
    if (scrollY > targetDOM.offsetTop - 30) {
        navigationDOM.classList.add('sticky');
        logoDOM.classList.add('hide');
        logo2DOM.classList.remove('hide');

    } else {
        navigationDOM.classList.remove('sticky');
        logoDOM.classList.remove('hide');
        logo2DOM.classList.add('hide');
    }
})

// hides or displays navbar menu depending on screen size
// navbar expanded menu has different style then default or sticky menu so "expanded" class is added to represent that
window.addEventListener('resize', function() {
    // console.log(window.innerHeight);
    // console.log(window.innerWidth);
    if (window.innerWidth <= 861) {
        navbarExpandDOM.classList.add('expanded');
        navbarExpandDOM.style.display = "none";
        isVisible = false;
    } else {
        navbarExpandDOM.classList.remove('expanded');
        navbarExpandDOM.style.display = "inline-block";
        isVisible = true;
    }
});
};

export { sticky };
