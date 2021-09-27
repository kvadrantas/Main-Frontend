// This is never ending automatically typed and deleted text in hero section

const autotypeText = document.querySelector('.autotype-text');
autotypeText.innerHTML = 'VUALIA';

// renders every single letter with small delay
function renderLetters(a, word, forward) {
    setTimeout(() => {
        let html = autotypeText.innerHTML;
        forward ? autotypeText.innerHTML += word[(word.length - a)] : 0;
        
        // console.log(a, word[(word.length - a)]);
        if (a != 0 && forward) { 
            renderLetters(a - 1, word, true); 
        }  else { 
            // if (forward) {for (let i = 0; i < 1000000000; i++) {}}
            forward ? a = word.length : 0;
            if (a != 1) { 
                // console.log('--------', word.substring(0, a -2));
                autotypeText.innerHTML = word.substring(0, a -2);
                renderLetters(a - 1, word, false);
            }
        }
    }, 150);
}

// Splits array of strings to single strings and passes them to render in single letters
function renderStrings(a, string) {
    autotypeText.innerHTML = '';
    setTimeout(() => {
        // console.log(a, string[(string.length - a)]);
        renderLetters(string[(string.length - a)].length, string[(string.length - a)], true);
        if (a != 1) { 
            renderStrings(a - 1, string); 
        } else {
            renderStrings(string.length, string);
        }
    }, 5000);
}

class AutotypeText {
    constructor (data) {
        this.data = data;
        this.parseData();
    }
    parseData() {
        // Processes all given data, checks if it is redy to be published or draft
        // then separates strings from statuses and sends them to string rendering
        let allStrings = [];
        for (const { status, text } of this.data) {
            // console.log(status, text);
            if (status === "published") allStrings.push(text);
        }
        renderStrings(allStrings.length, allStrings);
    }
};

export { AutotypeText };