import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

//OIDC
import { OAuthModule, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ActivatedRoute } from '@angular/router';

// We need a factory since localStorage is not available at AOT build time
export function storageFactory(): OAuthStorage {
  return localStorage;
}
@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    { provide: OAuthStorage, useFactory: storageFactory }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private oauthService: OAuthService 
    ) {
    this.configureOAuth();
  }

  private configureOAuth() {
    this.oauthService.configure({
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,// for not checking exact above url in given
      redirectUri: window.location.origin,// redirect after logged in to google to my application
      // redirectUri: 'http://localhost:4200',// redirect after logged in to google to my application
      clientId:
        '101289191754-ue0omn4map44ra6enrtat6kui29up7kh.apps.googleusercontent.com',
      responseType: 'token id_token',
      scope: 'openid profile email',
      showDebugInformation: true,
      // customQueryParams: {
      //   prompt: 'select_account' // Always prompt for account selection
      // },
      // silentRefreshRedirectUri: window.location.origin,
      // useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
      // silentRefreshTimeout: 5000, // For faster testing
      // timeoutFactor: 0.25, // For faster testing
      // sessionChecksEnabled: true,
    });
    // this.oauthService.logoutUrl = "https://www.google.com/accounts/Logout";
    // this.oauthService.loadDiscoveryDocumentAndLogin();
    // this.oauthService.initImplicitFlow();
  
  }
}
