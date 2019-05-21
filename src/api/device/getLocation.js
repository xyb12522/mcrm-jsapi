"use strict";

import mcrmSdk from "../../lib/mcrmSdk";
var apiName = "device.getLocation";
// paramsDeal = apiHelper_1.genDefaultParamsDealFn({
//     credible: !0,
//     showMenuBar: !0
// });

function getLocation(obj) {
    return mcrmSdk.mcrmSdk.invokeAPI(apiName, obj);
}

mcrmSdk.mcrmSdk.setAPI(apiName, {});

export { getLocation };
export default getLocation;