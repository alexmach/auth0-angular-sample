import { Component } from "@angular/core";
import { take } from "rxjs/operators";
import { SampleService } from "./auth/sample.service";

@Component({
    selector: 'app-secure',
    template:'secure:{{token}}'
})
export class SecureComponent {
    token:string='';
    constructor(private sampleService:SampleService){
        this.sampleService.getToken().pipe(take(1)).subscribe(token=>this.token=token);
    }
}
