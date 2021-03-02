import { Address } from 'src/app/api/models';
import { Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/api/services';
import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/api/models';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent  implements OnInit {
  public addrForm: FormGroup;
  active = 'middle';
  blockProfile:boolean=true;
  userpic:string="assets/img/dummy/deba.jpg";
  currentUser: User;
  userName:string;

  constructor(private formBuilder: FormBuilder,
  private authenticationService: AuthenticationService) {

    }
  public async ngOnInit(): Promise<void> {
    this.addrForm = new FormGroup({
      fName: new FormControl('', Validators.minLength(3)),
      lName: new FormControl('', Validators.minLength(3)),
      sex: new FormControl('', Validators.min(13)),
      emailAddr: new FormControl('', Validators.email),
      phoneNumber: new FormControl('', Validators.required)
    });
    //this.customers = await this.myService.getCustomers('');
    this.currentUser=this.authenticationService.currentUserValue;
    this.userName=this.currentUser.name;
  }

  addrSubmit(){
    let address = new Address();
    address.name = this.addrForm.controls.fName['value'] + " " + this.addrForm.controls.lName['value'];


  }



}
