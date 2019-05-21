"use strict";

import mcrmSdk from "./lib/mcrmSdk";
import otherApi from "./lib/otherApi";
var core = Object.assign({}, otherApi, mcrmSdk.mcrmSdk.getExportSdk());
export default core;