const navigation = document.querySelector('.navigation');
const body = document.getElementById('body');
const checkbox1 = document.getElementById('checkbox1');
const checkbox2 = document.getElementById('checkbox2');
const row = document.getElementById('row');
const content = document.getElementById('content');
const button = document.getElementById('button');

let fileContent;
let files;
let folders;

// row.classList.add('hide');
// content.classList.add('hide');

// checkbox1.addEventListener('click', function() {
//     if (checkbox1.checked) {
//         row.classList.remove('hide');
//     }
// })

// button.addEventListener('click', function() {
//     if (checkbox1.checked && checkbox2.checked) {
//         document.querySelector('.content').innerHTML = `${fileContent.replaceAll('--', '')}`;
//         body.classList.add('animation');
//         content.classList.remove('hide');
//     }
// });

async function renderFiles(folder) {
    // console.log('render files ', folder);
    try {
        files = await fetch(`https://rolandasseputis.lt:3344/Bit-SQL/json/files:${folder}`);
        if (files.ok) {
            files = await files.json();
            files.forEach(async(element, index) => {
                files[index] = `<a id="${element}">${element.slice(0, element.search(/\./)).replace('-', '. ').replaceAll('-', ' ').replaceAll('_', ', ')}</a>`;
                // console.log(index, element, element.search(/\./));
            });
            files = files.join('');
            // console.log('aaa ', files);
            // files = files.join('<br>');
        }
    }
    catch(error) {
        console.log('KLAIDA: ', error);
    }

    setTimeout(() => {
        document.querySelector('.left-pane').innerHTML = `${files}`;
        const fileLinks = document.querySelectorAll('.left-pane a');
        for (const link of fileLinks) {
            link.addEventListener('click', () => {
                fileLinks.forEach((element, index) => {
                    element.classList.remove('active-left-nav');
                });
                link.classList.add('active-left-nav');
                renderFileContent(link.id);
            });
        }
        body.classList.add('animation');
        content.classList.remove('hide');
    }, 300);
};

async function renderFileContent(fileName) {
    try {
        fileContent = await fetch(`https://rolandasseputis.lt:3344/Bit-SQL/json/fileContent:${fileName}`);
        if (fileContent.ok) {
            fileContent = await fileContent.json();
            fileContent = fileContent.split('\n').join('<br>');
        }
    }
    catch(error) {
        console.log('KLAIDA: ', error);
    }

    setTimeout(() => {
        document.querySelector('.right-pane').innerHTML = `${fileContent.replaceAll('-- ', '')}`;
 
        body.classList.add('animation');
        content.classList.remove('hide');
    }, 300);
}





try {
    folders = await fetch('https://rolandasseputis.lt:3344/Bit-SQL/json/folders');
    if (folders.ok) {
        folders = await folders.json();
        folders.forEach((element, index) => {
            navigation.innerHTML += `<button id="${element}">${element}</button>`;
        });
    }
}
catch(error) {
    console.log('KLAIDA: ', error);
}

// renderFileContent('nd2.sql');

navigation.querySelectorAll('button').forEach((element, index) => {
    element.addEventListener('click', () => {
        // console.log('clicked ', element.id);
        navigation.querySelectorAll('button').forEach((element, index) => {
            element.classList.remove('active-top-nav');
        });
        element.classList.add('active-top-nav');
        renderFiles(element.id);
    });
});
