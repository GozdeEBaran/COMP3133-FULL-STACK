// Exercise 4

export class Customer {
  private firstName: string;
  private lastName: string;
  private _age: number;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this._age = age;
  }

  greeter(): void {
    console.log(`Hello ${this.firstName} ${this.lastName}`);
  }

  GetAge(): number {
    console.log(`Customer age is ${this._age}`);
    return this._age;
  }
}
