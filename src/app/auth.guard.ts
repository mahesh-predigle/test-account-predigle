// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from './components/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  redirectToUrl!: string;
  constructor(
    private oauthService: OAuthService,
    private activeRoute: ActivatedRoute,
    private authService:AuthService
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {
    // const redirect: string = route.queryParams['param1'];
    const redirectUrl = sessionStorage.getItem('authenticalUrl') ? JSON.parse(sessionStorage.getItem('authenticalUrl')!) : '';
    const isLoggedOut = localStorage.getItem('logout') ? JSON.parse(localStorage.getItem('logout')!) : false;
    // const is_access_token = localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token')!) : false;
    // debugger
    // if(isLoggedOut){
    //   // debugger
    //   this.oauthService.logOut();
    // }
    if (this.oauthService.hasValidAccessToken()) {
      this.redirectTo(`${redirectUrl}?redirectFromAccount=${true}`);
      return true;
    } else {
      this.oauthService.initImplicitFlow();
      return false;
    }
  }

  redirectTo(redirect: string): void {
    // sessionStorage.removeItem('authenticalUrl');
    const externalUrl = redirect;
    window.location.href = externalUrl;
  }

}
