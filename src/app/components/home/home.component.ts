import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  param1: any;
  constructor(
    private oauthService: OAuthService, 
    private router: Router,
    private activeRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    // this.activeRoute.queryParams.subscribe(params => {
    //   // debugger
    //   this.param1 = params['param1'];
    //   console.log('this.param1', this.param1);
           
    // });
  }
 

  logout() { 
    this.oauthService.logOut();
    // Optional: Redirect to a logout component
    this.router.navigate(['/login']);
  }
}
