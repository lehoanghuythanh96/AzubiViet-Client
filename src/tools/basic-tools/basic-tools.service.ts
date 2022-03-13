import { BadGatewayException, BadRequestException, ForbiddenException, Injectable, NotImplementedException, PayloadTooLargeException, UnprocessableEntityException, UnsupportedMediaTypeException } from '@nestjs/common';
const nestconfig: NestConfig = <any>process.env;
import * as fs from 'fs';
import * as request from 'request';
import { Magic } from 'mmmagic';
import * as mmm from 'mmmagic';
import * as sharp from 'sharp';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import * as formidable from 'formidable';

import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { NestConfig, SystemDefaultConfig } from 'src/models/config/nestconfig.interface';
import { GGLoginauthBody } from 'src/models/login/logininfo.interface';
const config = SystemDefaultConfig;
const _ggclient = new OAuth2Client(
    nestconfig.GG_CLIENT_ID_1,
    nestconfig.GG_CLIENT_SECRET_1
);

const cdnpath = config.CDN_PATH;
const color_list = ['#5620f0', '#02c914', '#231dff', '#f83720', '#129fc1', '#d70fa9', '#d7640f', '#c7cc00'];

@Injectable()
export class BasicToolsService {

    async matchbcrypt(strtobecompared: string, encryptedstr: string) {
        try {
            let _result = await bcrypt.compare(strtobecompared, encryptedstr);
            return _result;
        } catch (error) {
            throw new NotImplementedException({ message: "Encryption matching Fn not working" })
        }
    }

    async verifyGGidtoken(body: GGLoginauthBody) {

        let _verification = await _ggclient.verifyIdToken({
            idToken: body.idToken,
            audience: nestconfig.GG_CLIENT_ID_1,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });

        let _payload = _verification.getPayload();

        return _payload;

    }

    public readonly formuploadIMG = (requestinput: any, obj_name_in_files: string, path_to_save: string, userpayload: userJWTpayload) => {
        return new Promise((resolve, reject) => {
            formidableupload(requestinput).then(
                (files: any) => {
                    return ConvertWebPandMove(files[obj_name_in_files].filepath, path_to_save, userpayload);
                }
            ).then(
                (result) => {
                    resolve(result);
                }
            ).catch((error) => {
                reject(error);
            })
        });
    }

    public readonly deleteunusedcdn = async (path_array: string[], userpayload: userJWTpayload) => {
        for (var i = 0; i < path_array.length; i++) {
            if (!path_array[i].endsWith("/")) {
                let truepath = cdnpath + "/" + path_array[i];
                if (fs.existsSync(truepath)) {
                    deletefile(truepath).then(
                        () => {
                            const index = path_array.indexOf(path_array[i]);
                            path_array.splice(index, 1);
                            if (path_array.length == 0) {
                                return;
                            }
                        }
                    ).catch(
                        error => {
                            console.log("[Tools - Delete unused files] File not found for user " + userpayload.user_name + " Path: " + truepath);
                        }
                    )
                } else {
                    console.log("[Tools - Delete unused files] File not found for user " + userpayload.user_name + " Path: " + truepath);
                    continue;
                }
            } else {
                continue;
            }
        }
    }

    public readonly uploadimgbyurl = (url: string, path_to_save: string, userpayload: userJWTpayload) => {
        return new Promise((resolve, reject) => {
            downloadfilefromurl(
                url,
                path_to_save,
                userpayload
            ).then(
                (result: string) => {
                    return ConvertWebPandMove(
                        result,
                        path_to_save,
                        userpayload
                    );
                }
            ).then(
                (result) => {
                    resolve(result);
                }
            ).catch(error => {
                reject(error);
            });
        })
    }

    async genBcrypt(pw: string) {
        const saltRounds = 10;

        try {

            let _salt = await bcrypt.genSalt(saltRounds);

            let _hashed = await bcrypt.hash(pw, _salt);

            return _hashed;

        } catch (error) {
            throw new NotImplementedException({ message: "Encryption generator not implemented" })
        }
    }
}

const formidableupload = (requestinput: any) => {
    return new Promise(function (resolve, reject) {
        const form = formidable(
            {
                multiples: false,
                maxFileSize: 25000000
            }
        );
        form.parse(requestinput, (error, fields, files) => {
            if (error) {
                function getKeyByValue(object: any, value: any) {
                    return Object.keys(object).find(key => object[key] === value);
                }
                let _errmsg = "[Formidable upload] Error: " + getKeyByValue(formidable.errors, error.code);
                reject(new NotImplementedException({ message: _errmsg }))
            };
            if (files) {
                resolve(files);
            }
        });
    })
}

const ConvertWebPandMove = (filepath: string, path_to_save: string, userpayload: userJWTpayload) => {
    return new Promise(function (resolve, reject) {
        checkIMG(filepath).then(
            () => {
                let newName = crypto.randomBytes(20).toString("hex") + ".webp";
                let destination = cdnpath + '/' + path_to_save + newName;
                let outputlink = path_to_save + newName;
                sharp(filepath)
                    .webp({ lossless: false })
                    .resize({ width: 2000 })
                    .toFile(destination, function (error, result) {
                        fs.unlinkSync(filepath);
                        if (error) {
                            reject(
                                new NotImplementedException({ message: "Sharp webp movement not worked" })
                            )
                        }
                        let newresult: any = { ...result };
                        newresult.newFilepath = outputlink;
                        newresult.newFilename = newName;
                        newresult.user_name = userpayload.user_name;
                        newresult.user_id = userpayload.user_id;
                        resolve(newresult);
                    })
            }
        ).catch(
            (error) => {
                reject(error);
            }
        );
    })
}

const checkIMG = (filepath: string) => {
    return new Promise(function (resolve, reject) {
        var magic = new Magic(mmm.MAGIC_MIME_TYPE);
        magic.detectFile(filepath, function (error, result) {
            if (error) reject(new NotImplementedException({ message: "[CheckIMG tool] Can not check file type" }));
            if (
                result == "image/png" ||
                result == "image/jpeg" ||
                result == "image/bmp"
            ) {
                resolve(result);
            } else {
                fs.unlinkSync(filepath);
                reject(new UnsupportedMediaTypeException());
            }
        });
    });
}

const deletefile = (path: string) => new Promise((resolve, reject) => {
    fs.unlink(path, (error) => {
        if (error) {
            reject(error)
        } else {
            resolve(true);
        }
    })
})

const downloadfilefromurl = (uri: string, filepath: string, userpayload: userJWTpayload) => new Promise((resolve, reject) => {
    uri = encodeURI(uri);
    request.head(uri, function (error: any, res: any, body) {
        if (error) {
            reject(new BadRequestException({ message: "Url is empty or invalid" }));
        }
        if (res) {
            var filesize = res.headers['content-length'];
            if (parseInt(filesize) <= 25000000) {
                let newfilename = crypto.randomBytes(20).toString("hex");
                let newfilepath = cdnpath + '/' + filepath + newfilename;
                request(uri).pipe(fs.createWriteStream(newfilepath)).on('close',
                    () => { resolve(newfilepath); }
                ).on('error', error => { reject(new NotImplementedException({ message: error })) });
            } else {
                reject(new PayloadTooLargeException({ message: "Image File Too Large" }))
            }
        } else if (userpayload.user_role == 'admin') {
            let newfilename = crypto.randomBytes(20).toString("hex");
            let newfilepath = cdnpath + '/' + filepath + newfilename;
            request(uri).pipe(fs.createWriteStream(newfilepath)).on('close',
                () => { resolve(newfilepath); }
            ).on('error', error => { reject(new NotImplementedException({ message: error })) });
        } else {
            reject(new BadGatewayException({ message: "Can't download file from this url" }))
        }
    })
})
