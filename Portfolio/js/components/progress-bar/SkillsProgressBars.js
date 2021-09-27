class SkillsProgressBars {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;

        this.init();
    }



    init() {
        if (!this.isValidSelector() ||
            !this.isValidData()) {
            return false;
        }

        if (!this.findTargetElement()) {
            console.error('ERROR: pagal pateikta this.selector nepavyko rasti norimo elemento');
            return false;
        }

        this.render();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            console.error('ERROR: this.selector turi buti ne tuscias tekstas');
            return false;
        }

        return true;
    }

    isValidData() {
        if (!Array.isArray(this.data) ||
            this.data.length === 0) {
            console.error('ERROR: this.data turi buti ne tuscias array');
            return false;
        }

        return true;
    }

    findTargetElement() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

    isValidDataItem(item) {
        const allowedKeys = ['label', 'value'];

        // tikriname, jog item yra objektas
        if (typeof item !== 'object' ||
            Array.isArray(item) ||
            item === null) {
            console.warn('WARN: netinkamas tipas');
            return false;
        }

        // tikriname, ar item.label yra tinkamas
        if (typeof item.label !== 'string' ||
            item.label === '') {
            console.warn('WARN: netinkamas item.label');
            return false;
        }

        // tikriname, ar item.value yra tinkamas
        if (typeof item.value !== 'number' ||
            !isFinite(item.value) ||
            item.value < 0 ||
            item.value > 100) {
            console.warn('WARN: netinkamas item.label');
            return false;
        }

        // tikriname, ar item objektas neturi per daug key's (raktazodziu)
        for (const key in item) {
            if (!allowedKeys.includes(key)) {
                return false;
            }
        }

        return true;
    }


    render() {
        let HTML = '';

        for (const item of this.data) {
            if (!this.isValidDataItem(item)) {
                continue;
            }    
        
            HTML += `<div class="skills-progress-bar">
                        <div class="top">
                            <div class="label">${item.label}</div>
                        </div>
                        <div class="bottom">
                            <div class="skills-bar" style="width: ${item.value}%;">
                                <div class="loading-bar"></div>    
                        </div>
                    </div>
                    <div class="value-skills-bar" style="width: ${item.value}%;">
                            <div class="value-bar">${item.value}%</div>
                        </div>
                </div>`;
        }

        if (HTML === '') {
            console.error('ERROR: this.data neturi nei vienos validzios reiksmes');
            return false;
        }

        this.DOM.innerHTML +=HTML;

        }
    }

export { SkillsProgressBars }