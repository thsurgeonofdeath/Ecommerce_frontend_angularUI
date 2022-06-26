import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any;

  constructor(public catService: CatalogueService,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let p1 = this.route.snapshot.params.p1;
    if (p1 == 1) {
      this.getProducts("/products/search/selectedProducts");
    }
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params.p1;
        if (p1 == 1) {
          this.getProducts("/products/search/selectedProducts");
        }
        else if (p1 == 2) {
          let idCat = this.route.snapshot.params.p2;
          this.getProducts("/categories/" + idCat + "/products");
        }
      }
    });

  }
  getProducts(url: string) {
    this.catService.getResource(url)
      .subscribe(data => {
        this.products = data;
      }, error => {
        console.log(error);
      })
  }

}
