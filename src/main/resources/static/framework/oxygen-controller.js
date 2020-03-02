
import {oxygen} from "./oxygen.js";

class OxygenController {

    constructor(element) {
        this.element = element;
        this.modelElements = {};
        this.modelListeners = {};
    }

    init() {
        Array.prototype.forEach.call(
            this.element.querySelectorAll('input[model]'),
                modelElement => {this._attachModelElement(modelElement)});
    }

    _attachModelElement(modelElement) {
        modelElement.addEventListener('keyup', (event) => {
            let propPath = modelElement.getAttribute('model');
            oxygen.setDescendantProp(this, propPath, modelElement.value);
        });

        this.modelElements[modelElement.getAttribute('model')] = this.modelElements[modelElement.getAttribute('model')] || [];
        this.modelElements[modelElement.getAttribute('model')].push(modelElement);
    }

    _onModelStateChange(obj, prop, val, oldVal) {
        let modelElements = this.modelElements[prop];
        if (modelElements) {
            modelElements.forEach(modelElement => modelElement.value = val);
        }
        this._fireModelStateChange(obj, prop, val, oldVal);
    }

    _fireModelStateChange(obj, prop, val, oldVal) {
        let listeners = this.modelListeners[prop];
        if (listeners) {
            listeners.forEach(listener => listener.onModelChange(prop, val, oldVal));
        }
    }

    addModelListener(modelExpression, listener) {
        this.modelListeners[modelExpression] = this.modelListeners[modelExpression] || [];
        this.modelListeners[modelExpression].push(listener);
    }
}

export { OxygenController };
