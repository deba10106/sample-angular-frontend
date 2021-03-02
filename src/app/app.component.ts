import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shopit';
  //isShopCollapsed: boolean;
  //isProfile:boolean;
  location:string;
  isAdmin:boolean;




  constructor(private router: Router) {  }
  ngOnInit(): void {
    this.location=this.router.url;
    this.isAdmin=location.href.split("/")[3]=="admin"
    this.refresh();
  }

  refresh(){
    //this.location=this.router.url;
    //this.isShopCollapsed=location.href.split("/")[3]!="";
    //this.isProfile=location.href.split("/")[3]!="profile";
    //console.log(location.href.split("/"));
  }





}

