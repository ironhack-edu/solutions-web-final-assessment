// SOLUTION - WAY 1

const person = {
  firstName: "Alan",
  lastName: "Turing",
  hobbies: ["reading", "running", "biking"],
  listHobbies() {
    // `this` inside of the array method callbacks doesn't reference the
    // value `this` available in the outer scope. We can say that array methods "block" the value of `this`
    // By changing the callback function of the map to an arrow function
    // we change the how the value of `this` is being accessed.
    // Arrow functions take the value of `this` from the scope in which they were created.
    const res = this.hobbies.map((hobby) => {
      return `${this.firstName} ${this.lastName} liked ${hobby}`;
    });

    return res;
  },
};

console.log(person.listHobbies());
