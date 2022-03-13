"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._cacheKey = exports.quickCache = exports.blockedUsersCache = exports.myCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
exports.myCache = new node_cache_1.default({ stdTTL: 86400, checkperiod: 3600 });
exports.blockedUsersCache = new node_cache_1.default({ stdTTL: 86400 * 3, checkperiod: 3600 });
exports.quickCache = new node_cache_1.default({ stdTTL: 60, checkperiod: 30 });
exports._cacheKey = {
    online_users: "onlineusers"
};
//# sourceMappingURL=index.js.map