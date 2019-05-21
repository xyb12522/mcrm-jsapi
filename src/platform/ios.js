"use strict";

import mcrmSdk from "../lib/mcrmSdk";
import env from "../lib/env";
import h5Ios from "../lib/bridge/ios";

mcrmSdk.mcrmSdk.setPlatform({
    platform: env.ENV_ENUM.ios,
    bridgeInit: function() {
        return h5Ios.h5IosBridgeInit().then(() => {
            return h5Ios.h5IosBridge
        })
    },
    authMethod: "runtime.permission.requestJsApis",
});