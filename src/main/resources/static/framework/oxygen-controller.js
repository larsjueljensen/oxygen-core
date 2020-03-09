
import {oxygen} from "./oxygen.js";

const MODEL = 'o2-model';

class OxygenController {

    constructor(element) {
        // Store the element
        this.element = element;
        this.element.controller = this;
        this._observer = new MutationObserver(this._onDomChange.bind(this));
        this._observer.observe(this.element, {subtree: true, childList: true, attributeFilter: [MODEL]});
        this.modelElements = {};
        this.modelListeners = {};
    }

    init() {
        // Attach all model elements below this controller
        Array.prototype.forEach.call(
            this.element.querySelectorAll('[' + MODEL + ']'),
                modelElement => {this._attachModelElement(modelElement)});
    }

    _onDomChange(mutationList) {
        Array.prototype.forEach.call(mutationList, mutationRecord => {
            if (mutationRecord.type === 'childList') {
                Array.prototype.forEach.call(mutationRecord.addedNodes, modelElement => this._attachModelElement(modelElement));
                Array.prototype.forEach.call(mutationRecord.removedNodes, modelElement => this._detachModelElement(modelElement));
            }
        });
    }

    _attachModelElement(modelElement) {
        modelElement.addEventListener('keyup', (event) => {
            let propPath = modelElement.getAttribute(MODEL);
            oxygen.setDescendantProp(this, propPath, modelElement.value);
        });

        let propPath = modelElement.getAttribute(MODEL);
        modelElement.value = oxygen.getDescendantProp(this, propPath);

        this.modelElements[modelElement.getAttribute(MODEL)] = this.modelElements[modelElement.getAttribute(MODEL)] || [];
        this.modelElements[modelElement.getAttribute(MODEL)].push(modelElement);
    }

    _detachModelElement(modelElement) {
        let elementList = this.modelElements[modelElement.getAttribute(MODEL)] = this.modelElements[modelElement.getAttribute(MODEL)] || [];
        let index = elementList.indexOf(modelElement);
        if (index !== -1) {
            elementList.splice(index, 1);
        }
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
            listeners.forEach(listener => listener(prop, val, oldVal));
        }
    }

    addModelListener(modelExpression, listener) {
        this.modelListeners[modelExpression] = this.modelListeners[modelExpression] || [];
        this.modelListeners[modelExpression].push(listener);
        listener(modelExpression, oxygen.getDescendantProp(this, modelExpression), undefined);
    }
}

export { OxygenController };
