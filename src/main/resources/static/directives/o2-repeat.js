import {oxygen} from "../framework/oxygen.js";

const NAME = 'o2-repeat';

class O2Repeat {

    constructor(element) {
        this.element = element;
        this.controller = element.closest('[controller]');
        if (this.controller == null) {
            console.trace('Missing controller for element', element);
            throw new ReferenceError('Element missing controller');
        }
    }

    init() {
        let modelExpression = this.element.getAttribute(NAME);
        let modelValue = oxygen.getDescendantProp(this.controller, modelExpression);
        console.log('initDirective', NAME, this.element, modelValue);

    }

}


oxygen.registerDirectiveClass(NAME, O2Repeat);