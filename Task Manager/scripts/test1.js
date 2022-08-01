// constructor
function Dog(name, age, color){
    this.name = name;
    this.age = age;
    this.color = color;
}

// class
class Cat {
    constructor(name, age, color) {
        this.name = name;
        this.age = age;
        this.color = color;
    }
}

function testObjects(){
    console.log("Test Objects")

    // 1 - Object literal
    let lola ={
        name: "Lola",
        age: 3,
        color: "pink"
    };
    console.log(lola);

    // 2 - object constructor
    let dog3 = new Dog("Trex", 1, "Dark Green");
    console.log(dog3);

    let dog4 = new Dog("Timi", 4, "Dark Green");
    console.log(dog4);
}

// 3 - class
let cat1 = new Cat("pebbles", 5, "Orange");
console.log(cat1);

testObjects();