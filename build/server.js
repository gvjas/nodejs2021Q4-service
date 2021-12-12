"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./common/config");
const app_1 = __importDefault(require("./app"));
const PORT = config_1.configConst.PORT || 4000;
/**
 * Start server of fastify
 * @param not params
 * @returns type Promise<void>
 */
const startServer = async () => {
    try {
        await app_1.default.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
    }
    catch (err) {
        app_1.default.log.error(err);
        process.exit(1);
    }
};
startServer();
