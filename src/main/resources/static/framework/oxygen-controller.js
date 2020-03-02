
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

class OxygenController {

    constructor(element) {
        this.element = element;
        this.modelElements = {};
    }


    init() {
        Array.prototype.forEach.call(
            this.element.querySelectorAll('input[model]'),
                modelElement => {this._attachModelElement(modelElement)});
    }

    _attachModelElement(modelElement) {


        modelElement.addEventListener('keyup', (event) => {
            let propPath = modelElement.getAttribute('model');
            setDescendantProp(this, propPath, modelElement.value);
        });
        this.modelElements[modelElement.getAttribute('model')] = modelElement;
    }

    _onModelStateChange(obj, prop, val) {
        let modelElement = this.modelElements[prop];
        if (modelElement) {
            modelElement.value = val;
        }
    }
}

export { OxygenController };
