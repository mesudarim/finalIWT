import { IEnvironment } from "./env-model";

export const prodVariables:IEnvironment = {
  environmentName: 'Production Environment',
  ionicEnvName: 'prod',

  // Front-end
  apiEndpoint: 'https://hidden-retreat-24990.herokuapp.com',

  // Back-end
  dbHost: 'mongodb://rafa:behappy1@ds131583.mlab.com:31583',
  dbName: 'iwt-application'
};
