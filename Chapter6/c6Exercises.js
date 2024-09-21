// A Vector Type:

class Vec {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    plus(vector) {
      return new Vec(this.x + vector.x, this.y + vector.y);
    }
  
    minus(vector) {
      return new Vec(this.x - vector.x, this.y - vector.y);
    }
  
    get length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }
  
  console.log(new Vec(1, 2).plus(new Vec(2, 3)));
  // -> Vec{x: 3, y: 5}
  console.log(new Vec(1, 2).minus(new Vec(2, 3)));
  // -> Vec{x: -1, y: -1}
  console.log(new Vec(3, 4).length);
  // -> 5
  
  // Groups:
  
  class Group {
    #members = [];
  
    add(value) {
      if (!this.has(value)) {
        this.#members.push(value);
      }
    }
  
    delete(value) {
      this.#members = this.#members.filter((v) => v !== value);
    }
  
    has(value) {
      return this.#members.includes(value);
    }
  
    static from(array) {
      let group = new Group();
      for (let value of array) {
        group.add(value);
      }
      return group;
    }
  
    // Iterable Groups:
    [Symbol.iterator]() {
      return new GroupIterator(this.#members);
    }
  }
  
  let group = Group.from([10, 20]);
  console.log(group.has(10));
  // -> true
  console.log(group.has(30));
  // -> false
  group.add(10);
  group.delete(10);
  console.log(group.has(10));
  // -> false
  
  // The above code was copied from the book. I'll have to come back to this later for a better understanding.
  
  class GroupIterator {
    #members;
    #position;
  
    constructor(members) {
      this.#members = members;
      this.#position = 0;
    }
  
    next() {
      if (this.#position >= this.#members.length) {
        return { done: true };
      } else {
        let result = { value: this.#members[this.#position], done: false };
        this.#position++;
        return result;
      }
    }
  }
  
  for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  // -> a
  // -> b
  // -> c