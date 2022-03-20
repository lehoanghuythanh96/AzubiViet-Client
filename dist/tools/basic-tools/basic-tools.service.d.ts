import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { GGLoginauthBody } from 'src/models/login/logininfo.interface';
export declare class BasicToolsService {
    matchbcrypt(strtobecompared: string, encryptedstr: string): Promise<boolean>;
    verifyGGidtoken(body: GGLoginauthBody): Promise<import("google-auth-library").TokenPayload>;
    readonly formuploadIMG: (requestinput: any, obj_name_in_files: string, path_to_save: string, userpayload: userJWTpayload) => Promise<unknown>;
    readonly deleteunusedcdn: (path_array: string[], userpayload: userJWTpayload) => Promise<void>;
    readonly uploadimgbyurl: (url: string, path_to_save: string, userpayload: userJWTpayload) => Promise<unknown>;
    genBcrypt(pw: string): Promise<string>;
}
