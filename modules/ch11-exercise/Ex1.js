// 11.1 Proxy with pre-initialization queues: Using a JavaScript Proxy, create a
// wrapper for adding pre-initialization queues to any object. You should allow
// the consumer of the wrapper to decide which methods to augment and the
// name of the property/event that indicates if the component is initialized.

function PreInitWrapper(obj, augmented, init_prop) {
  let is_initialized = false;
  let queue = [];

  return new Proxy(obj, {
    get(target, prop) {
      if (prop === init_prop) {
        return (...args) => {
          const init_res = target[prop](...args);
          is_initialized = true;
          for (const prop of queue) {
            target[prop.name].apply(target, prop.args);
          }
          return init_res;
        };
      }

      if (augmented.has(prop) && !is_initialized) {
        return (...args) => {
          queue.push({
            name: prop,
            args,
          });
          return;
        };
      }

      return (...args) => target[prop].apply(target, args);
    },
  });
}

// Example of usage

class Animal {
  printName() {
    console.log(this.name);
  }

  printAge() {
    console.log(this.age);
  }

  printHello() {
    console.log("hello !");
  }

  init(name, age) {
    console.log("initializing ...", name, age);
    this.name = name;
    this.age = age;
  }
}

const animal = new Animal();
const augmented = new Set(["printName", "printAge"]);
const proxiedAnimal = PreInitWrapper(animal, augmented, "init");

proxiedAnimal.printName();
proxiedAnimal.printHello();
proxiedAnimal.printAge();

proxiedAnimal.init("cat", 5);
