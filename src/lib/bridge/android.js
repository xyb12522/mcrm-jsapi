"use strict";

var h5BridgeReadyPromise;

var h5AndroidbridgeInit = function() {
    if (!h5BridgeReadyPromise) {
        h5BridgeReadyPromise = new Promise(function (resolve, reject) {
            if (window.WebViewJavascriptBridge) {
				window.WebViewJavascriptBridge.init(function(e, r) {});
                resolve();
            } else {
                document.addEventListener('WebViewJavascriptBridgeReady', function() {
					window.WebViewJavascriptBridge.init(function(e, r) {});
                    resolve();
                }, false);
            }
        })
    }
    return h5BridgeReadyPromise
};

var h5AndroidBridge = function(namespace, callObj) {
	//console.log("---android--come--");
    if (!h5BridgeReadyPromise) {
        h5BridgeReadyPromise = h5AndroidbridgeInit();
    }
    return h5BridgeReadyPromise.then(function() {
		var obj = Object.assign({}, callObj);
		//console.log("param_obj:", obj);
		return new Promise(function(resolve, reject) {
			//console.log("----callhandler----");
			if (!0 === obj.watch) {
				var success = obj.onSuccess;
				delete obj.onSuccess;
				if (window.WebViewJavascriptBridge) {
					window.WebViewJavascriptBridge.registerHandler(namespace, function(data, callback) {
						"function" == typeof success && success.call(null, data);
						resolve && resolve({
							errorCode: "0",
							errorMessage: "success"
						});
					})
				}
			}
			
			if (window.WebViewJavascriptBridge) {
				window.WebViewJavascriptBridge.callHandler(namespace, Object.assign({}, obj), function(data) {
					data = data || {};
					if (data.code == "0") {
						if (typeof obj.onSuccess === "function") {
							obj.onSuccess.call(null, data.result);
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
			}
		});
    });
};

export default { h5AndroidbridgeInit, h5AndroidBridge };
