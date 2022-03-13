import { Server, Socket } from "socket.io";
import { defaultConfig, server } from "../..";
import { ParsedUrlQuery } from 'querystring';
import * as jwt from 'jsonwebtoken';
import { userJWTpayload } from "../../models/JWT/userjwtpayload.interface";
import { myCache, _cacheKey, blockedUsersCache, quickCache } from "../caching";
import { ChatServerNames, emitNames } from "./socketEmitNames";

const io = new Server(server, {
    cors: {
        origin: defaultConfig.IO_ALLOWED_FRONTEND
    }
});

let _cacheOnlineusers: singleSocketOnlineuser[] = myCache.get(_cacheKey.online_users)

io.use((socket: _socket, next) => {
    const _query: ParsedUrlQuery = socket.handshake.query;
    if (_query && _query.access_token) {
        jwt.verify(<string>_query.access_token, defaultConfig.SECRET_TOKEN, function (err: any, decoded: any) {
            if (err) return next(new Error('Socket IO Authentication error'));
            socket.user_info = decoded;
            next();
        });
    }
    else {
        next(new Error('Authentication error'));
    }
}).on('connection',

    async (socket: _socket) => {

        /* ------------------------------- cache user ------------------------------- */
        {
            if (!_cacheOnlineusers) {
                _cacheOnlineusers = []
            }

            let singleonlineuser: singleSocketOnlineuser = _cacheOnlineusers.find(
                y => y.ID == socket.user_info!.user_id
            )!

            if (!singleonlineuser) {
                singleonlineuser = {
                    ID: socket.user_info!.user_id,
                    socket_id: socket.id,
                    server_name: "",
                    is_reported: false,
                    report_counter: 0,
                    report_sender: 0,
                    report_sender_counter: 0
                }
                _cacheOnlineusers.push(singleonlineuser);
            } else {
                singleonlineuser.socket_id = socket.id
            }

            myCache.set(_cacheKey.online_users, _cacheOnlineusers)

        }

        socket.on("disconnect", () => {
            let singleonlineuser: singleSocketOnlineuser = _cacheOnlineusers.find(
                y => y.ID == socket.user_info!.user_id
            )!
            if (singleonlineuser) {
                singleonlineuser.socket_id = ""
                singleonlineuser.server_name = ""
                myCache.set(_cacheKey.online_users, _cacheOnlineusers)
            }
        })

        socket.on(emitNames.requireUsersReloadNotis,
            (data:
                {
                    userIDarr: number[]
                }
            ) => {
                let onlineusers: singleSocketOnlineuser[] = myCache.get(_cacheKey.online_users);

                if (data.userIDarr && data.userIDarr.length > 0) {
                    data.userIDarr.forEach(
                        item => {
                            let _foundSocket = onlineusers.find(
                                y => y.ID == item
                            )
                            if (_foundSocket) {
                                socket.to(_foundSocket.socket_id).emit(emitNames.reloadNotifications)
                            }
                        }
                    )
                }
            }
        )

        socket.on(emitNames.requireUsersReloadPrivateMessages,
            (data:
                {
                    userIDarr: number[]
                }
            ) => {
                let onlineusers: singleSocketOnlineuser[] = myCache.get(_cacheKey.online_users);

                if (data.userIDarr && data.userIDarr.length > 0) {
                    data.userIDarr.forEach(
                        item => {
                            let _foundSocket = onlineusers.find(
                                y => y.ID == item
                            )
                            if (_foundSocket) {
                                socket.to(_foundSocket.socket_id).emit(emitNames.reloadPrivateMessages)
                            }
                        }
                    )
                }
            }
        )

        socket.on(emitNames.userChooseChatServer,
            (
                data: {
                    server_name: ChatServerNames
                }
            ) => {

                let foundBlocked = blockedUsersCache.get("blocked_" + socket.user_info?.user_id)

                if (foundBlocked) {
                    socket.emit(emitNames.youWereBlockedFromChatServer, {
                        blocked_date: foundBlocked
                    })
                    return
                }

                socket.join(data.server_name)

                let singleonlineuser: singleSocketOnlineuser = _cacheOnlineusers.find(
                    y => y.ID == socket.user_info!.user_id
                )!
                if (singleonlineuser) {
                    singleonlineuser.server_name = data.server_name
                    myCache.set(_cacheKey.online_users, _cacheOnlineusers)
                }

                socket.emit(emitNames.clientConfirmChatServer, data.server_name)
            }
        )

        socket.on(emitNames.userRequireServerSize,
            () => {
                let allServers: string[] = []
                let names: any = ChatServerNames;
                Object.keys(names).forEach(
                    item => {
                        allServers.push(names[item])
                    }
                )
                let serverSizes: number[] = []
                allServers.forEach(
                    item => {
                        if (io.sockets.adapter.rooms.get(item)) {
                            let _size = io.sockets.adapter.rooms.get(item)!.size
                            serverSizes.push(_size)
                        } else {
                            serverSizes.push(0)
                        }
                    }
                )
                socket.emit(emitNames.clientGetServerSize, serverSizes)
            }
        )

        socket.on(emitNames.userLeavechatroom,
            (
                data: {
                    server_name: string
                }
            ) => {
                socket.leave(data.server_name)
                let singleonlineuser: singleSocketOnlineuser = _cacheOnlineusers.find(
                    y => y.ID == socket.user_info!.user_id
                )!
                if (singleonlineuser) {
                    singleonlineuser.server_name = ""
                    myCache.set(_cacheKey.online_users, _cacheOnlineusers)
                }
                socket.emit(emitNames.confirmUserLeavechatroom)
            }
        )

        socket.on(emitNames.requireUsersReloadServerChatMessages,
            () => {
                let svName = "";
                socket.rooms.forEach(
                    item => {
                        if (item != socket.id) {
                            svName = item
                        }
                    }
                )
                io.sockets.to(svName).emit(emitNames.acceptReloadServerChatMessages)
            }
        )

        socket.on(emitNames.userRequireKickUser,
            (
                data: {
                    server_name: ChatServerNames,
                    user_ID: number,
                    user_name: string,
                    message_content: string
                }
            ) => {

                let _excludeList = [data.user_ID, socket.user_info?.user_id]
                let serverUsers: singleSocketOnlineuser[] = _cacheOnlineusers.filter(
                    y => y.server_name == data.server_name && !_excludeList.includes(y.ID)
                )!

                let foundReportedUser = _cacheOnlineusers.find(
                    y => y.ID == data.user_ID
                )

                if (!foundReportedUser) {
                    socket.emit(emitNames.kickRequirementAccepted)
                    return
                }

                let _foundReportedCache = quickCache.get("reported_" + data.user_ID)
                if (_foundReportedCache) {
                    socket.emit(emitNames.kickRequirementAccepted)
                    return
                } else {
                    quickCache.set("reported_" + data.user_ID, new Date())
                }

                if (foundReportedUser) {
                    foundReportedUser.is_reported = true
                    foundReportedUser.report_counter = 0
                    foundReportedUser.report_sender = socket.user_info?.user_id!
                    foundReportedUser.report_sender_counter = 0
                    myCache.set(_cacheKey.online_users, _cacheOnlineusers)
                }

                serverUsers.forEach(
                    item => {
                        socket.to(item.socket_id).emit(emitNames.pleaseCheckUserMessagetoKick, {
                            server_name: data.server_name,
                            user_ID: data.user_ID,
                            user_name: data.user_name,
                            message_content: data.message_content
                        })
                    }
                )

                socket.emit(emitNames.kickRequirementAccepted)

            }
        )

        socket.on(emitNames.confirmKickUserRequest,
            (
                data: {
                    user_ID: number,
                    result: boolean
                }
            ) => {

                let foundReportedUser = _cacheOnlineusers.find(
                    y => y.ID == data.user_ID && y.is_reported == true
                )

                if (!foundReportedUser) {
                    return
                }

                let reportCounts = foundReportedUser.report_counter;
                let reportSenderCounts = foundReportedUser.report_sender_counter

                let blockPoints = 3

                if (data.result == true) {
                    reportCounts += 1
                    foundReportedUser.report_counter = reportCounts
                    myCache.set(_cacheKey.online_users, _cacheOnlineusers)
                    if (reportCounts == blockPoints) {
                        blockedUsersCache.set("blocked_" + data.user_ID, new Date())
                        foundReportedUser.report_counter = 0
                        foundReportedUser.is_reported = false
                        foundReportedUser.server_name = ""
                        foundReportedUser.report_sender = 0
                        foundReportedUser.report_sender_counter = 0
                        myCache.set(_cacheKey.online_users, _cacheOnlineusers)
                        socket.to(foundReportedUser.socket_id).emit(emitNames.youWereBlockedFromChatServer, {
                            blocked_date: new Date()
                        })
                    }
                } else {
                    reportSenderCounts += + 1
                    foundReportedUser.report_sender_counter = reportSenderCounts
                    myCache.set(_cacheKey.online_users, _cacheOnlineusers)
                    if (reportSenderCounts == blockPoints) {

                        let foundReporter = _cacheOnlineusers.find(
                            y => y.ID == foundReportedUser?.report_sender
                        )
                        if (foundReporter) {
                            blockedUsersCache.set("blocked_" + foundReporter.ID, new Date())
                            socket.to(foundReporter.socket_id).emit(emitNames.youWereBlockedFromChatServer, {
                                blocked_date: new Date()
                            })
                        }
                        foundReportedUser.report_counter = 0
                        foundReportedUser.is_reported = false
                        foundReportedUser.server_name = ""
                        foundReportedUser.report_sender = 0
                        foundReportedUser.report_sender_counter = 0
                        myCache.set(_cacheKey.online_users, _cacheOnlineusers)
                    }
                }

            }
        )

    }
);

interface _socket extends Socket {
    user_info?: userJWTpayload,
    user_current_server?: any
}

interface singleSocketOnlineuser {
    ID: number
    socket_id: string,
    server_name: string,
    is_reported: boolean
    report_counter: number,
    report_sender: number,
    report_sender_counter: number
}