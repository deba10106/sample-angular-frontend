import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl} from "@angular/forms";
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService, UserService, PinService } from 'src/app/api/services';
import { User, Pin } from 'src/app/api/models';
import { FormState } from '../shared/model/form-state.model';


function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('loginFormModalPassword1');
  const confirmControl = c.get('confirmPass');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  login:boolean;
 // @Input() returnUrl: string;

  error: string;
  recoveryEmailExistsOrNot: string;
  IsPassMatched:boolean;
  validatingForm: FormGroup;
  registrationGroupState: FormState;
  registrationGroup: FormGroup;
  recoveryGroup: FormGroup;
  showLoginNowModal:string;
  passRecovery:boolean=false;
  pinPart:boolean=false;
  isEmailExist:string;
  constructor( private router: Router,
    private authenticationService: AuthenticationService,
    private pinService: PinService,
    private userService: UserService,
  ) {

  }



  ngOnInit(): void {

    //login part //
    this.validatingForm = new FormGroup({
      //loginFormModalName new FormControl('', Validators.name),
      loginFormModalEmail: new FormControl(localStorage.getItem('email'), Validators.email),
      loginFormModalPassword: new FormControl(localStorage.getItem('password'), Validators.required),
      remember:new FormControl('')
    });
    //registration part//
    this.registrationGroup= new FormGroup({
      loginFormModalName: new FormControl('', Validators.minLength(3)),
      loginFormModalEmail1: new FormControl('', Validators.email),
      loginFormModalPassword1: new FormControl('', Validators.required),
      confirmPass: new FormControl('', Validators.required),
    });
    this.IsPassMatched=false;

    this.registrationGroupState = new FormState(this.registrationGroup);
    this.recoveryGroup= new FormGroup({
      loginFormModalEmail2: new FormControl('', Validators.email),
    });

    //recovery part//

    this.recoveryGroup = new FormGroup({
      loginFormModalEmail2: new FormControl('',Validators.email),
      pin: new FormControl('')
    })
  }

  getPin():void{
    let pin = new Pin();
    pin.email=this.recoveryGroup.controls.loginFormModalEmail2['value'];
    this.pinService.createPin(pin).subscribe(
      data=>{
        if (data==false)
        this.recoveryEmailExistsOrNot="Your email does not exist!"
      }
    );
    this.pinPart=true;
  }

  loginByPin(){
    this.authenticationService.getTokenByPin(this.recoveryGroup.controls.loginFormModalEmail2['value'],this.recoveryGroup.controls.pin['value']).subscribe(
      token=>{
        console.log(token);
        this.authenticationService.login(token.authorization).subscribe(
          () => {

            document.getElementById('closeTheModal').click();
            this.router.navigate(['/profile']);
            window.location.reload();
          },
          () => {
            this.error = 'Unable to retrieve user';
          }

        )
      },

    );
  }

  doRegistration():void{
    if (emailMatcher(this.registrationGroup)!= null){
      this.IsPassMatched=emailMatcher(this.registrationGroup).match;
    }
    else{
      this.IsPassMatched=false;
      if (this.registrationGroupState.valid) {
            let user = new User();
            user.name = this.registrationGroup.controls.loginFormModalName.value,
            user.email = this.registrationGroup.controls.loginFormModalEmail1.value,
            user.password = this.registrationGroup.controls.loginFormModalPassword1.value
            this.userService.createUser(user)
                .pipe(first())
                .subscribe(
                    (data: number) => {

                        // this.created = true;
                        // this.email = this.form.controls.email.value;
                        if (data == 0){
                          this.isEmailExist="Your email already exists!"
                        }
                        else{
                          this.login=true;
                          this.showLoginNowModal="Your account created! Login now!";
                          this.registrationGroupState.loading = false;
                        }

                    },
                    error => {
                        this.registrationGroupState.serverErrors = error;
                        this.registrationGroupState.loading = false;
                    });
        }
    }

  }

  onSubmit() {
    this.error = null;
    if ((this.loginFormModalEmail.invalid && (this.loginFormModalEmail.dirty || this.loginFormModalEmail.touched))==false) {
      console.log(localStorage);
      console.log(this.validatingForm.controls.remember.value);
      this.authenticationService.token(this.validatingForm.controls.loginFormModalEmail['value'], this.validatingForm.controls.loginFormModalPassword['value'])
        .subscribe(
          token => {
            if (localStorage.remember=='true') {
              console.log(this.validatingForm.controls.remember['value']);
              localStorage.setItem('email', this.validatingForm.controls.loginFormModalEmail['value']);
              localStorage.setItem('password', this.validatingForm.controls.loginFormModalPassword['value']);
            } else {
              localStorage.removeItem('email');
              localStorage.removeItem('password');
            }
            localStorage.setItem('remember', this.validatingForm.controls.remember['value']);

            this.authenticationService.login(token.authorization).subscribe(
              () => {

                document.getElementById('modalClose').click();
                this.router.navigate(['']);
                window.location.reload();
              },
              () => {
                this.error = 'Unable to retrieve user';
                //this.formState.loading = false;

              }
            )
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.error = error.error;
            //this.formState.loading = false;

          }
        );
    }
  }

  gotoPassRecovery():void{
    this.passRecovery=true;
    this.login=false;
  }

  registerModal():void{
    this.login=false;
    this.passRecovery=false;
  }
  loginModal():void{
    this.login=true;
    this.passRecovery=false;
  }


  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }
}
