"use strict";

import sdkLib from "./sdkLib";
var isFunction = sdkLib.isFunction;
var ENV_ENUM = sdkLib.ENV_ENUM;

class Sdk {
    constructor(env) {
        this.env = env;
        this.platformConfigMap = {};
        this.invokeAPIConfigMapByMethod = {};
        this.isBridgeDrity = true;
    }

    bridgeInitFn() {
        if (this.bridgeInitFnPromise && !this.isBridgeDrity) {
            return this.bridgeInitFnPromise;
        }
        this.isBridgeDrity = false;
        var o = this.platformConfigMap[this.env.platform];
        if (o) {
            this.bridgeInitFnPromise = o.bridgeInit().catch(function (e) {
                console.log("error:", e);
                // return i.customLog(sdkLib_1.LogLevel.ERROR, ["\b\b\b\b\bJsBridge initialization fails, jsapi will not work"]), Promise.reject(e)
            })
        } else {
            var msg = "Do not support the current environment：" + this.env.platform;
            console.log("Do not support the current environment");
            this.bridgeInitFnPromise = Promise.reject(new Error(msg))
        }
        return this.bridgeInitFnPromise;
    }

    setPlatform(e) {
        this.isBridgeDrity = true;
        this.platformConfigMap[e.platform] = e;
        if (e.platform === this.env.platform) {
            e.bridgeInit().catch((e) => {
                console.log("error", e);
            })
        }
    }

    invokeAPI(namespace, params, b) {
        params = params || {};
        if (b === undefined || b === null) {
            b = true;
        }

        var promise =  this.bridgeInitFn().then((bridgePromise) => {
            var apiObj = this.invokeAPIConfigMapByMethod[namespace];
            if (apiObj || !b) {
                var pObj = Object.assign({}, params);
                if (sdkLib.isFunction(pObj.onSuccess)) {
                    var g = pObj.onSuccess;
                    pObj.onSuccess = function (e) {
                        g(e);
                    }
                }

                return bridgePromise(namespace, pObj).then((e) => {
                    return e;
                })
            }
        });

        return promise;
    }

    getExportSdk() {
        let self = this;
        return {
            _invoke: function(namespace, method) {
                method = method || {};
                return self.invokeAPI(namespace, method, false);
            }
        };
    }

    setAPI(method, obj) {
        this.invokeAPIConfigMapByMethod[method] = obj;
    }

    deleteApiConfig(method, obj) {
        var api = this.invokeAPIConfigMapByMethod[method];
        api && delete api[obj];
    }
}

export default { isFunction,  ENV_ENUM,  Sdk};
