import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from "../../api/services";
import {Category} from "../../api/models";
import {Observable} from "rxjs";


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  imag: string;
  href: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  entryCatalogOn:boolean=true;
  veggieCatalogOn:boolean;
  userProfileOn:boolean;
  location:string;
  departments:Array<Category>;



  constructor(private router: Router, private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.location=this.router.url;
    this.entryCatalogOn=location.href.split("/")[3]=="";
    this.veggieCatalogOn=location.href.split("/")[3]=="veggies"
    this.userProfileOn=location.href.split("/")[3]=="profile"
    this.categoryService.getDepartments().subscribe(data=>{this.departments=data;})
  }
  gotoSubCat(id:string){
      this.categoryService.getChildCategory(id).subscribe(data=>{this.departments=data;})
  }


  tiles1: Tile[] = [
    {imag: 'assets/img/product/vegetables/fruits/fruits.png', text:'Fruits', cols: 1, rows: 1, color: 'white',href: '/veggies'},
    {imag: 'assets/img/product/vegetables/veg_logo.png', text:'Vegetables', cols: 1, rows: 1, color: 'white',href: '/veggies'},
    {imag: 'assets/img/product/fish-meat/fish.png', text:'Fish', cols: 1, rows: 1, color: 'white',href: '/veggies'},
    {imag: 'assets/img/product/fish-meat/meat.png', text:'Meat', cols: 1, rows: 1, color: 'white',href: '/veggies'},
  ];


}
