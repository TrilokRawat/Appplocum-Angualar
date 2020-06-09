import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  cartObj = {
		line_items : [],
		subtotal: 0,
		total: 0
  };
  
  constructor() { }


  	/**
	 * function to clear cart Item
	 * @return response as empty cartObj
	 */
	clearCartData() {
		this.cartObj = {
			line_items: [],
			total: 0,
			subtotal: 0,
		};
	}

	/**
	 * function to set cart total
	 * @return response as cartObj
	 */
	setCartTotal() {
		this.cartObj.subtotal = 0;
		this.cartObj.total = 0;
		this.cartObj.line_items.map(f => {
			this.cartObj.subtotal = 	this.cartObj.subtotal + parseFloat(f.total);
			this.cartObj.total = this.cartObj.subtotal;
		});
	}
}
