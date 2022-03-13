export enum ChatServerNames {
    justDoIt = "Just Do It",
    workHardPlayHard = "Work Hard Play Hard",
    beYourSelf = "Be Your Self",
    nothingMatters = "Nothing Matters"
}

export const emitNames = {
    requireUserReloadNotis: {
        name: "requireUsersReloadNotis",
        type: {
            userIDarr: <number[]>[]
        }
    },
    reloadNotifications: "reload_notifications",
    requireUsersReloadPrivateMessages: {
        name: "requireUsersReloadPrivateMessages",
        type: {
            userIDarr: <number[]>[]
        }
    },
    reloadPrivateMessages: "reloadPrivateMessages",
    userChooseChatServer: {
        name: "userChooseChatServer",
        type: {
            server_name: ChatServerNames
        }
    },
    clientConfirmChatServer: "clientConfirmChatServer",
    userRequireServerSize: "userRequireServerSize",
    clientGetServerSize: "clientGetServerSize",
    userLeavechatroom: {
        name: "userLeavechatroom",
        type: {
            server_name: ChatServerNames
        }
    },
    confirmUserLeavechatroom: "confirmUserLeavechatroom",
    requireUsersReloadServerChatMessages: "requireUsersReloadServerChatMessages",
    acceptReloadServerChatMessages: "acceptReloadServerChatMessages",
    userRequireKickUser: {
        name: "userRequireKickUser",
        type: {
            server_name: ChatServerNames,
            user_ID: 0,
            user_name: "",
            message_content: ""
        }
    },
    kickRequirementAccepted: "kickRequirementAccepted",
    pleaseCheckUserMessagetoKick: "pleaseCheckUserMessagetoKick",
    confirmKickUserRequest: "confirmKickUserRequest",
    youWereBlockedFromChatServer: "youWereBlockedFromChatServer"
}