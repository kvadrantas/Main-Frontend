class Blog {
    constructor(data) {
        this.data = data;
        this.render();
    }
    render() {
        const blogDOM = document.getElementById('blog');
        let html = "";

         for (const blog of this.data) {
            const {
                status,
                photoName,
                photoAlt,
                buttonText,
                buttonLink,
                titleText,
                titleLink,
                paragraph,
                authorPhotoName,
                authorPhotoAlt,
                author,
                date
             } = blog;

             if (status != 'published') continue;

             html = `<div class="blog-container col-12 col-lg-4">
                        <img src="./img/blog/${photoName}" alt="${photoAlt}">
                        <a href="${buttonLink}" class = "blog-button">
                            ${buttonText}
                        </a>
                        <div class="blog-content">
                            <a href="${titleLink}">
                                <h2 class="blog-title">
                                    ${titleText}
                                </h2>
                            </a>
                            <p class="blog-paragraph">
                                ${paragraph}
                            </p>
                            <div class="blog-info">
                                <div class="thumbnail">
                                    <img src="./img/testimonial/${authorPhotoName}" alt="${authorPhotoAlt}">
                                </div>
                                <div class="person">
                                    <div class="author">
                                        BY : ${author}
                                    </div>
                                    <div class="date">
                                        ${date}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>`;
                        // console.log(blogDOM.innerHTML);

             blogDOM.innerHTML += html;
         }
    }
};

export { Blog };
