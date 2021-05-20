// SOLUTION - WAY 2

const person = {
  firstName: "Alan",
  lastName: "Turing",
  hobbies: ["reading", "running", "biking"],
  listHobbies() {
    // `this` inside of the array method callbacks doesn't reference the
    // value `this` available in the outer scope. We can say that array methods "block" the value of `this`
    // Array methods can optionally receive an additional argument,
    // which is used to set the value of`this` in the callback.
    const res = this.hobbies.map(function (hobby) {
      return `${this.firstName} ${this.lastName} liked ${hobby}`;
    }, this); // <== !!!

    return res;
  },
};

console.log(person.listHobbies());
