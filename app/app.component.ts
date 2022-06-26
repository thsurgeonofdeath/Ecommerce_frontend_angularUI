import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CatalogueService } from './catalogue.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public categories: any;
  public currentCategory: any;
 
  constructor(private catService:CatalogueService, private router:Router,
    private authService:AuthenticationService){}

  ngOnInit(): void {
    this.authService.loadAuthenticatedUser();
    this.getCategories();
  }

  getCategories() {
    this.catService.getResource("/categories")
    .subscribe(data=>{
      this.categories = data;
    },error=>{
      console.log(error);
    })
  }

  getProductsByCat(c: { id: string; }){
    this.currentCategory = c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts(){
    this.currentCategory = undefined;
    this.router.navigateByUrl("/products/1/0");
  }

  onProductsPromo() {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/3/0");
  }

  onProductsDispo() {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/4/0");
  }

  onLogout(){
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }

  title = 'Ecommerce_Frontend';
}
