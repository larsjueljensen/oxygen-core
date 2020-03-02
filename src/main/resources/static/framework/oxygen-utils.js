import {OxygenController} from "./oxygen-controller.js";

function logBanner() {
    console.log('');
    console.log(' .    ___       o           O        :       : ____   O     .  :');
    console.log('   o// _ \\__  ___   _ .__ _  ___ _ __:    .  // ___|___ o_ __ ___  O');
    console.log('.  || ||| \\ \\/ / ||| |/ _` |/ _ \\ \'_ \\  o   || | :// _ \\| \'__/ _ \\');
    console.log('   || ||| |>  <| ||| | (_| |  __/ ||| |     || |__| (_) | |||  __/ :');
    console.log(' .  \\___//_/\\_\\\\__, |\\__, |\\___|_|||_| O  . \\\\____\\\\___/|_| \\\\___| :');
    console.log('o:  ===========||___/||___/======================.====o============');
    console.log('  o  :: Oxygen : : v1.0.0.SNAPSHOT :: o   : O    .   :    .  o "');
    console.log('');
}

function isObject(value) {
    return (typeof (value) === 'object');
}

function getDescendantProp(obj, path) {
    var pathElements = path.split('.');
    while (pathElements.length) { obj = obj[pathElements.shift()]; }
    return obj;
}

function setDescendantProp(obj, path, value) {
    var pathElements = path.split('.');
    while (pathElements.length > 1) { obj = obj[pathElements.shift()]; }
    return obj[pathElements[0]] = value;
}

function getPropertyHandler(controller, path) {

    let handler = {
        set: function (obj, prop, val) {
            let propPath = `${path}.${prop}`;
            let oldVal = obj[prop];
            let newVal = (isObject(val)) ? new Proxy(val, getPropertyHandler(controller, propPath)) : val;
            obj[prop] = newVal;
            controller._onModelStateChange(obj, propPath, newVal, oldVal);
            return true;
        }
    };

    return handler;
}

const controllerHandler = {
    set: function (obj, prop, val) {

        if (obj instanceof OxygenController) {

            let oldVal = obj[prop];

            if (isObject(val)) {

                obj[prop] = new Proxy(val, getPropertyHandler(obj, prop));
                for (const valKey of Object.keys(val)) {
                    let oldObjVal = (isObject(oldVal)) ? oldVal[valKey] : undefined;
                    obj._onModelStateChange(val, `${prop}.${valKey}`, val[valKey], oldObjVal);
                }
            }

            else {
                obj[prop] = val;
                obj._onModelStateChange(obj, prop, val, oldVal);
            }
        }

        else {
            throw new ReferenceError('Controller not extending OxygenController', obj);
        }

        return true;
    }
};

export {
    logBanner,
    getDescendantProp,
    setDescendantProp,
    isObject,
    controllerHandler
};

