"use strict";
import mcrmWithoutApi from "./entry/union";
import apiObj from "./api/apiObj";

var mcrm = Object.assign(mcrmWithoutApi, apiObj);

export default mcrm;