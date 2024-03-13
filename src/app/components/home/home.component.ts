import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  param1: any;
  redirectUrl: string | undefined;
  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    // this.activeRoute.queryParams.subscribe(params => {
    //   // debugger
    //   this.param1 = params['param1'];
    //   console.log('this.param1', this.param1);
    // });
  }

  ngAfterViewInit(): void{
    this.redirectUrl = localStorage.getItem('authenticalUrl') ? JSON.parse(localStorage.getItem('authenticalUrl')!) : '';
    const isLoggedOut = localStorage.getItem('logout') ? JSON.parse(localStorage.getItem('logout')!) : '';
    debugger
    if (isLoggedOut == 'true') {
        // this.oauthService.logOut();
        setTimeout(() => {     
          // this.authService.configureOAuth(); 
          this.logout();
        }, 500);
    }else{
      this.redirectTo(`${this.redirectUrl}?redirectFromAccount=${true}`)
    }
}

  redirectTo(redirect: string): void {
    localStorage.clear();
    const externalUrl = redirect;
    window.location.href = externalUrl;
  }


  logout() {
    this.oauthService.logoutUrl =  "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue="+this.redirectUrl;
    this.oauthService.logOut();
    // Optional: Redirect to a logout component
    // this.router.navigate(['/login']);
    localStorage.clear();  
  }
}
