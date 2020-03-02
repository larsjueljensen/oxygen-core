import {OxygenController} from "./oxygen-controller.js";


function getPropertyHandler(controller, path) {

    let handler = {
        set: function (obj, prop, val) {
            let propPath = `${path}.${prop}`;
            let newVal = (typeof(val) === 'object') ? new Proxy(val, getPropertyHandler(controller, propPath)) : val;
            obj[prop] = newVal;
            controller._onModelStateChange(obj, propPath, newVal);
            return true;
        }
    };

    return handler;
}

const controllerHandler = {
        set: function (obj, prop, val) {
            let isObject = typeof (val) === 'object';
            obj[prop] = isObject ? new Proxy(val, getPropertyHandler(obj, prop)) : val;
            if (typeof(obj._onModelStateChange) === 'function') {
                if (isObject) {
                    for (const valKey of Object.keys(val)) {
                        obj._onModelStateChange(val, `${prop}.${valKey}`, val[valKey]);
                    }
                }
                else {
                    obj._onModelStateChange(obj, prop, val);
                }
            } else {
                throw new ReferenceError('Controller not extending OxygenController', obj);
            }
            return true;
        }
};

class Oxygen {

    constructor() {
        this.controllerFunctions = {}; this.controllers = {};
        this.directiveFunctions = {}; this.directives = {};
    }

    init() {
        this.onContentLoaded(function () {
            // Let the world know we are alive
            console.log('Oxygen UI V1.0.0-SNAPSHOT - started');
            this._initControllers();
            this._initDirectives();
        }.bind(this));
    }

    _initControllers() {

        // Register all the DOM elements associated with a controller
        Array.prototype.forEach.call(
            document.querySelectorAll('[controller]'),
            element => oxygen.registerControllerElement(element));


        // After controllers are registered, initialize them
        for (const name in this.controllers) {
            this.controllers[name].forEach(controller => {
                OxygenController.prototype.init.call(controller);
                controller.init();
            });
        }
    }

    _initDirectives() {
        Object.keys(this.directiveFunctions).forEach(name => {
            let directiveFunction = this.directiveFunctions[name];
            Array.prototype.forEach.call(
                document.querySelectorAll(`[${name}]`),
                element => oxygen.registerDirectiveElement(name, element));
        });

        Object.keys(this.directives).forEach(name => {
            this.directives[name].forEach(directive => directive.init());
        });
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

    /**
     * Called by application code to register a controller class.
     * @param controller a class extending OxygenController
     */
    registerControllerClass (controller) {
        this.controllerFunctions[controller.name] = controller;
        this.controllers[controller.name] = [];
    }

    registerControllerElement(element) {
        let name = element.getAttribute('controller');
        let controllerList = this.controllers[name];
        if (controllerList) {
            let controller = new this.controllerFunctions[name](element);
            let controllerProxy = new Proxy(controller, controllerHandler);
            controllerList.push(controllerProxy);
            window.controller = controllerProxy;
        } else {
            throw new ReferenceError(name + " is not defined");
        }
    }

    registerDirectiveClass(name, directive) {
        this.directiveFunctions[name] = directive;
        this.directives[name] = [];
    }

    registerDirectiveElement(name, element) {
        this.directives[name].push(new this.directiveFunctions[name](element));
    }
}

export let oxygen = new Oxygen();


