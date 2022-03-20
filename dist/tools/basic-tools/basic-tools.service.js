"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicToolsService = void 0;
const common_1 = require("@nestjs/common");
const nestconfig = process.env;
const fs = require("fs");
const request = require("request");
const mmmagic_1 = require("mmmagic");
const mmm = require("mmmagic");
const sharp = require("sharp");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const formidable = require("formidable");
const google_auth_library_1 = require("google-auth-library");
const nestconfig_interface_1 = require("../../models/config/nestconfig.interface");
const config = nestconfig_interface_1.SystemDefaultConfig;
const _ggclient = new google_auth_library_1.OAuth2Client(nestconfig.GG_CLIENT_ID_1, nestconfig.GG_CLIENT_SECRET_1);
const cdnpath = config.CDN_PATH;
const color_list = ['#5620f0', '#02c914', '#231dff', '#f83720', '#129fc1', '#d70fa9', '#d7640f', '#c7cc00'];
let BasicToolsService = class BasicToolsService {
    constructor() {
        this.formuploadIMG = (requestinput, obj_name_in_files, path_to_save, userpayload) => {
            return new Promise((resolve, reject) => {
                formidableupload(requestinput).then((files) => {
                    return ConvertWebPandMove(files[obj_name_in_files].filepath, path_to_save, userpayload);
                }).then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });
            });
        };
        this.deleteunusedcdn = async (path_array, userpayload) => {
            for (var i = 0; i < path_array.length; i++) {
                if (!path_array[i].endsWith("/")) {
                    let truepath = cdnpath + "/" + path_array[i];
                    if (fs.existsSync(truepath)) {
                        deletefile(truepath).then(() => {
                            const index = path_array.indexOf(path_array[i]);
                            path_array.splice(index, 1);
                            if (path_array.length == 0) {
                                return;
                            }
                        }).catch(error => {
                            console.log("[Tools - Delete unused files] File not found for user " + userpayload.user_name + " Path: " + truepath);
                        });
                    }
                    else {
                        console.log("[Tools - Delete unused files] File not found for user " + userpayload.user_name + " Path: " + truepath);
                        continue;
                    }
                }
                else {
                    continue;
                }
            }
        };
        this.uploadimgbyurl = (url, path_to_save, userpayload) => {
            return new Promise((resolve, reject) => {
                downloadfilefromurl(url, path_to_save, userpayload).then((result) => {
                    return ConvertWebPandMove(result, path_to_save, userpayload);
                }).then((result) => {
                    resolve(result);
                }).catch(error => {
                    reject(error);
                });
            });
        };
    }
    async matchbcrypt(strtobecompared, encryptedstr) {
        try {
            let _result = await bcrypt.compare(strtobecompared, encryptedstr);
            return _result;
        }
        catch (error) {
            throw new common_1.NotImplementedException({ message: "Encryption matching Fn not working" });
        }
    }
    async verifyGGidtoken(body) {
        let _verification = await _ggclient.verifyIdToken({
            idToken: body.idToken,
            audience: nestconfig.GG_CLIENT_ID_1,
        });
        let _payload = _verification.getPayload();
        return _payload;
    }
    async genBcrypt(pw) {
        const saltRounds = 10;
        try {
            let _salt = await bcrypt.genSalt(saltRounds);
            let _hashed = await bcrypt.hash(pw, _salt);
            return _hashed;
        }
        catch (error) {
            throw new common_1.NotImplementedException({ message: "Encryption generator not implemented" });
        }
    }
};
BasicToolsService = __decorate([
    (0, common_1.Injectable)()
], BasicToolsService);
exports.BasicToolsService = BasicToolsService;
const formidableupload = (requestinput) => {
    return new Promise(function (resolve, reject) {
        const form = formidable({
            multiples: false,
            maxFileSize: 25000000
        });
        form.parse(requestinput, (error, fields, files) => {
            if (error) {
                function getKeyByValue(object, value) {
                    return Object.keys(object).find(key => object[key] === value);
                }
                let _errmsg = "[Formidable upload] Error: " + getKeyByValue(formidable.errors, error.code);
                reject(new common_1.NotImplementedException({ message: _errmsg }));
            }
            ;
            if (files) {
                resolve(files);
            }
        });
    });
};
const ConvertWebPandMove = (filepath, path_to_save, userpayload) => {
    return new Promise(function (resolve, reject) {
        checkIMG(filepath).then(() => {
            let newName = crypto.randomBytes(20).toString("hex") + ".webp";
            let destination = cdnpath + '/' + path_to_save + newName;
            let outputlink = path_to_save + newName;
            sharp(filepath)
                .webp({ lossless: false })
                .resize({ width: 2000 })
                .toFile(destination, function (error, result) {
                fs.unlinkSync(filepath);
                if (error) {
                    reject(new common_1.NotImplementedException({ message: "Sharp webp movement not worked" }));
                }
                let newresult = Object.assign({}, result);
                newresult.newFilepath = outputlink;
                newresult.newFilename = newName;
                newresult.user_name = userpayload.user_name;
                newresult.user_id = userpayload.user_id;
                resolve(newresult);
            });
        }).catch((error) => {
            reject(error);
        });
    });
};
const checkIMG = (filepath) => {
    return new Promise(function (resolve, reject) {
        var magic = new mmmagic_1.Magic(mmm.MAGIC_MIME_TYPE);
        magic.detectFile(filepath, function (error, result) {
            if (error)
                reject(new common_1.NotImplementedException({ message: "[CheckIMG tool] Can not check file type" }));
            if (result == "image/png" ||
                result == "image/jpeg" ||
                result == "image/bmp") {
                resolve(result);
            }
            else {
                fs.unlinkSync(filepath);
                reject(new common_1.UnsupportedMediaTypeException());
            }
        });
    });
};
const deletefile = (path) => new Promise((resolve, reject) => {
    fs.unlink(path, (error) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(true);
        }
    });
});
const downloadfilefromurl = (uri, filepath, userpayload) => new Promise((resolve, reject) => {
    uri = encodeURI(uri);
    request.head(uri, function (error, res, body) {
        if (error) {
            reject(new common_1.BadRequestException({ message: "Url is empty or invalid" }));
        }
        if (res) {
            var filesize = res.headers['content-length'];
            if (parseInt(filesize) <= 25000000) {
                let newfilename = crypto.randomBytes(20).toString("hex");
                let newfilepath = cdnpath + '/' + filepath + newfilename;
                request(uri).pipe(fs.createWriteStream(newfilepath)).on('close', () => { resolve(newfilepath); }).on('error', error => { reject(new common_1.NotImplementedException({ message: error })); });
            }
            else {
                reject(new common_1.PayloadTooLargeException({ message: "Image File Too Large" }));
            }
        }
        else if (userpayload.user_role == 'admin') {
            let newfilename = crypto.randomBytes(20).toString("hex");
            let newfilepath = cdnpath + '/' + filepath + newfilename;
            request(uri).pipe(fs.createWriteStream(newfilepath)).on('close', () => { resolve(newfilepath); }).on('error', error => { reject(new common_1.NotImplementedException({ message: error })); });
        }
        else {
            reject(new common_1.BadGatewayException({ message: "Can't download file from this url" }));
        }
    });
});
//# sourceMappingURL=basic-tools.service.js.map