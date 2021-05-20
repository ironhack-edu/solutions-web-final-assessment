// SOLUTION

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getProductDetails() {
    return `${this.name} - ${this.price} eur`;
  }
}

class Shoes extends Product {
  constructor(name, price, size) {
    super(name, price);
    this.size = size;
  }

  getProductDetails() {
    return `${this.name} - ${this.size} - ${this.price} eur`;
  }
}
