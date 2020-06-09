import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 products = [
    { "Name": "Cheese", "price" : 2.50, "Location": "Refrigerated foods", qty: 2},
    { "Name": "Crisps", "price" : 3, "Location": "the Snack isle", qty: 5},
    { "Name": "pizza", "price" : 4, "Location": "Refrigerated foods", qty: 7 },
    { "Name": "Chocolate", "price" : 1.50, "Location": "the Snack isle", qty: 8 },
    { "Name": "Self-raising flour", "price" : 1.50, "Location": "Home baking", qty: 0 },
    { "Name": "Ground almonds", "price" : 3, "Location": "Home baking", qty: 1 }
    ]
  constructor( public shared: SharedService) { }

  ngOnInit(): void {
  }

  addtocart(item){
    item['max_qty'] = item.qty
    item.qty = 1;
    item['total'] = item.price * item.qty;
    if(this.shared.cartObj.line_items.length == 0) {
      this.shared.cartObj.line_items.push(item)
    } else {
      let x = this.shared.cartObj.line_items.findIndex(f => f.Name == item.Name)
      if( x == -1) {
        this.shared.cartObj.line_items.push(item)
      }
    }
    this.shared.setCartTotal();
  }

  disableAddtocart(item) {
    if(this.shared.cartObj.line_items.length == 0) {
      return false;
    } else {
      let x = this.shared.cartObj.line_items.findIndex(f => f.Name == item.Name)
      if( x != -1) {
       return true
      }
    }
  }

}
