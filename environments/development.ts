import { IEnvironment } from "./env-model";

export const devVariables:IEnvironment = {
  environmentName: 'Development Environment',
  ionicEnvName: 'dev',

  // Front-end
  apiEndpoint: 'http://localhost:8080',

  // Back-end
  dbHost: 'mongodb://localhost:27017',
  dbName: 'test'
};
