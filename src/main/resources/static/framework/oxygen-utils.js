
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

export {
    logBanner,
    getDescendantProp,
    setDescendantProp
};