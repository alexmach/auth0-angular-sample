import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_GUARD } from './auth/auth.model';
import { SecureComponent } from './secure.component';
import { UnsecureComponent } from './unsecure.component';

const routes: Routes = [{
  path:'secure',
  canActivate: [AUTH_GUARD],
  component: SecureComponent
},{
  path:'',
  component:UnsecureComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
