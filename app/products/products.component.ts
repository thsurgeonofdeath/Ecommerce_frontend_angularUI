import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any;
  editPhoto: boolean;
  currentProduct: any;
  selectedFiles: any;
  currentFileUpload: any;
  progress: number;
  title:string;
  currentTime: number;


  constructor(public catService: CatalogueService,
    public route: ActivatedRoute,
    private router: Router,
    public authService:AuthenticationService) { }

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
          this.title=""
          this.getProducts("/products/search/selectedProducts");
        }
        else if (p1 == 2) {
          let idCat = this.route.snapshot.params.p2;
          this.title="Produits de la catégorie "+idCat;
          this.getProducts("/categories/" + idCat + "/products");
        }
        else if (p1 == 3) {
          this.title="Produits en promotion";
          let idCat = this.route.snapshot.params.p2;
          this.getProducts("/products/search/promoProducts");
        }
        else if (p1 == 4) {
          this.title="Produits Disponibles";
          let idCat = this.route.snapshot.params.p2;
          this.getProducts("/products/search/dispoProducts");
        }
        else if (p1 == 5) {
          this.title="Recherche..";
          this.title="Produits Disponibles";
          let idCat = this.route.snapshot.params.p2;
          this.getProducts("/products/search/dispoProducts");
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

  onEditPhoto(p){
    this.currentProduct = p;
    this.editPhoto=true;
  }
  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto(){
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })

    this.selectedFiles = undefined
  }

  getTS(){
    return this.currentTime;
  }

  onAddProductToCaddy(p){
    
  }

}
