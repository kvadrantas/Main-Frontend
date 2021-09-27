// This script is responsible for applying hover and unhover effects to all gallery photos. There are 3 special effects
// applied on each gallery photo which are played forward on hover event and backward on unhover event.
class GalleryHover {
    constructor() {
        this.listen();
        this.hoverTime;
        this.unhoverTime;
    }

    listen() {
        const photos = document.querySelectorAll('.gallery-photo');
        for (const photo of photos) {

            // Listener for photo hover event
            photo.addEventListener('mouseenter', (time) => {
                this.hoverTime = time.timeStamp;
                const overlay1 = photo.querySelector('.gallery-overlay1');
                const overlay2 = photo.querySelector('.gallery-overlay2');
                const overlay3 = photo.querySelector('.gallery-overlay3');

                // Clears all previous effects on hover
                overlay1.classList.remove('playforward1');
                overlay2.classList.remove('playforward2');
                overlay3.classList.remove('playforward3');
                overlay1.classList.remove('playbackward');
                overlay2.classList.remove('playbackward');
                overlay3.classList.remove('playbackward');

                // Adds forward playback shortly after hover
                setTimeout(() => {
                    overlay1.classList.add('playforward1');
                    overlay2.classList.add('playforward2');
                    overlay3.classList.add('playforward3');
                }, 40);
            });

            // Listener for photo unhover event
            photo.addEventListener('mouseleave', (time) => {
                this.unhoverTime = time.timeStamp;
                const overlay1 = photo.querySelector('.gallery-overlay1');
                const overlay2 = photo.querySelector('.gallery-overlay2');
                const overlay3 = photo.querySelector('.gallery-overlay3');

                // Hover anmiation tkes 1s. If user moves mouse quickly through items and time between hover and unhover is less then 
                // a second it emediatelly stops hover animation and plays it backward rhight from the moment it stopped. And in case 
                // hover animation was already fully played, it plays it backwards
                if (this.unhoverTime - this.hoverTime > 1000) {
                    overlay1.classList.remove('playforward1');
                    overlay2.classList.remove('playforward2');
                    overlay3.classList.remove('playforward3');

                    setTimeout(() => {
                        overlay1.classList.add('playforward1');
                        overlay2.classList.add('playforward2');
                        overlay3.classList.add('playforward3');
                        overlay1.classList.add('playbackward');
                        overlay2.classList.add('playbackward');
                        overlay3.classList.add('playbackward');
                    }, 100);
                } else {
                    overlay1.classList.add('playbackward');
                    overlay2.classList.add('playbackward');
                    overlay3.classList.add('playbackward');
                }
            });
        }
    }
};

export { GalleryHover };
