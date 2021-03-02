import { FormState } from './../shared/model/form-state.model';
import { AuthenticationService, AddressService } from 'src/app/api/services';;
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { User, Address } from 'src/app/api/models';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  add_address:boolean=false;
  addrForm: FormGroup;
  formBuilder: FormBuilder;
  currentUser: User;
  isCreate:boolean=true;
  formState: FormState;
  addrListIndex:number;
  addresses: Address[];
  showAddress:boolean[]=[true,true,true,true];
  type1:string;

  //cu: number;

  constructor(private authenticationService: AuthenticationService,
    private addressService: AddressService,
    ) { }

  ngOnInit(): void {
    this.addrForm = new FormGroup({
      name: new FormControl('', Validators.minLength(3)),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
      ]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(6),Validators.maxLength(6),
      ]),
      villageSector: new FormControl(''),
      street: new FormControl(''),
      block: new FormControl(''),
      cityTownDist: new FormControl(''),
      landmark: new FormControl(''),
      state: new FormControl(''),
      altPhone: new FormControl('', [
       // Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
      ]),
      type: new FormControl(''),
    })
    this.formState = new FormState(this.addrForm);
    this.add_address=false;
    this.currentUser=this.authenticationService.currentUserValue;
    this.addressService.listAddress().subscribe(data=>{this.addresses=data;});

  }



  toggle(): void {
    if(this.add_address==false){
      this.add_address=true;
    }
    else{
      this.add_address=false;
    }
  }

  edit(i: number){
    this.toggle(),
    this.showAddress[i]=false,
    this.isCreate=false,
    window.scrollTo(0, 0);
    this.addrListIndex=i,
    this.addrForm = new FormGroup({
      id: new FormControl(this.addresses[i].id),
      userId: new FormControl(this.addresses[i].userId),
      name: new FormControl(this.addresses[i].name, Validators.minLength(3)),
      phone: new FormControl(this.addresses[i].phone, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
      ]),
      pincode: new FormControl(this.addresses[i].postalCode, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(6),Validators.maxLength(6),
      ]),
      villageSector: new FormControl(this.addresses[i].villOrSector),
      street: new FormControl(this.addresses[i].street),
      block: new FormControl(this.addresses[i].block),
      cityTownDist: new FormControl(this.addresses[i].townOrCity),
      landmark: new FormControl(this.addresses[i].landmark),
      state: new FormControl(this.addresses[i].state),
      altPhone: new FormControl(this.addresses[i].altPhone, [
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
      ]),
      type: new FormControl(this.addresses[i].type),
    })
    this.formState = new FormState(this.addrForm);
  }
  update(i){

    if (this.formState.valid){

      let address = new Address();
      let id:number  = this.addrForm.controls.id['value'];
      let userId:number = this.addrForm.controls.userId['value'];
      address.name=this.addrForm.controls.name['value'],
      address.postalCode=this.addrForm.controls.pincode['value'],
      address.street=this.addrForm.controls.street['value'],
      address.block=this.addrForm.controls.block['value'],
      address.phone=this.addrForm.controls.phone['value'];
      address.altPhone=this.addrForm.controls.altPhone['value']
      address.townOrCity=this.addrForm.controls.cityTownDist['value'],
      address.villOrSector=this.addrForm.controls.villageSector['value'],
      address.landmark=this.addrForm.controls.landmark['value'],
      address.state=this.addrForm.controls.state['value'],
      //address.userId=this.currentUser.id,
      address.type=this.addrForm.controls.type['value'],

      this.addressService.update(userId, id, address).subscribe(data=>{
        this.toggle();
        this.addressService.listAddress().subscribe(data=>{this.addresses=data;});
      })
    }

  }

  delete(i:number){
    this.addressService.deleteAddress(this.addresses[i].id).subscribe(data=>{this.addressService.listAddress().subscribe(data=>{this.addresses=data;});})
    this.showAddress[i]=false;
  }





  saveAddr(){
    if(this.formState.valid){
      let address = new Address();
    address.name=this.addrForm.controls.name['value'],
    address.postalCode=this.addrForm.controls.pincode['value'],
    address.street=this.addrForm.controls.street['value'],
    address.block=this.addrForm.controls.block['value'],
    address.phone=this.addrForm.controls.phone['value'];
    address.altPhone=this.addrForm.controls.altPhone['value']
    address.townOrCity=this.addrForm.controls.cityTownDist['value'],
    address.villOrSector=this.addrForm.controls.villageSector['value'],
    address.landmark=this.addrForm.controls.landmark['value'],
    address.state=this.addrForm.controls.state['value'],
    address.userId=this.currentUser.id,
    address.type=this.addrForm.controls.type['value']
    this.addressService.addAddress(address).subscribe(data=>{
      this.toggle();
      this.addressService.listAddress().subscribe(data=>{this.addresses=data;});

      /*this.name=data.name,
      this.phone=data.phone,
      this.altPhone=data.altPhone,
      this.block=data.block,
      this.street=data.street,
      this.villOrSector=data.villOrSector,
      this.landmark=data.landmark,
      this.state=data.state,
      this.postalCode=data.postalCode,
      this.townOrCity=data.townOrCity*/

    })

    }

  }

}
