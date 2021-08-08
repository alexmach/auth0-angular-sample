import { Injectable, InjectionToken } from "@angular/core";
import { EMPTY, iif, of, Subject, throwError } from "rxjs";
import {concatMap} from 'rxjs/operators';

// This class allows this legacy service to replicate auth0
class Auth0Error extends Error {
    constructor(public error: string, public error_description: string) {
      super(error_description);
    }
  }

/**
 * This class is 
 */
@Injectable({providedIn:'root'})
export class LegacyTokenService {
  get idTokenClaims$() {
    // unimplemented just for injection
    return EMPTY;
  }

  get isAuthenticated$() {
    // unimplemented just for injections
    return EMPTY;
  }

  getAccessTokenSilently() {
    console.log('LegacyTokenService:getAccessTokenSilently');
    return of(sessionStorage.getItem('token')).pipe(
        concatMap(token =>
            iif(() => !token, throwError(new Auth0Error('login_required', 'No InfoLink Token')), of(token))
        )
    )
  }
}

