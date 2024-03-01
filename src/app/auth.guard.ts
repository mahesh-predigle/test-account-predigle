// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      // debugger
      this.redirectToUrl = params['param1'];
      // console.log('this.param1', this.param1);           
    });
  }

  canActivate(): boolean {
    if (this.oauthService.hasValidAccessToken()) {
      // this.redirctTo();
      return true;
    } else {
      this.oauthService.initImplicitFlow();
      return false;
    }
  }

  redirctTo() {
    // Update redirectUri before initiating login flow
    this.oauthService.configure({
      redirectUri: this.redirectToUrl
    });
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }
}
