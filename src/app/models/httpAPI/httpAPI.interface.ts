import { HttpParams } from "@angular/common/http";

export interface getAPI {
  urlsuffix: string | '',
  param_variables?: HttpParams
}

export interface postAPI {
  urlsuffix: string | '',
  body: Object | {},
  param_variables?: HttpParams
}

export interface FileUploadFormPayload {
  inputfile: File,
  upload_url_suffix: string,
  FileObjName: string,
  param_variables?: HttpParams
}

export interface FileUploadbyUrlPayload {
  body: Object,
  upload_url_suffix: string,
  param_variables?: HttpParams
}