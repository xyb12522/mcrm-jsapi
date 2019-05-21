"use strict";

import mcrmSdk from "../../lib/mcrmSdk";
// var apiHelper = import("../../lib/apiHelper");
var apiName = "busi.openLink";
    // paramsDeal = apiHelper_1.genDefaultParamsDealFn({
    //     credible: !0,
    //     showMenuBar: !0
    // });

function openLink(obj) {
    return mcrmSdk.mcrmSdk.invokeAPI(apiName, obj);
}

mcrmSdk.mcrmSdk.setAPI(apiName, {});

export { openLink };
export default openLink;