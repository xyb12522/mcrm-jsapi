"use strict";

import mcrmSdk from "../lib/mcrmSdk";
import env from '../lib/env';
import h5Android from "../lib/bridge/android";
mcrmSdk.mcrmSdk.setPlatform({
    platform: env.ENV_ENUM.android,
    bridgeInit: function() {
        return  h5Android.h5AndroidbridgeInit().then(function() {
            return h5Android.h5AndroidBridge;
        })
    },
    authMethod: "runtime.permission.requestJsApis",
});