// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  app_key: "2771637652",
  app_secret: "f9b2e8f60f53afd7ed6eb2555b3cd535",
  url_omie: "http://app.omie.com.br/api/v1",
  url_fcnab: "",
  firebase: {
    apiKey: "AIzaSyABiL2B_lsthRhRWiLYtF0ncOCv7IiPG1U",
    authDomain: "fcnabdb.firebaseapp.com",
    databaseURL: "https://fcnabdb.firebaseio.com",
    projectId: "fcnabdb",
    storageBucket: "fcnabdb.appspot.com",
    messagingSenderId: "616997090632"
  }
};
