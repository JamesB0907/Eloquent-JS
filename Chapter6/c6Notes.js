// Eloquent Javascript Chapter 6 Notes

// The Secret Life of Objects

// Methods:

function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
  let whiteRabbit = { type: "white", speak };
  let hungryRabbit = { type: "hungry", speak };
  
  whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!");
  // -> The white rabbit says ' Oh my fur and whiskers'
  hungryRabbit.speak("Got any carrots?");
  // -> The hungry rabbit says 'Got any carrots?'
  
  // The call method:
  speak.call(whiteRabbit, "Hurry!");
  // -> The white rabbit says 'Hurry!'
  
  // 'this' binding applied to an arrow function:
  let finder = {
    find(array) {
      return array.some((v) => v == this.value);
    },
    value: 5,
  };
  console.log(finder.find([4, 5]));
  
  // Prototypes:
  
  let empty = {};
  console.log(empty.toString);
  // -> function toString() {...}
  console.log(empty.toString());
  // -> [object Object]
  // Important to note: When you receive the response from the console object Object it is similar to getting an undefined variable. The console is not able to display the object in a way that is useful to the user.
  
  //toString is a method stored in Object.prototype. This is why all objects have access to it even if they are empty.
  
  console.log(Object.getPrototypeOf({}) == Object.prototype);
  // -> true
  console.log(Object.getPrototypeOf(Object.prototype));
  // -> null
  
  console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
  // -> true
  console.log(Object.getPrototypeOf([]) == Array.prototype);
  // -> true
  
  let protoRabbit = {
    speak(line) {
      console.log(`The ${this.type} rabbit says '${line}'`);
    },
  };
  let blackRabbit = Object.create(protoRabbit);
  blackRabbit.type = "black";
  blackRabbit.speak("I am fear and darkness");
  // -> The black rabbit says 'I am fear and darkness'
  
  // Classes:
  
  // Constructor functions:
  
  function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
  }
  
  // This creates a new object with the protoRabbit prototype and then assigns the type property to the object. This is a way to create a new object with a prototype and properties.
  
  // Alternatively, classes can be used to create objects:
  
  class Rabbit {
    constructor(type) {
      this.type = type;
    }
    speak(line) {
      console.log(`The ${this.type} rabbit says '${line}'`);
    }
  }
  
  // Before 2015 class update:
  
  function ArchaicRabbit(type) {
    this.type = type;
  }
  ArchaicRabbit.prototype.speak = function (line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  };
  let oldSchoolRabbit = new ArchaicRabbit("old school");
  
  console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
  // -> true
  // console.log(Object.getPrototypeOf(killerRabbit) == Rabbit.prototype);
  // -> true
  
  // Per-instance properties added to the prototype:
  
  class Particle {
    speed = 0;
    constructor(position) {
      this.position = position;
    }
  }
  
  // Class used in an expression:
  
  let object = new (class {
    getWord() {
      return "hello";
    }
  })();
  console.log(object.getWord());
  // -> hello
  
  // Private class properties:
  
  class SecretiveObject {
    #getSecret() {
      return "I ate all the plums";
    }
    interrograte() {
      let shallISayIt = this.#getSecret();
      return "never";
    }
  }
  
  // I don't understand this, but come back to it:
  
  class RandomSource {
    #max;
    constructor(max) {
      this.#max = max;
    }
    getNumber() {
      return Math.floor(Math.random() * this.#max);
    }
  }
  
  // Overriding derived properties:
  
  // You can override the property on a prototype by adding a property to an object with the same name and giving it a new value
  
  Rabbit.prototype.teeth = "small";
  // console.log(killerRabbit.teeth);
  // -> small
  // killerRabbit.teeth = "long, sharp, and bloody";
  // console.log(killerRabbit.teeth);
  // -> long, sharp, and bloody
  console.log(new Rabbit("basic").teeth);
  // -> small
  console.log(Rabbit.prototype.teeth);
  // -> small
  
  // Above we see that the any new instance of the Rabbit class will follow the prototype property, but for objects where the property is changed, the new value will be used.
  
  // More practical application:
  
  console.log(Array.prototype.toString == Object.prototype.toString);
  // -> false
  console.log([1, 2].toString());
  // -> 1,2
  console.log(Object.prototype.toString.call([1, 2]));
  // -> [object Array]
  
  // Maps:
  
  // A data map is different than the .map array method. It is more similar to a dictionary in C# or Python. It is a collection of keys and values where you can obtain a reference value by its key.
  let ages;
  ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62,
  };
  
  console.log(`Julia is ${ages["Julia"]}`);
  // -> Julia is 62
  console.log("Is Jack's age known?", "Jack" in ages);
  // -> Is Jack's age known? false
  console.log("Is toString's age known?", "toString" in ages);
  // -> Is toString's age known? true
  
  // toString is not a listed name, but since it is a property of the Object prototype, it is still considered a key in the ages object and will return true when prompted.
  
  // For this reason, using plain objects as maps is not recommended. Using Object.create(null) will create an object with no prototype, which is a better option.
  
  console.log("toString" in Object.create(null));
  // -> false
  
  // The Map class
  
  ages = new Map();
  ages.set("Boris", 39);
  ages.set("Liang", 22);
  ages.set("Julia", 62);
  
  console.log(`Julia is ${ages.get("Julia")}`);
  // -> Julia is 62
  console.log("Is Jack's age known?", ages.has("Jack"));
  // -> Is Jack's age known? false
  console.log(ages.has("toString"));
  // -> false
  
  // hasOwn method:
  
  console.log(Object.hasOwn({ x: 1 }, "x"));
  // -> true
  console.log(Object.hasOwn({ x: 1 }, "toString"));
  // -> false
  
  // Polymorphism:
  
  // String function:
  //(overriding the toString method)
  Rabbit.prototype.toString = function () {
    return `a ${this.type} rabbit`;
  };
  
  console.log(String(blackRabbit));
  // -> a black rabbit
  
  // Array-like objects:
  
  Array.prototype.forEach.call(
    {
      length: 2,
      0: "a",
      1: "b",
    },
    (elt) => console.log(elt)
  );
  // -> a
  // -> b
  
  // Getters, setters, and statics:
  
  // Getters:
  
  let varyingSize = {
    get size() {
      return Math.floor(Math.random() * 100);
    },
  };
  
  console.log(varyingSize.size);
  // -> 73
  console.log(varyingSize.size);
  // -> 49
  
  // Setters:
  
  // The Temperature class allows you to read and write the temperature in either celcius or fahrenheit but only stores the temperature in celcius.
  class Temperature {
    constructor(celsius) {
      this.celsius = celsius;
    }
    // The get keyword is used to define a getter method that allows you to read the value of the temperature in fahrenheit
    get fahrenheit() {
      return this.celsius * 1.8 + 32;
    }
    // The set keyword is used to define a setter method that allows you to set the value of the temperature in fahrenheit
    set fahrenheit(value) {
      this.celsius = (value - 32) / 1.8;
    }
    // The static keyword is used to define a static method that is called on the class itself and not on an instance of the class
    static fromFahrenheit(value) {
      return new Temperature((value - 32) / 1.8);
    }
  }
  
  let temp = new Temperature(22);
  console.log(temp.fahrenheit);
  // -> 71.6
  temp.fahrenheit = 86;
  console.log(temp.celsius);
  // -> 30
  
  //using the static method:
  
  let boil = Temperature.fromFahrenheit(212);
  console.log(boil.celsius);
  // -> 100
  
  // Symbols:
  
  let sym = Symbol("name");
  console.log(sym == Symbol("name"));
  // -> false
  Rabbit.prototype[sym] = 55;
  console.log(blackRabbit[sym]);
  // actually returns undefined, but the book says it returns 55
  
  // Accessing the length method instead of the length symbol:
  
  const length = Symbol("length");
  Array.prototype[length] = 0;
  
  console.log([1, 2].length);
  // -> 2
  console.log([1, 2][length]);
  // -> 0
  
  let myTrip = {
    length: 2,
    0: "Lankwitz",
    1: "Babelsberg",
    [length]: 21500,
  };
  console.log(myTrip[length], myTrip.length);
  // -> 21500 2
  
  //This is similiar to using aliases in SQL. It allows you to use a different name for a property or method.
  
  // The Iterator Interface:
  
  let okIterator = "OK"[Symbol.iterator]();
  console.log(okIterator.next());
  // -> {value: "O", done: false}
  console.log(okIterator.next());
  // -> {value: "K", done: false}
  console.log(okIterator.next());
  // -> {value: undefined, done: true}
  
  class List {
    constructor(value, rest) {
      this.value = value;
      this.rest = rest;
    }
  
    get length() {
      return 1 + (this.rest ? this.rest.length : 0);
    }
  
    static fromArray(array) {
      let result = null;
      for (let i = array.length - 1; i >= 0; i--) {
        result = new this(array[i], result);
      }
      return result;
    }
  }
  
  class ListIterator {
    constructor(list) {
      this.list = list;
    }
  
    next() {
      if (this.list == null) {
        return { done: true };
      }
      let value = this.list.value;
    }
  }
  
  // List.prototype[Symbol.iterator] = function() {
  //   return new ListIterator(this);
  // }
  
  // let list = List.fromArray([1, 2, 3]);
  // for (let element of list) {
  //   console.log(element);
  // }
  // -> 1
  // -> 2
  // -> 3
  
  // TypeError: Iterator result undefined is not an object line 848
  
  // Inheritance:
  
  // List in this context represents a superclass and the class LengthList represents a subclass. The subclass inherits the properties and methods of the superclass.
  class LengthList extends List {
    // The list's length is stored in a private property
    #length;
    // The constructor then stores the list's length in the private property
    // The super keyword is used to call the constructor of the superclass
    constructor(value, rest) {
      super(value, rest);
      this.#length = super.length;
    }
    // The length method is used to return the length of the list
    get length() {
      return this.#length;
    }
  }
  console.log(LengthList.fromArray([1, 2, 3]).length);
  // -> 3
  
  // The instanceof operator:
  
  console.log(new LengthList(1, null) instanceof List);
  // -> true
  console.log(new LengthList(2, null) instanceof List);
  // -> true
  console.log(new List(3, null) instanceof LengthList);
  // -> false
  console.log([1] instanceof Array);
  // -> true
  
  // Definitions from Chapter 6:
  
  // Prototypes: When an object is created, it is given a prototype. This prototype is a reference to another object. If a property is not found in the object, the prototype is checked for the property. This process continues until the property is found or the prototype is null.
  
  // Classes: Classes are a way to create objects with similar properties and methods. They are a blueprint for creating objects. Classes can be used to create objects with the same properties and methods.
  
  // Methods: Methods are functions that are stored in an object. They can be called on the object and can access the object's properties.
  
  // Maps: Maps are a collection of key-value pairs. They are similar to dictionaries in other programming languages. Maps are a better option than using plain objects as maps because they do not have the prototype property.
  
  // Polymorphism: Polymorphism is the ability to use the same method on different objects. It allows objects of different classes to be treated as objects of the same class.
  
  // Getters, setters, and statics: Getters are used to get the value of a property. Setters are used to set the value of a property. Statics are used to define methods that are called on the class itself and not on an instance of the class.
  
  // Symbols: Symbols are a new primitive type in JavaScript. They are used to create unique identifiers for object properties. Symbols are used to create private properties and methods.
  
  // Constructors: Constructors are functions that are used to create objects. They are called when a new object is created. Constructors are used to set the initial state of an object.
  
  // Inheritance: Inheritance is the ability of a class to inherit properties and methods from another class. It allows classes to share common properties and methods. Inheritance is used to create subclasses that have the same properties and methods as the superclass.
  
  // Private Properties: Private properties are properties that are only accessible within the class that defines them. They are used to store data that should not be accessed or modified from outside the class.