import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) {
    // this.configureOAuth()
  }

  configureOAuth() {
    this.oauthService.configure({
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      redirectUri: window.location.origin,
      clientId: '101289191754-ue0omn4map44ra6enrtat6kui29up7kh.apps.googleusercontent.com',
      responseType: 'token id_token',
      scope: 'openid profile email',
      showDebugInformation: true,
      customQueryParams: {
        prompt: 'select_account' // Always prompt for account selection
      }
    });
    // this.oauthService.loadDiscoveryDocumentAndLogin(); 
  }

  updateRedirectUri(redirectUri: string) {
    this.oauthService.configure({
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      redirectUri: redirectUri,
      clientId: '101289191754-ue0omn4map44ra6enrtat6kui29up7kh.apps.googleusercontent.com',
      responseType: 'token id_token',
      scope: 'openid profile email',
      showDebugInformation: true,
      // customQueryParams: {
      //   prompt: 'select_account' // Always prompt for account selection
      // }
    });
  }
}
