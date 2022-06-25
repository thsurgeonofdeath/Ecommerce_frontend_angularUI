import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any;

  constructor(public catService:CatalogueService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.catService.getResource("/products/search/selectedProducts")
    .subscribe(data=>{
      this.products=data;
    },error=>{
      console.log(error);
    })
  }

}
