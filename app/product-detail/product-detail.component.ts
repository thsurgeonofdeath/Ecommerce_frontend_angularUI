import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Product } from '../models/product.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public currentProduct : Product;
  private selectedFiles: any;
  public progress: number;
  public currentFileUpload: any;
  private currentTime: number;
  public editPhoto: boolean;
  public mode: number=0;



  constructor(private router:Router, private route:ActivatedRoute,
    public catService:CatalogueService,
    public authService:AuthenticationService) { }

  ngOnInit(): void {
    let url = atob(this.route.snapshot.params.url);
    this.catService.getProduct(url).subscribe(data=>{
      this.currentProduct = data;
    },error=>{
      console.log(error);
    });
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
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

  onAddProductToCaddy(p:Product) {
  }

  getTS() {
    return this.currentTime;
  }

  onProductDetails(p) {
    this.router.navigateByUrl("/product/"+p.id);
  }

  onEditProduct() {
    this.mode=1;
  }

  onUpdateProduct(data) {
  }

}
