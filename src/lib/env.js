"use strict";

import sdk from "./sdk";

var ENV_ENUM = sdk.ENV_ENUM;


var getUA = function() {
    var ua = "";
    try {
        ua = navigator && (navigator.userAgent || "");
    } catch (e) {
        ua = "";
    }
    return ua;
};

var getENV = function() {
    var ua = getUA();
    var ios = /iPhone|iPad|iPod|iOS/i.test(ua);
    var android = /Android/i.test(ua);
    return {
        platform: ios ? sdk.ENV_ENUM.ios : (android ? sdk.ENV_ENUM.android : "pc")
    };
};

export default { ENV_ENUM, getUA, getENV };