// This script is for gallery rendering and gallery navigation functionality. It selectes required external data 
// according to what navigation menu was clicked and displays all gallery photos. It also cover some responsive functionality
class GalleryNavigation {
    constructor(allData, brandData, designData, photoData, videoData, link){
        this.allData = allData;
        this.brandData = brandData;
        this.designData = designData;
        this.photoData = photoData;
        this.videoData = videoData;
        this.data = allData;
        this.buttons = document.querySelectorAll('.gallery-navigation a');
        this.galleryPhotos = document.querySelectorAll('.gallery-photo');
        this.imgIds = document.getElementsByTagName('img');
        this.link = link;

        this.listener();    // Listener for navigation link clicks
        this.resetGallery();    // Removes all pictures from gallery
        this.responsive();  // Margin fixes for gallery photos - responsive
        this.renderGallery();   //  Generates hallery from data on external files

    }

    listener() {
        // Listens which navigation link was pressed and according to that picks right data and calls gallery rendering
        for (const button of this.buttons) {
            button.addEventListener('click', () => {
                this.clearClasses();
                button.classList.add('active');

                switch (button.innerHTML) {
                    case 'All':
                        this.data = this.allData;
                        this.renderGallery();
                        break;
                    case 'Brand':
                        this.data = this.brandData;
                        this.renderGallery();
                        break;
                    case 'Design':
                        this.data = this.designData;
                        this.renderGallery();
                        break;
                    case 'Photo':
                        this.data = this.photoData;
                        this.renderGallery();
                        break;
                    case 'Video':
                        this.data = this.videoData;
                        this.renderGallery();
                        break;
                    default:
                      // code block
                  }
            });
        }
    }

    // Clears the state, which nabigation link is currently pressed/active
    clearClasses() {
        for (const button of this.buttons) {
            button.classList.remove('active');
        }
    }

    renderGallery() {
        this.resetGallery();
        
        let i = 0;
        // Renders gallery photos with published data only
        for (const photo of this.data) {
            if (photo.status === 'published') {
                const image = document.getElementById(`img${i + 1}`);
                image.src = this.link + photo.imgName;
                image.alt = photo.imgAltName;
                this.galleryPhotos[i].querySelector('.photo-title').innerHTML = photo.overlayTitle;
                i++;
   
            }
        }

        // Animation for all gallery photos at once
        this.animateGallery();
    }

    // Removes all images from gallery so that gallery will be ready to render photos from other menu
    resetGallery() {
        for (let i = 1; i <=8; i++) {
            document.getElementById(`img${i}`).src = '';
            document.getElementById(`img${i}`).alt = '';
        }
    }

    // Runs animation for the whole gallery. Its called when rendering new gallery from different meniu
    animateGallery() {
        for (const photo of this.galleryPhotos) {
            photo.classList.remove('gallery-photo2');
            setTimeout(() => {
                photo.classList.add('gallery-photo2');
            }, 100);
        }
    }

    responsive() {
        // Applies some margin fixes to gallery photos for better look
        function clearStyles() {
            for (let i = 1; i <= 8; i++) {
                document.getElementById(`gal${i}`).style = '';
            }
        }

        function fixMargins() {
            setTimeout(() => {
                if (window.innerWidth > 770) {
                    clearStyles();
                    document.getElementById(`gal4`).style = 'margin-top: -8%;';
                    document.getElementById(`gal6`).style = 'margin-top: -8%;';
                    document.getElementById(`gal8`).style = 'width: 65%;';
                } 
                else if ((window.innerWidth <= 770) && (window.innerWidth > 575)) {
                    clearStyles();
                    document.getElementById(`gal3`).style = 'margin-top: -12%;';
                    document.getElementById(`gal5`).style = 'margin-top: -25%;';
                    document.getElementById(`gal7`).style = 'margin-top: -38%;';
                } 
                else if (window.innerWidth <= 575) {
                    clearStyles();
                } 
            }, 50);
        }
        
        fixMargins();

        window.addEventListener('resize', () => {
            setTimeout(() => {
                fixMargins();
            }, 500);
        });
    }
};

export { GalleryNavigation };
