import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogueService } from '../catalogue.service';
import { Caddy } from '../models/cart.model';
import { Client } from '../models/client.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { ItemProduct } from '../models/ProductItem.model';
import { AuthenticationService } from './authentication.service';
import { CaddyService } from './caddy.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order:Order=new Order();

  constructor(private caddyService:CaddyService,
              private httpClient:HttpClient,
              private catalService:CatalogueService){}

  public setClient(client:Client){
    this.order.client=client;
  }
  public loadProductsFromCaddy(){
    this.order.products=[];
   for(let key in this.caddyService.getCaddy().items){
     this.order.products.push(this.caddyService.getCaddy().items[key]);
   }
  }
  public getTotal():number{
    let total:number=0;
    this.order.products.forEach(p=>{
      total+=p.price*p.quantity;
    });
    return total;
  }

  submitOrder() {
    return this.httpClient.post(this.catalService.host+"/orders",this.order);
  }

  public getOrder(id:number):Observable<Order>{
    return this.httpClient.get<Order>(this.catalService.host+"/orders/"+id);
  }
}
