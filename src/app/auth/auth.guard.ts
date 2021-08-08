import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { LegacySampleService } from "./sample.service";

export class LegacyAuthGuard implements CanActivate{
    constructor(private legacySampleService:LegacySampleService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('checked')
        return this.legacySampleService.isAuthorized;
    }
}
