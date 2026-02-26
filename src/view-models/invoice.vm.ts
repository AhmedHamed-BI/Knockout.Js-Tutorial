import * as ko from "knockout";

export class SetItemToCart {

  name: KnockoutObservable<string>;
  quantity: KnockoutObservable<number>;
  unitPrice: KnockoutObservable<string>;
  total: KnockoutComputed<number>;

  constructor(itemName: string, quantity: number, unitPrice: number) {

    this.name = ko.observable(itemName);
    this.quantity = ko.observable(quantity);
    this.unitPrice = ko.computed(function () {
     return unitPrice.toString();
    });

    this.total = ko.pureComputed(() => {
      return this.quantity() * parseInt(this.unitPrice());
    });

  }
}

export class InvoiceVM {
  items: KnockoutObservableArray<SetItemToCart> = ko.observableArray<SetItemToCart>([
      new SetItemToCart("Apple", 0, 100),
      new SetItemToCart("Banana", 0, 30),
      new SetItemToCart("Orange", 0, 80)
    ]);
  cartItems: KnockoutObservableArray<SetItemToCart> = ko.observableArray<SetItemToCart>([]);
  totals: KnockoutComputed<number> = ko.pureComputed(() => {
    let total = 0;

    for (let i = 0; i < this.cartItems().length; i++) {
        total += this.cartItems()[i].total();
    }

    return total;
  });
  addToCart = (item: any) => {
    this.cartItems.push(new SetItemToCart(item.name(),item.quantity(),item.unitPrice()));
  };

  // constructor() {
  //   this.items = ko.observableArray<SetItemToCart>([
  //     new SetItemToCart("Apple", 2, 100),
  //     new SetItemToCart("Banana", 3, 30),
  //     new SetItemToCart("Orange", 1, 80)
  //   ]);
  //   // this.cartItems = ko.observableArray([]);
  // }
}
