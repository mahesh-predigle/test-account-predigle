import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

//OIDC
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ActivatedRoute } from '@angular/router';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private oauthService: OAuthService 
    ) {
    // this.configureOAuth();
  }

  private configureOAuth() {
    this.oauthService.configure({
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,// for not checking exact above url in given
      redirectUri: window.location.origin,// redirect after logged in to google to my application
      clientId:
        '101289191754-ue0omn4map44ra6enrtat6kui29up7kh.apps.googleusercontent.com',
      responseType: 'token id_token',
      scope: 'openid profile email',
      showDebugInformation: true,
    });
  
    // historyCleanupOff
    // triggerAuthorizationResultEvent
    this.oauthService.logoutUrl = "https://www.google.com/accounts/Logout";
  
  }
}
