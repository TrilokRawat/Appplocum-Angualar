import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service'
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public shared: SharedService, private router: Router) { }

  ngOnInit(): void {
  }

  changeQty(item, qty) {
    let x = this.shared.cartObj.line_items.findIndex(f => f.Name == item.Name)
    if(x != -1) {
      console.log('runn')
      this.shared.cartObj.line_items[x].qty = 
          this.shared.cartObj.line_items[x].qty + qty;
          this.shared.cartObj.line_items[x].total  = 
           this.shared.cartObj.line_items[x].qty *  this.shared.cartObj.line_items[x].price
          this.shared.setCartTotal();
          console.log('runn', this.shared.cartObj.line_items[x])
    }
  }

  order() {
    this.router.navigate(['/thank-you'], {queryParams: {
      ver: Math.random().toString(36).substr(2, 5),
      nocache: 1
    }});
    this.shared.clearCartData();
  }

}
