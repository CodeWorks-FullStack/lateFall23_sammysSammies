console.log('is it linked?')

// SECTION objects and array references
// #region

const person = {
    name: 'Billy',
    age: 99,
    favoriteFood: 'sandwiches',
    height: "4'2",
    likesDogs: true,
    favoriteColors: ['green', 'purple', 'red', 'turquoise']
}

person.age = 33 // reassigns value

// person = 6 // this will not work because person is a const. We may reassign values as seen on line 12, but we cannot change its data type: person must remain an object

const referenceToPerson = person // creating a new reference will still point to the orig. reference in mermory

referenceToPerson.age = 66

const copyPerson = { ...person } // we copy the original but break the reference to orig. place in memory

copyPerson.age = 44

const personStringConcat = "My name is" + " " + person.name + "and I am" + " " + person.age + " " + "years old."

const personStringInterpolate = `My name is ${person.name} and I am ${person.age} years old`


const catsArr = [
    {
        name: 'Bean',
        age: 6,
        likesCheese: true
    },
    {
        name: 'George',
        age: 2,
        likesCheese: false
    },
    {
        name: 'Paul',
        age: 11,
        likesCheese: true
    },
    {
        name: 'Noodles',
        age: 5,
        likesCheese: false
    },
    {
        name: 'Susan',
        age: 17,
        likesCheese: true
    }
]

for (let i = 0; i < catsArr.length; i++) {
    let cat = catsArr[i] // aliasing out ea. index
    // console.log(catsArr[i].name)
    console.log(cat.name)
}

catsArr.forEach(cat => console.log(cat.name))  // fancy for loop

catsArr.forEach(cat => {
    console.log(cat.name)
    console.log(cat.age)
})
// NOTE this forEach operates no differently than the two above, breaking into a new code block allows us to write multiple lines w/in our anonymous function

function sayHello() {
    console.log('hello')
}

catsArr.forEach(cat => sayHello()) // => (lambda) creates or indicates an anononymous function, we alias out the variable with cat and intend to run a set of instructions

catsArr.forEach(sayHello) // think of functions as a set of instructions... here we are passing in the 'instructions' from the sayHello function and telling it to run for the length of the arr
// NOTE ^^ this is referred to as a callback function

let foundCat = catsArr.find(cat => cat.likesCheese == true) // find iterates through arr and FINDS the index matches based on condition; only returns ONE index and will be the first that matches condition

let filteredCats = catsArr.filter(cat => cat.likesCheese == false) // filter iterates through arr and returns a new array based upon condition

// #endregion


// SECTION Application Code

const sandwichesArr = [
    {
        name: 'caprese',
        price: 11,
        quantity: 0
    },
    {
        name: 'blt',
        price: 12,
        quantity: 0
    },
    {
        name: 'club sandwich',
        price: 11,
        quantity: 0
    },
    {
        name: 'monte cristo',
        price: 15,
        quantity: 0
    }
]

function buyCaprese() {
    console.log('buying caprese')
    // find the sandwich that we want to buy
    // after finding sandwich, increase its quantity
    let foundSandwich = sandwichesArr[0]
    console.log(foundSandwich)
    foundSandwich.quantity++
    console.log(foundSandwich)


    // updates the DOM... this was abstracted into its own 'updateCart() function'
    // document.getElementById('cart').innerHTML = `  <div class="d-flex justify-content-between p-2">
    //                     <span>${foundSandwich.name}</span>
    //                     <span>x${foundSandwich.quantity}</span>
    //                     <span>${foundSandwich.price}</span>
    //                 </div>`

    updateCart()
}

function buyBLT() {
    // find the sandwich we want to buy
    // increase its quantity
    console.log('buy blt')
    let foundSandwich = sandwichesArr.find(sandwich => sandwich.name == 'blt')
    console.log(foundSandwich);
    foundSandwich.quantity++
    console.log(foundSandwich);
}

// REFACTORED buy function from the above two ^^
function buySandwich(sandwichName) {

    console.log('buying sandwich', sandwichName)
    let foundSandwich = sandwichesArr.find(sandwich => sandwich.name == sandwichName)
    console.log(foundSandwich)
    foundSandwich.quantity++

    updateCart()
}


function removeSandwich(sandwichName) {
    console.log('removing', sandwichName)
    // debugger
    // TODO find what sandwich do I want to delete?
    // TODO decrease the sandwich quantity by 1
    // TODO update DOM
    let foundSandwich = sandwichesArr.find(sandwich => sandwich.name == sandwichName)
    console.log(foundSandwich)
    foundSandwich.quantity--
    console.log(foundSandwich)
    updateCart()
}


function updateCart() {
    // check for all the bought sandwiches
    // look at all of the sandwiches and if they have a quantity > 0 add to the cart
    // "adding to the cart": draw them to the page/update DOM

    let template = '' //NOTE anytime we have a 'placeholder' or 'total' that we want to inject into from a for loop, make sure it is declared OUTSIDE of the loop 

    sandwichesArr.forEach(sandwich => {
        if (sandwich.quantity > 0) {
            template += `  <div class="d-flex justify-content-between align-items-baseline p-2">
                        <span>${sandwich.name}</span>
                        <span>x${sandwich.quantity}</span>
                        <span>${sandwich.price}</span>
                        <button onclick="removeSandwich('${sandwich.name}')" class="text-danger btn" title="Remove sandwich"><i class="mdi mdi-delete"></i></button>
                    </div>`
        }
    })
    console.log(template)
    document.getElementById('cart').innerHTML = template
    updateTotal()
}

function updateTotal() {
    // DRAWING TOTAL

    // TODO look at all the sandwiches
    //  TODO for all the sandwiches w quant > 0, figure out the total price
    // TODO mulitply sandwich quant and price
    // TODO add to the total
    let total = 0

    sandwichesArr.forEach(sandwich => {
        if (sandwich.quantity > 0) {
            total += sandwich.quantity * sandwich.price
        }
    })
    console.log(total, 'total')
    document.getElementById('total').innerText = total.toString()
}

