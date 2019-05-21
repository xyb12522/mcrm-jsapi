"use strict";

function isFunction(n) {
    return typeof n === "function";
}


var ENV_ENUM = {
    pc: 'pc',
    android: 'android',
    ios: "ios",
    notInMcrm: 'notInMcrm',
};

export default { isFunction, ENV_ENUM };