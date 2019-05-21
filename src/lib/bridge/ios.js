"use strict";

var h5BridgeReadyPromise;

var h5IosBridgeInit = function() {
    if (!h5BridgeReadyPromise) {
        h5BridgeReadyPromise = new Promise(function(resolve, reject) {
            if (window.WebViewJavascriptBridge) {
                return resolve();
            }
            try {
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'https://__bridge_loaded__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
                return resolve();
            } catch (e) {
                return reject();
            }
        });
    }
    return h5BridgeReadyPromise;
};

var h5IosBridge = function(namespace, callObj) {
    if (!h5BridgeReadyPromise) {
        h5BridgeReadyPromise = h5IosBridgeInit();
    }
    return h5BridgeReadyPromise.then(function () {
        var obj = Object.assign({}, callObj);
        return new Promise(function(resolve, reject) {
            if (obj.watch) {
                var success = obj.onSuccess;
                delete obj.onSuccess;
                if (WebViewJavascriptBridge) {
                    WebViewJavascriptBridge.registerHandler(namespace, function (data, callback) {
                        "function" == typeof success && success.call(null, data);
                        resolve && resolve({
                            errorCode: "0",
                            errorMessage: "success"
                        });
                    })
                }
            }
            var bridgeFunc = (bridge) => {
                bridge.callHandler(namespace, Object.assign({}, obj), function(data) {
                    data = data || {};
                    if (data.code == "0") {
                        if (typeof obj.onSuccess === "function") {
                            obj.onSuccess.call(null, data.msg);
                        }
                        resolve(data.result);
                    } else {
                        if (typeof obj.onFail === "function") {
                            obj.onFail.call(null, {
                                code: data.code,
                                message: data.message
                            });
                        }
                        reject(data.result);

                    }
                })
            };
            if (window.WebViewJavascriptBridge) {
                bridgeFunc(window.WebViewJavascriptBridge);
            } else {

                if (window.WVJBCallbacks) {
                    return window.WVJBCallbacks.push(bridgeFunc);
                }
                window.WVJBCallbacks = [bridgeFunc];
            }


        });

    });
};
export default { h5IosBridgeInit, h5IosBridge };
