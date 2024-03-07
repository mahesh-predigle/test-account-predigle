// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  redirectToUrl!: string;
  constructor(
    private oauthService: OAuthService,
    private activeRoute: ActivatedRoute,
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {
    debugger    
    // const redirect: string = route.queryParams['param1'];
    // const redirectUrl = localStorage.getItem('authenticalUrl') ? JSON.parse(localStorage.getItem('authenticalUrl')!) : '';
    // const isLoggedOut = localStorage.getItem('logout') ? JSON.parse(localStorage.getItem('logout')!) : '';
    // if(isLoggedOut){
    //   this.oauthService.logoutUrl = "https://www.google.com/accounts/Logout";
    //   this.oauthService.logOut();
    // }
    if (this.oauthService.hasValidAccessToken()) {
      // isLoggedOut != 'true' && this.redirectTo(`http://localhost:4200?redirectFromAccount=${true}`)
      // this.redirectTo(`${redirectUrl}?redirectFromAccount=${true}`)
      return true;
    } else {
      this.oauthService.initImplicitFlow();
      return false;
    }
  }

  redirectTo(redirect: string): void {
    localStorage.clear();
    const externalUrl = redirect;
    window.location.href = externalUrl;
  }

}
