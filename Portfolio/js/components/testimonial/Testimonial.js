// THIS JAVASCRIPT CONTAINS ALL LOGIC FOR TESTIMONIAL SECTION INCLUDING:
// - content rendering from external file 
// - navigation rendering
// - listening events for navigation
class Testimonial {
    constructor(data) {
        this.data = data;
        this.previousTestimonial = '';
        this.currentTestimonialId = 0;
        this.renderLinks();
        this.renderFirst();
        this.listener();
        // this.renderContent();
    }

    // ********** RENDERS FIRST PUBLISHED TESTIMONIAL ITEM/REVIEW **********
    renderFirst() {
        const testimonial2DOM = document.getElementById('testimonial2');

        testimonial2DOM.style = 'left: 168%';

        const navItem = document.querySelector('.nav-line');
        let testimonialId = 0;

        for (const testimonial of this.data) {
            
            if (testimonial.status === 'published') {
                this.currentTestimonialId = testimonialId;
                this.renderContent(testimonialId);
                navItem.classList.add('clicked');
                break;
            }
            testimonialId++;
        }
    }

    // ********** RENDERS TESTIMONIAL CONTENT **********
    // Renders testimonial html code from  data in external file and renders 
    // only exact testimonial, which was clicked in navigation
    renderContent(testimonialId) {
        // const tetimonialContentDOM = document.querySelector('.testimonial .content');
        const tetimonialContentDOM1 = document.querySelector('.content1');
        const tetimonialContentDOM2 = document.querySelector('.content2');
        this.currentTestimonialId = testimonialId;

        // console.log(this.data[testimonialId]);

            const {
                status,
                title,
                rating,
                text,
                name,
                profession,
            } = this.data[testimonialId];

            
            let ratingHtml = '';
            for (let star = 1; star <= rating; star++) {
                ratingHtml += `<i class="fa fa-star"></i>\n`;
            }
            const html = `
                    <div class="testimonial-animation">
                        <h1 class="title">
                            ${title}
                        </h1>
                    </div>
                    <div class="testimonial-animation">
                        <div class="rating">
                            ${ratingHtml}
                        </div>
                    </div>
                    <div class="testimonial-animation-paragraph">
                        <p class="paragraph">
                            ${text}
                        </p>
                    </div>
                    <div class="testimonial-animation">
                        <h2 class="title2">
                            ${name}
                        </h2>
                    </div>
                    <div class="testimonial-animation">
                        <h3 class="title3">
                            ${profession}
                        </h3>
                    </div>
            `;
           
            // Generating html content on testimonial slides. First slide contains reprezents previous content before swipe 
            // and second slide reprezents new conent
            if (this.previousTestimonial === '') {
                tetimonialContentDOM1.innerHTML = html;
                this.previousTestimonial = html;
                tetimonialContentDOM2.innerHTML = html;
            } else {
                tetimonialContentDOM1.innerHTML = tetimonialContentDOM2.innerHTML;
                tetimonialContentDOM2.innerHTML = html;
            }

            setTimeout(() => {
                tetimonialContentDOM1.innerHTML = html;
            }, 300);      
    }

    // ********** RENDER TESTIMONIAL NAVIGATION LINKS **********
    // Renders all testimonial navigation line-like buttons
    renderLinks() {
        const navDOM = document.querySelector('.testimonial-nav');
        
        let navigationHtml = '';
        let testimonialId = 0;
        for (const testimonial of this.data) {
            
            if (testimonial.status === 'published') {
                // Builds testimonial navigation sections with line-like buttons
                navDOM.innerHTML += `<li value = "${testimonialId}" class="nav-line"></li>\n`
            }
            testimonialId++;
        }
    }

    // ********** CREATES CLICK LISTENER ON EVERY NAVIGATION LINK/BUTTON **********
    // Creates click listening events for every line-like button from array of buttons 
    // Main purpose is to check which exactly line-like button was clicked and based on that 
    // call testimonial rendering method with exact testimonial ID
    // Second purpose is to add special class on clicked button to make it wider and with special color
    listener() {
        const navList = document.querySelectorAll('.nav-line');
        const testimonial1DOM = document.getElementById('testimonial1');
        const testimonial2DOM = document.getElementById('testimonial2');


        // console.log(navList);
        for (const navItem of navList) {
            navItem.addEventListener('click', () => {
                // console.log('clicked', navItem.value);

                // In case if user press the same navigation button no action is required
                if(navItem.value != this.currentTestimonialId) {
                    for (const navItem2 of navList) {
                        navItem2.classList.remove('clicked'); // Removes active/clicked style from buttons
                    }
                    
                    // Assigns different initial position for testimonials depending on swipe direction
                    const direction = navItem.value > this.currentTestimonialId ? 'left' : 'right';
                    if (direction === 'left') {
                        testimonial2DOM.style = 'left: 168%';
                    } else {
                        testimonial2DOM.style = 'left: -68%';
                    }
                    
                    swipe(testimonial1DOM, testimonial2DOM, direction, Math.abs(navItem.value - this.currentTestimonialId));

                    function swipe(testimonial1DOM, testimonial2DOM, direction, i) {

                        setTimeout(() => {
                            if (i > 0) {
                                // Adds classes required to show swipe effect
                                   testimonial1DOM.classList.add(`swipe1-${direction}`);
                                   testimonial2DOM.classList.add(`swipe2-${direction}`);
                                   
                                   // Shortly after animation removes classes required to show swipe effect
                                   setTimeout(() => {
                                       testimonial1DOM.classList.remove(`swipe1-${direction}`);
                                       testimonial2DOM.classList.remove(`swipe2-${direction}`);
                                   }, 305); 
                                       
                                       console.log(i);
                                       // i -= 1;
                           }
                           swipe(testimonial1DOM, testimonial2DOM, direction, --i);
                        }, 350); 
                    }
                    navItem.classList.add('clicked'); // Adds active/clicked style for buttons
                    this.renderContent(navItem.value);       
                }   
            });     
        }   
    }   
};

export { Testimonial };
