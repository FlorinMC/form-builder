// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    apiUrl: 'http://services02.beeware.de:1002/',
    authAppUrl: `http://172.28.67.78/`,
    fsmAppUrl: `${window.location.origin}/fieldservicemanagement`,
    AdminCentralAppUrl: `${window.location.origin}/admincentral`,
    licenceSerivceApiUrl: 'http://services02.beeware.de:6401/',
    fsmApiUrl: 'http://services02.beeware.de:5401/',
    storageApiUrl: 'https://sodalisdevelopstorage.blob.core.windows.net/',
    storageSAS: '?sv=2016-05-31&ss=bfqt&srt=sco&sp=rwdlacup&se=2018-03-15T18:32:46Z&st=2017-03-15T10:32:46Z&' +
    'spr=https,http&sig=HxqIqpwhh9STrMIugpN2j%2B1K%2B7qSDMVKvdVQ%2FbGUwwM%3D&sr=f',
    container: 'portal',
    appPath: `${window.location.origin}/portal/`,
};
