// ************ IMPORT JS MOUDLES ************

// HERO - HEADER
import { backgroundDelay } from "./components/hero/background-delay.js";
import { sticky } from "./components/hero/sticky.js";
import { autotypeTextData } from "./data/hero/autotypeTextData.js";
import { AutotypeText } from "./components/hero/autotypeText.js";
import { socialData } from "./data/hero/socialData.js";
import { Social } from "./components/hero/Social.js";

// TESTIMONIAL
import { testimonialData } from "./data/testimonial/testimonialData.js";
import { Testimonial } from "./components/testimonial/Testimonial.js";

// MY SKILS - PROGRESS BAR
import { SkillsProgressBars } from "./components/progress-bar/SkillsProgressBars.js";
import { skillsProgressData } from "./data/skillsProgressData.js";
import { allButtonAnimation } from "./components/button/button.js";


// PRTFOLIO GALLERY
import { GalleryHover } from "./components/portfolio-gallery/GalleryHover.js";
import { GalleryNavigation } from "./components/portfolio-gallery/GalleryNavigation.js";
import { portfolioAllData } from "./data/portfolio-gallery/portfolioAllData.js";
import { portfolioBrandData } from "./data/portfolio-gallery/portfolioBrandData.js";
import { portfolioDesignData } from "./data/portfolio-gallery/portfolioDesignData.js";
import { portfolioPhotoData } from "./data/portfolio-gallery/portfolioPhotoData.js";
import { portfolioVideoData } from "./data/portfolio-gallery/portfolioVideoData.js";

// BLOG
import { Blog} from "./components/blog/Blog.js";
import { blogData } from "./data/blog/blogData.js";



// ************ EXECUTE IS MODULES ************

// HERO - HEADER
backgroundDelay();
sticky();
new AutotypeText(autotypeTextData);
new Social('.socials', socialData);
new Testimonial(testimonialData);

/* SECTION3 - MY SKILLS - start */
new SkillsProgressBars('.skills-block', skillsProgressData);
/* SECTION3 - MY SKILLS - End */

// BLOG
new Blog(blogData);

// PORTFOLIO GALLERY
new GalleryHover();
new GalleryNavigation(portfolioAllData, portfolioBrandData, portfolioDesignData, portfolioPhotoData, portfolioVideoData, './img/portfolio/');

// BUTTON
allButtonAnimation();
