
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

9058cef933b017f4a4b2cc0bb3e8a73dedf5d001