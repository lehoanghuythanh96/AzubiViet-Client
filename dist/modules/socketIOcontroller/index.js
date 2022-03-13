"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const __1 = require("../..");
const jwt = __importStar(require("jsonwebtoken"));
const caching_1 = require("../caching");
const socketEmitNames_1 = require("./socketEmitNames");
const io = new socket_io_1.Server(__1.server, {
    cors: {
        origin: __1.defaultConfig.IO_ALLOWED_FRONTEND
    }
});
let _cacheOnlineusers = caching_1.myCache.get(caching_1._cacheKey.online_users);
io.use((socket, next) => {
    const _query = socket.handshake.query;
    if (_query && _query.access_token) {
        jwt.verify(_query.access_token, __1.defaultConfig.SECRET_TOKEN, function (err, decoded) {
            if (err)
                return next(new Error('Socket IO Authentication error'));
            socket.user_info = decoded;
            next();
        });
    }
    else {
        next(new Error('Authentication error'));
    }
}).on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    /* ------------------------------- cache user ------------------------------- */
    {
        if (!_cacheOnlineusers) {
            _cacheOnlineusers = [];
        }
        let singleonlineuser = _cacheOnlineusers.find(y => y.ID == socket.user_info.user_id);
        if (!singleonlineuser) {
            singleonlineuser = {
                ID: socket.user_info.user_id,
                socket_id: socket.id,
                server_name: "",
                is_reported: false,
                report_counter: 0,
                report_sender: 0,
                report_sender_counter: 0
            };
            _cacheOnlineusers.push(singleonlineuser);
        }
        else {
            singleonlineuser.socket_id = socket.id;
        }
        caching_1.myCache.set(caching_1._cacheKey.online_users, _cacheOnlineusers);
    }
    socket.on("disconnect", () => {
        let singleonlineuser = _cacheOnlineusers.find(y => y.ID == socket.user_info.user_id);
        if (singleonlineuser) {
            singleonlineuser.socket_id = "";
            singleonlineuser.server_name = "";
            caching_1.myCache.set(caching_1._cacheKey.online_users, _cacheOnlineusers);
        }
    });
    socket.on(socketEmitNames_1.emitNames.requireUsersReloadNotis, (data) => {
        let onlineusers = caching_1.myCache.get(caching_1._cacheKey.online_users);
        if (data.userIDarr && data.userIDarr.length > 0) {
            data.userIDarr.forEach(item => {
                let _foundSocket = onlineusers.find(y => y.ID == item);
                if (_foundSocket) {
                    socket.to(_foundSocket.socket_id).emit(socketEmitNames_1.emitNames.reloadNotifications);
                }
            });
        }
    });
    socket.on(socketEmitNames_1.emitNames.requireUsersReloadPrivateMessages, (data) => {
        let onlineusers = caching_1.myCache.get(caching_1._cacheKey.online_users);
        if (data.userIDarr && data.userIDarr.length > 0) {
            data.userIDarr.forEach(item => {
                let _foundSocket = onlineusers.find(y => y.ID == item);
                if (_foundSocket) {
                    socket.to(_foundSocket.socket_id).emit(socketEmitNames_1.emitNames.reloadPrivateMessages);
                }
            });
        }
    });
    socket.on(socketEmitNames_1.emitNames.userChooseChatServer, (data) => {
        var _a;
        let foundBlocked = caching_1.blockedUsersCache.get("blocked_" + ((_a = socket.user_info) === null || _a === void 0 ? void 0 : _a.user_id));
        if (foundBlocked) {
            socket.emit(socketEmitNames_1.emitNames.youWereBlockedFromChatServer, {
                blocked_date: foundBlocked
            });
            return;
        }
        socket.join(data.server_name);
        let singleonlineuser = _cacheOnlineusers.find(y => y.ID == socket.user_info.user_id);
        if (singleonlineuser) {
            singleonlineuser.server_name = data.server_name;
            caching_1.myCache.set(caching_1._cacheKey.online_users, _cacheOnlineusers);
        }
        socket.emit(socketEmitNames_1.emitNames.clientConfirmChatServer, data.server_name);
    });
    socket.on(socketEmitNames_1.emitNames.userRequireServerSize, () => {
        let allServers = [];
        let names = socketEmitNames_1.ChatServerNames;
        Object.keys(names).forEach(item => {
            allServers.push(names[item]);
        });
        let serverSizes = [];
        allServers.forEach(item => {
            if (io.sockets.adapter.rooms.get(item)) {
                let _size = io.sockets.adapter.rooms.get(item).size;
                serverSizes.push(_size);
            }
            else {
                serverSizes.push(0);
            }
        });
        socket.emit(socketEmitNames_1.emitNames.clientGetServerSize, serverSizes);
    });
    socket.on(socketEmitNames_1.emitNames.userLeavechatroom, (data) => {
        socket.leave(data.server_name);
        let singleonlineuser = _cacheOnlineusers.find(y => y.ID == socket.user_info.user_id);
        if (singleonlineuser) {
            singleonlineuser.server_name = "";
            caching_1.myCache.set(caching_1._cacheKey.online_users, _cacheOnlineusers);
        }
        socket.emit(socketEmitNames_1.emitNames.confirmUserLeavechatroom);
    });
    socket.on(socketEmitNames_1.emitNames.requireUsersReloadServerChatMessages, () => {
        let svName = "";
        socket.rooms.forEach(item => {
            if (item != socket.id) {
                svName = item;
            }
        });
        io.sockets.to(svName).emit(socketEmitNames_1.emitNames.acceptReloadServerChatMessages);
    });
    socket.on(socketEmitNames_1.emitNames.userRequireKickUser, (data) => {
        var _a, _b;
        let _excludeList = [data.user_ID, (_a = socket.user_info) === null || _a === void 0 ? void 0 : _a.user_id];
        let serverUsers = _cacheOnlineusers.filter(y => y.server_name == data.server_name && !_excludeList.includes(y.ID));
        let foundReportedUser = _cacheOnlineusers.find(y => y.ID == data.user_ID);
        if (!foundReportedUser) {
            socket.emit(socketEmitNames_1.emitNames.kickRequirementAccepted);
            return;
        }
        let _foundReportedCache = caching_1.quickCache.get("reported_" + data.user_ID);
        if (_foundReportedCache) {
            socket.emit(socketEmitNames_1.emitNames.kickRequirementAccepted);
            return;
        }
        else {
            caching_1.quickCache.set("reported_" + data.user_ID, new Date());
        }
        if (foundReportedUser) {
            foundReportedUser.is_reported = true;
            foundReportedUser.report_counter = 0;
            foundReportedUser.report_sender = (_b = socket.user_info) === null || _b === void 0 ? void 0 : _b.user_id;
            foundReportedUser.report_sender_counter = 0;
            caching_1.myCache.set(caching_1._cacheKey.online_users, _cacheOnlineusers);
        }
        serverUsers.forEach(item => {
            socket.to(item.socket_id).emit(socketEmitNames_1.emitNames.pleaseCheckUserMessagetoKick, {
                server_name: data.server_name,
                user_ID: data.user_ID,
                user_name: data.user_name,
                message_content: data.message_content
            });
        });
        socket.emit(socketEmitNames_1.emitNames.kickRequirementAccepted);
    });
    socket.on(socketEmitNames_1.emitNames.confirmKickUserRequest, (data) => {
        let foundReportedUser = _cacheOnlineusers.find(y => y.ID == data.user_ID && y.is_reported == true);
        if (!foundReportedUser) {
            return;
        }
        let reportCounts = foundReportedUser.report_counter;
        let reportSenderCounts = foundReportedUser.report_sender_counter;
        let blockPoints = 3;
        if (data.result == true) {
            reportCounts += 1;
            foundReportedUser.report_counter = reportCounts;
            caching_1.myCache.set(caching_1._cacheKey.online_users, _cacheOnlineusers);
            if (reportCounts == blockPoints) {
                caching_1.blockedUsersCache.set("blocked_" + data.user_ID, new Date());
                foundReportedUser.report_counter = 0;
                foundReportedUser.is_reported = false;
                foundReportedUser.server_name = "";
                foundReportedUser.report_sender = 0;
                foundReportedUser.report_sender_counter = 0;
                caching_1.myCache.set(caching_1._cacheKey.online_users, _cacheOnlineusers);
                socket.to(foundReportedUser.socket_id).emit(socketEmitNames_1.emitNames.youWereBlockedFromChatServer, {
                    blocked_date: new Date()
                });
            }
        }
        else {
            reportSenderCounts += +1;
            foundReportedUser.report_sender_counter = reportSenderCounts;
            caching_1.myCache.set(caching_1._cacheKey.online_users, _cacheOnlineusers);
            if (reportSenderCounts == blockPoints) {
                let foundReporter = _cacheOnlineusers.find(y => y.ID == (foundReportedUser === null || foundReportedUser === void 0 ? void 0 : foundReportedUser.report_sender));
                if (foundReporter) {
                    caching_1.blockedUsersCache.set("blocked_" + foundReporter.ID, new Date());
                    socket.to(foundReporter.socket_id).emit(socketEmitNames_1.emitNames.youWereBlockedFromChatServer, {
                        blocked_date: new Date()
                    });
                }
                foundReportedUser.report_counter = 0;
                foundReportedUser.is_reported = false;
                foundReportedUser.server_name = "";
                foundReportedUser.report_sender = 0;
                foundReportedUser.report_sender_counter = 0;
                caching_1.myCache.set(caching_1._cacheKey.online_users, _cacheOnlineusers);
            }
        }
    });
}));
//# sourceMappingURL=index.js.map