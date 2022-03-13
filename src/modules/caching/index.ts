import NodeCache from "node-cache";
export const myCache : any = new NodeCache({ stdTTL: 86400, checkperiod: 3600 });
export const blockedUsersCache: any = new NodeCache({ stdTTL: 86400 * 3, checkperiod: 3600 });
export const quickCache: any = new NodeCache({ stdTTL: 60, checkperiod: 30 });

export const _cacheKey = {
    online_users: "onlineusers"
}