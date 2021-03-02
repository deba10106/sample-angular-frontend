import { User } from './../../api/model/user';
import { UserService } from './../../api/service/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/api/services';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationStateService } from './../shared/components/view/application.state.service';

@Component({
  selector: 'app-top-hover-menu',
  templateUrl: './top-hover-menu.component.html',
  styleUrls: ['./top-hover-menu.component.css']
})
export class TopHoverMenuComponent implements OnInit {
  username:string;
  currentUser: User;
  currentState:boolean;



  constructor(private authenticationService: AuthenticationService,
    private applicationStateService : ApplicationStateService,
    private router: Router,) {
      this.currentUser = this.authenticationService.currentUserValue;
      this.currentState = this.applicationStateService.getIsMobileResolution();
    }

  ngOnInit(): void {
    this.username=this.currentUser.name;
  }
  logout():void{
    this.authenticationService.logout();

  }

}
