import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, Inject, InjectionToken, NgModule } from "@angular/core";
import { AuthClientConfig, AuthGuard, AuthHttpInterceptor, AuthModule, AuthService as Auth0Service } from "@auth0/auth0-angular";
import { of } from "rxjs";
import { LegacyAuthGuard } from "./auth.guard";
import { AUTH_GUARD } from "./auth.model";
import { SampleService, LegacySampleService } from "./sample.service";
import { ConfigService } from "./config.service";
import { LegacyTokenService } from "./token.service";

const AUTH_SERVICE = new InjectionToken<any>('Auth Service');
const AUTH0_ENABLED = new InjectionToken<boolean>('Enabled');

/**
 * Initialize App Dynamically
 * 
 * @param config Config Service
 * @param authConfig Auth0 Client Config
 * @returns Promise config load
 */
function configInitializer(
    config: ConfigService,
    authConfig: AuthClientConfig
) {
    return () => of({
        clientId: '123',  // fill in correct value
        domain: 'domain', // fill in correct value
        enabled: false,   // toggle to enable or disable
        httpInterceptor: {
            allowedList: [
                {
                    uriMatcher: (uri: string) => uri.indexOf('/api') > -1
                }
            ]
        }
    })
        .toPromise()
        .then((loadedConfig: any) => {
            config.config = loadedConfig
            authConfig.set(loadedConfig)
        });
}

@NgModule({
    imports: [
        AuthModule.forRoot()
    ],
    providers: [{
        provide: AUTH0_ENABLED,
        useFactory: (config:any)=>config.config.enabled,
        deps:[ConfigService]
    },{
        provide: AUTH_SERVICE,
        useClass: Auth0Service
    },{
        // Auth0Service needs to be replaced IF auth0 is not enabled
        // This is the service that is being injected into AuthHttpInterceptor
        provide: Auth0Service,
        useFactory: (enabled:boolean, auth0Service:any, legacyTokenService:any)=>enabled?auth0Service:legacyTokenService,
        deps:[AUTH0_ENABLED,AUTH_SERVICE,LegacyTokenService]
    },{
        provide: SampleService,
        useFactory: (enabled:boolean, auth0Service:any, legacyAuthService:any)=>enabled?auth0Service:legacyAuthService,
        deps:[AUTH0_ENABLED,AUTH_SERVICE,LegacySampleService]
    },{
        provide: AUTH_GUARD,
        useFactory: (
            enabled:boolean,
            auth0Service:any,
            legacyAuthService:any
            )=>enabled?new AuthGuard(auth0Service):new LegacyAuthGuard(legacyAuthService) ,
        deps: [AUTH0_ENABLED, Auth0Service, LegacySampleService ]
    },{
        // Using the auth0-angular Interceptor for both legacy and auth0
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHttpInterceptor,
        multi: true
    },{
        provide: APP_INITIALIZER,
        useFactory: configInitializer,
        deps:[ConfigService,AuthClientConfig],
        multi: true
    }]
})
export class SampleModule { }
