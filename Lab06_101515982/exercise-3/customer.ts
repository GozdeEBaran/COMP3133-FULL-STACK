// Exercise 3

class Customer {
  private firstName: string;
  private lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greeter(): void {
    console.log(`Hello ${this.firstName} ${this.lastName}`);
  }
}

const customer = new Customer("Gozde", "Baran");
customer.greeter();
