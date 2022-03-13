// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_SOCKET_URL: "http://localhost:8080", // Socket IO server
  BASE_CDN_URL: "http://localhost:6478", // CDN Server
  BASE_API_URL: "http://localhost:6478",  // Database server
  GG_CLIENT_ID: "998618646884-okn5n7a5e78haf4aeneaiub4fps6kpg9.apps.googleusercontent.com", // GG login client ID
  RECAPTCHA_SITE_KEY: "6LfTGIkeAAAAAGLVtJhkNA9fzMH3Y6S9faEypd6P" // Recaptcha site key
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
