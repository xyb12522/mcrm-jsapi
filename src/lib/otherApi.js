"use strict";

import env from "./env";
var ENV = env.getENV();

export default {
    ios: ENV.platform === env.ENV_ENUM.ios,
    android: ENV.platform === env.ENV_ENUM.android,
    pc: ENV.platform === env.ENV_ENUM.pc
};
