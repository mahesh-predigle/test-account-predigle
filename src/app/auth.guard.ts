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
    ) {
    this.activeRoute.queryParams.subscribe(params => {
      this.redirectToUrl = params['param1'];
      // console.log('this.param1', this.param1);           
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {
    // debugger
    const redirect: string = route.queryParams['param1'];
    if (this.oauthService.hasValidAccessToken()) {
      this.redirectTo(`http://localhost:4200?redirectFromAccount=${true}`)
      return true;
    } else {
      this.oauthService.initImplicitFlow();
      return false;
    }
  }

  redirectTo(redirect: string): void {
    const externalUrl = redirect;
    window.location.href = externalUrl;
  }

}
