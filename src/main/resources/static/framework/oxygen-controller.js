
class OxygenController {

    constructor(element) {
        this.element = element;
    }

    init() {
        Array.prototype.forEach.call(
            this.element.querySelectorAll('input[model]'),
            modelElement => {
                modelElement.value = this[modelElement.getAttribute('model')];
            });
    }

}

export { OxygenController };