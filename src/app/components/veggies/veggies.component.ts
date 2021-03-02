import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/api/services';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-veggies',
  templateUrl: './veggies.component.html',
  styleUrls: ['./veggies.component.css']
})
export class VeggiesComponent implements OnInit {
  //isCollapsed: boolean;
  veggies: any;




  constructor(private productService: ProductService) {

    this.productService.listProducts().subscribe(data=>
      {this.veggies=data;
      console.log(this.veggies[0].name)});
   }

  ngOnInit(): void {
    //this.isCollapsed=true;

   }


}
