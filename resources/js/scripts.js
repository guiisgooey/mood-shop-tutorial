import data from './data.js'
const itemsContainer = document.getElementById('items')
// the length of our data determines how many times this loop goes around
data.forEach(function (data, index) {
    // create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    // create an image element
    let img = document.createElement('img');
    // this will change each time we go through the loop. Can you explain why?
    img.src = data.image
    img.width = 300
    img.height = 300
    newDiv.appendChild(img)

    let desc = document.createElement('P')

    desc.innerText = data.desc

    newDiv.appendChild(desc)

    let price = document.createElement('P')
    price.innerText = data.price
    newDiv.appendChild(price)
    
    let button = document.createElement('button')
    button.id = data.name
    button.dataset.price = data.price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)

    // put new div inside items container
    itemsContainer.appendChild(newDiv)
})

const cart = []

//Add Item
function addItem(name, price) {
    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            cart[i].qty ++
            return
        }
    }

    const item = {name, price, qty: 1}
    cart.push(item)
}

//Show items
function showItems() {
    const qty = getQty()
    console.log(`you have ${qty} items in your cart.`)
    
    for(let i = 0; i < cart.length; i++){
        console.log(`-${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
    }

    const total = getTotal();

    console.log(`Total in cart: $${total}`)
}

//Get Qty
function getQty(){
    let qty = 0;
    for (let i = 0; i < cart.length; i++) {
        qty += cart[i].qty;
    }
    return qty
}

//Get Total
function getTotal(){
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty;
    }
    return total.toFixed(2);
}

addItem('Apple', 0.99)
showItems()