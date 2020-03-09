import {oxygen} from "../framework/oxygen.js";

const NAME = 'o2-repeat';

class O2Repeat {

    constructor(element) {
        this.element = element;
        this.template = element.innerHTML;
        this.controller = oxygen.getControllerFromElement(element.closest('[controller]'));
        if (this.controller == null) {
            console.trace('Missing controller for element', element);
            throw new ReferenceError('Element missing controller');
        }
        this.controller.addModelListener(this.element.getAttribute(NAME), this.onModelChange.bind(this));
    }

    init() {
        let modelExpression = this.element.getAttribute(NAME);
        let modelValue = oxygen.getDescendantProp(this.controller, modelExpression);
        console.log('initDirective', NAME, this.element, modelValue);

    }

    onModelChange(modelExpression, newVal, oldVal) {
        this.model = newVal;
        this._render();
    }

    _render() {
        if (Array.isArray(this.model)) {
//            this.model.map(item => )
        }
    }

}


oxygen.registerDirectiveClass(NAME, O2Repeat);