/**
 * [Angular Dependency injection with InjectionToken()]
 * See Angular Docs:
 *    => https://angular.io/guide/dependency-injection
 *    => https://angular.io/guide/dependency-injection#non-class-dependencies
 *    => https://angular.io/guide/dependency-injection#injection-token
 *    => https://angular.io/api/core/InjectionToken
 */

 import { InjectionToken } from "@angular/core";
 import { IEnvironment } from "../../../environments/env-model";

 export let EnvVariables = new InjectionToken<IEnvironment>("env.variables");
