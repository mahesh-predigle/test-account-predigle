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
    // customQueryParams: {
    //   prompt: 'select_account' // Always prompt for account selection
    // }
  }
  constructor(
    private oauthService: OAuthService, 
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _http: HttpClient,
    private authService:AuthService
    ) {
      window.addEventListener('storage', (event) => {
        // The `key` is `null` if the event was caused by `.clear()`
        if (event.key !== 'access_token' && event.key !== null) {
          return;
        }
  
        console.warn('Noticed changes to access_token (most likely from another tab), updating isAuthenticated');
        // this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
        debugger
        if (this.oauthService.hasValidAccessToken()) {
          // this.navigateToLoginPage();
          this.redirectTo(`${this.param}?redirectFromAccount=${true}`);
        }
      });
      // this.configureOAuth();
    }
  // account.predigle.com 
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      // debugger
      // this.param = `${params['param1']}/?redirectFromAccount=${true}`;
      if(params){
        sessionStorage.removeItem('authenticalUrl');
        localStorage.removeItem('logout');
        this.param = params['param1'];
        // 'authenticalUrl' = params['param1']?.split(':')[2];
        debugger
        const isLoggedOut = params['logout'];
        this.param && sessionStorage.setItem('authenticalUrl', JSON.stringify(this.param));
        isLoggedOut && localStorage.setItem('logout', JSON.stringify(isLoggedOut));
        const redirectUrl = this.param;
        // const is_access_token = localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token')!) : false;
        // debugger
        if(this.oauthService.hasValidAccessToken() && isLoggedOut){
          this.oauthService.logOut();
        }
        else if(this.oauthService.hasValidAccessToken()){
          this.redirectTo(`${redirectUrl}?redirectFromAccount=${true}`);
        }else {
          this.oauthService.logOut();
        }
      }
      // if(isLoggedOut){
      //   this.oauthService.logoutUrl = "https://www.google.com/accounts/Logout";
      //   this.oauthService.logOut();
      // }
      // "'http://localhost:5000/login?param1=http://localhost:4200'"
      // this.param['redirectFromAccount'] = 'YOUR_VALUE_HERE';
      // console.log('this.param', this.param);           
    });
  }
  
  redirectTo(redirect: string): void {
    sessionStorage.removeItem('authenticalUrl');
    const externalUrl = redirect;
    window.location.href = externalUrl;
  }

  login() {
    // withouth loadDiscoveryDocumentAndLogin initImplicitFlow doesn't work 
    // this.authService.updateRedirectUri(this.param)
    localStorage.removeItem('logout');
    this.authService.configureOAuth()
    // this.dynamicRedirect()
    this.oauthService.loadDiscoveryDocumentAndLogin(); 
    this.oauthService.initImplicitFlow();
    // this.handleCallback();      
  }

  // dynamicRedirect(): void {
  //   Object.assign(this.authConfig, { redirectUri: 'http://localhost:4200'});
  //   this.oauthService.configure(this.authConfig);
  // }

  loginWithEmailPassword() {
    // this.oauthService
  }


private configureOAuth() {
  this.oauthService.configure(this.authConfig)

  // historyCleanupOff
  // triggerAuthorizationResultEvent

  this.oauthService.loadDiscoveryDocumentAndLogin();
}


}
