// login.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit  {
  param: any;
  authConfig: any = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,// for not checking exact above url in given
    redirectUri: window.location.origin,// redirect after logged in to google to my application
    clientId:
      '101289191754-ue0omn4map44ra6enrtat6kui29up7kh.apps.googleusercontent.com',
    responseType: 'token id_token',
    scope: 'openid profile email',
    showDebugInformation: true,
  }
  constructor(
    private oauthService: OAuthService, 
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _http: HttpClient,
    // private authService:AuthService
    ) {
      // this.configureOAuth();
    }
  // account.predigle.com 
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      // debugger
      this.param = `${params['param1']}/?redirectFromAccount=${true}`;
      // "'http://localhost:5000/login?param1=http://localhost:4200'"
      // this.param['redirectFromAccount'] = 'YOUR_VALUE_HERE';
      // console.log('this.param', this.param);           
    });
  }

  login() {
    this.dynamicRedirect()
    // withouth loadDiscoveryDocumentAndLogin initImplicitFlow doesn't work 
    this.oauthService.loadDiscoveryDocumentAndLogin(); 
    this.oauthService.initImplicitFlow();   
    // this.handleCallback();      
  }

  dynamicRedirect(): void {
    Object.assign(this.authConfig, { redirectUri: this.param });
    this.oauthService.configure(this.authConfig);
  }

  loginWithEmailPassword() {
    // this.oauthService
  }
  private handleCallback() {
    this.oauthService.tryLogin({
      onTokenReceived: (context) => {
        // Handle successful login, e.g., navigate to a protected route
        this.handleUserDetails();
      },
      onLoginError: (context) => {
        console.error('Login error:', context);
      },
    });
  }

private configureOAuth() {
  this.oauthService.configure(this.authConfig)

  // historyCleanupOff
  // triggerAuthorizationResultEvent

  this.oauthService.loadDiscoveryDocumentAndLogin();
}

  private handleUserDetails() {
    const idToken = this.oauthService.getIdToken();
    if (idToken) {
      // const decodedToken = this.oauthService.tokenHelper.decodeToken(idToken);
      localStorage.setItem('idToken', JSON.stringify(idToken));
      console.log('idToken', idToken);
    }
  }

}
