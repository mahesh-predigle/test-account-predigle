import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  param1: any;
  constructor(private oauthService: OAuthService,
    private activeRoute: ActivatedRoute,
    private router: Router) {}
  
  ngOnInit(): void {
    
    // this.activeRoute.queryParams.subscribe(params => {
    //   debugger
    //   this.param1 = params['param1'];
    //   console.log('this.param1', this.param1);
    // });
  }


}
