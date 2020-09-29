import data from './data.js'

const itemsContainer = document.getElementById('items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById("cart-total");
const cart = []

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

//Add Item
function addItem(name, price) {
    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            cart[i].qty += 1
            return
        }
    }

    const item = {name, price, qty: 1}
    cart.push(item)
}

//Show items
function showItems() {
    const qty = getQty()
    //console.log(`you have ${qty} items in your cart.`)
    cartQty.innerHTML = `you have ${qty} items in your cart.`
    
    let itemStr = ''
    for(let i = 0; i < cart.length; i += 1){
        //console.log(`-${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        const {name, price, qty} = cart[i]
        itemStr += `<li> ${name} $${price} x ${qty} = ${qty * price} </li>`
    }
    itemList.innerHTML = itemStr

    const total = getTotal();
    //console.log(`Total in cart: $${total}`)
    cartTotal.innerHTML = `Total in cart: $${total}`;
}

//Get Qty
function getQty(){
    let qty = 0;
    for (let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty;
    }
    return qty
}

//Get Total
function getTotal(){
    let total = 0;
    for (let i = 0; i < cart.length; i += 1) {
        total += cart[i].price * cart[i].qty;
    }
    return total.toFixed(2);
}

//Remove item
function removeItem(name, qty = 0){
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if(qty > 0){
                cart[i].qty -= qty  
            }
            if (cart[i].qty < 1 || qty === 0){
                cart.splice(i, 1)
            }
            return
        }
    }

}

addItem('Apple', 0.99)
addItem('Apple', 0.99)
addItem('Orange', 2.99)
showItems()
removeItem('Apple', 1)
removeItem('Orange')
showItems()