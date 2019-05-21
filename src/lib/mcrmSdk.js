"use strict";

import env from "./env";

var ENV_ENUM = env.ENV_ENUM;

import sdk from "./sdk";

var mcrmSdk = new sdk.Sdk(env.getENV());

export default { ENV_ENUM, mcrmSdk }