
import { personService } from "../services/person-service.js"

class O2Person extends HTMLElement {

    constructor() {
        super();
        this.person = {};
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<div><div id="name"></div><div id="age"></div></div>`;
        this.nameTag = shadowRoot.querySelector('#name');
        this.ageTag = shadowRoot.querySelector('#age');
    }

    static get observedAttributes() {
        return ['id'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log('attr', name, oldVal, newVal);
        if (name === 'id') {
            personService.getById(newVal).then(person => {
                this.person = person;
                this.render();
            });
        }
    }

    render() {
        this.nameTag.textContent = String(this.person.name);
        this.ageTag.textContent = String(this.person.age);
    }
}

try {
    window.customElements.define('o2-person', O2Person);
}
catch (err) {
    console.trace(err);
}
