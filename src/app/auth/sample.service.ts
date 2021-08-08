import { Injectable } from '@angular/core';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import { LegacyTokenService } from './token.service';

@Injectable()
export class SampleService {
    constructor(private authService:Auth0Service){}

    getToken(){
        console.log('AuthService:getToken');
        return this.authService.getAccessTokenSilently();
    }
}

@Injectable({providedIn:'root'})
export class LegacySampleService {
    constructor(private tokenService: LegacyTokenService){}
    get isAuthorized(){
        return true;
    }
    getToken(){
        console.log('LegacyAuthService:getToken');
        return this.tokenService.getAccessTokenSilently();
    }
}
