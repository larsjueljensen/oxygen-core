
class Oxygen {

    constructor() {
        this.controllerFunctions = {};
        this.controllers = {};
    }

    init() {
        oxygen.onContentLoaded(function () {

            // Let the world know we are alive
            console.log('Oxygen UI V1.0.0-SNAPSHOT - started');

            // Register all the DOM elements associated with a controller
            Array.prototype.forEach.call(
                document.querySelectorAll('[controller]'),
                    element => oxygen.registerControllerElement(element));


            // After controllers are registered, initialize them
            for (const name in this.controllers) {
                this.controllers[name].forEach(controller => controller.init());
            }
        }.bind(this));
    }

    static isDocumentLoaded () {
        return document.readyState === "complete" ||
            (document.readyState !== "loading" && !document.documentElement.doScroll);
    }

    onContentLoaded (callback) {
        if (Oxygen.isDocumentLoaded()) {
            callback();
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    }

    getControllerForElement(element) {
        return this.controllers[element.getAttribute('controller')][element];
    }

    registerControllerClass (controller) {
        this.controllerFunctions[controller.name] = controller;
        this.controllers[controller.name] = [];
    }

    registerControllerElement(element) {
        let name = element.getAttribute('controller');
        let controllerList = this.controllers[name];
        if (controllerList) {
            controllerList.push(new this.controllerFunctions[name](element));
        } else {
            throw new ReferenceError(name + " is not defined");
        }
    }

}

export let oxygen = new Oxygen();

