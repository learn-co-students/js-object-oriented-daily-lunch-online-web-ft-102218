// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodID = 0;
let mealID = 0;
let deliveryID = 0;
let customerID = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodID;
    this.name = name;
    store.neighborhoods.push(this);
  }
  meals() {
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }
  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.neighborhoodId == this.id
    })
  }
  customers(){
    return store.customers.filter((customer) => {
      return customer.neighborhoodId == this.id
    })
  }
}


class Meal {
  constructor(title, price){
    this.id = ++mealID
    this.title = title
    this.price = price
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.mealId  == this.id
    })
  }
  customers() {
    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];
  }
  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    });
  }

}

class Customer {
  constructor(name, neighborhoodID){
    this.id = ++customerID;
    this.name = name;
    this.neighborhoodId = neighborhoodID
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.customerId == this.id
    })
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }
  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryID;
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.mealId = mealId
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find((meal) => {
      return meal.id == this.mealId
    })
  }
  customer() {
    return store.customers.find((customer) => {
      return customer.id == this.customerId
    })
  }
  neighborhood() {
    return store.neighborhoods.find((neighborhood) => {
      return neighborhood.id == this.neighborhoodId
    })
  }
}
