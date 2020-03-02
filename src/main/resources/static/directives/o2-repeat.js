import {oxygen} from "../framework/oxygen.js";

const NAME = 'o2-repeat';


function getDescendantProp(obj, desc) {
    var arr = desc.split('.');
    while (arr.length) {
        obj = obj[arr.shift()];
    }
    return obj;
}

function setDescendantProp(obj, desc, value) {
    var arr = desc.split('.');
    while (arr.length > 1) {
        obj = obj[arr.shift()];
    }
    return obj[arr[0]] = value;
}

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
        let modelValue = getDescendantProp(this.controller, modelExpression);
        console.log('initDirective', NAME, this.element, modelValue);

    }

}


oxygen.registerDirectiveClass(NAME, O2Repeat);