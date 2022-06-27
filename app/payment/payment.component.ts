import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentAmount:number;
  currentOrder:Order;
  constructor(public router:Router, private route:ActivatedRoute,
              public orderService:OrderService) { }

  ngOnInit() {
  }

}
