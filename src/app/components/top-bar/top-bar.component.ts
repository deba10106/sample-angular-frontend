import { ApplicationStateService } from './../shared/components/view/application.state.service';
import { User } from 'src/app/api/model/user';
import { Component, OnInit,  } from '@angular/core';
import {AuthenticationService} from 'src/app/api/service/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


//import { AuthenticationService } from 'src/app/api/services';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isLoggedIn:boolean;
  currentState:boolean;
  currentUser$:Observable<User>;




  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private applicationStateService : ApplicationStateService,
  ) {
     this.currentUser$ = this.authenticationService.currentUser;
     this.currentState = this.applicationStateService.getIsMobileResolution();
     if (this.authenticationService.currentUserValue) {

      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }
  }
  ngOnInit(): void {
    console.log(this.currentState);
  }
  logout() {
    this.authenticationService.logout();
    this.isLoggedIn=false;
    this.router.navigate(['/']);

  }


}




