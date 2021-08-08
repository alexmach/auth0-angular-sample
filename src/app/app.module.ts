import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleModule } from './auth/sample-auth.module';
import { SecureComponent } from './secure.component';
import { UnsecureComponent } from './unsecure.component';

@NgModule({
  declarations: [
    AppComponent,
    SecureComponent,
    UnsecureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SampleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
