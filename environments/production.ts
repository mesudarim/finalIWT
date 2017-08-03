import { IEnvironment } from "./env-model";

export const prodVariables:IEnvironment = {
  environmentName: 'Production Environment',
  ionicEnvName: 'prod',

  // Front-end
  apiEndpoint: 'http://localhost:8080',

  // Back-end
  dbHost: 'mongodb://rafa:behappy1@ds131583.mlab.com:31583',
  dbName: 'iwt-application'
};
