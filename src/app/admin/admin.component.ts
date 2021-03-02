import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../api/services";
import {Category} from "../api/models";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  imag: string;
  href: string;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  entryCatalogOn:boolean=true;
  veggieCatalogOn:boolean;
  userProfileOn:boolean;
  location:string;
  isField:boolean=false;
  createForm: FormGroup;
  departments:Array<Category>;

  constructor(private router: Router, private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.location=this.router.url;
    this.entryCatalogOn=location.href.split("/")[3]=="admin";
    this.categoryService.getDepartments().subscribe(data=>{this.departments=data;})
    this.createForm = new FormGroup({
      name: new FormControl('')
    });
  }
  gotoSubCat(id:string){
    console.log(id);
    this.categoryService.getChildCategory(id).subscribe(data=>{this.departments=data;})
  }
  getDepts(){
    this.categoryService.getDepartments().subscribe(data=>{this.departments=data;})
  }


  tiles1: Tile[] = [
    {imag: 'assets/img/product/vegetables/fruits/fruits.png', text:'Fruits', cols: 1, rows: 1, color: 'white',href: '/veggies'},
    {imag: 'assets/img/product/vegetables/veg_logo.png', text:'Vegetables', cols: 1, rows: 1, color: 'white',href: '/veggies'},
    {imag: 'assets/img/product/fish-meat/fish.png', text:'Fish', cols: 1, rows: 1, color: 'white',href: '/veggies'},
    {imag: 'assets/img/product/fish-meat/meat.png', text:'Meat', cols: 1, rows: 1, color: 'white',href: '/veggies'},
  ];
  showFields(){
    this.isField=true;
  }
  createChild(id:string){
    this.categoryService.createChildCategory(id,this.createForm.controls.name['value']).subscribe(data=>{});
  }

  deleteCategory(id:string){
    console.log(id);
    this.categoryService.deleteCategory(id).subscribe(data=>{console.log(data)});
  }
  createDept(){
    console.log(this.createForm.controls.name['value']);
    this.categoryService.createDept(this.createForm.controls.name['value']).subscribe(data=>{console.log(data)});
  }



}
