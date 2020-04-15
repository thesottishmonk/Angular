import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OAuthService, JwksValidationHandler} from 'angular-oauth2-oidc';
import { authConfig } from '../../sso.config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService) { 
    this.configureSingleSignOn();
  }

  configureSingleSignOn(){
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit(): void {
  }

  submit(f:NgForm){
    console.log(f.value);
    console.log(f);
    this.oauthService.initImplicitFlow();
  }

  get token(){
    let claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

}
