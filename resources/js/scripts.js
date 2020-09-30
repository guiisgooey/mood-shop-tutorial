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

const all_items_button = Array.from(document.querySelectorAll("button"))
all_items_button.forEach((elt) =>
  elt.addEventListener("click", () => {
    addItem(elt.getAttribute("id"), elt.getAttribute("data-price"))
    showItems()
  })
)

//function called on all button clicks: remove, +, -
itemList.onclick = function (e) {
  console.log("Clicked List")
  if (e.target && e.target.classList.contains("remove")) {
    const name = e.target.dataset.name
    removeItem(name);
  }
  else if (e.target && e.target.classList.contains("add-one")) {
    const name = e.target.dataset.name
    const price = e.target.dataset.price
    addItem(name, price);
  }
  else if (e.target && e.target.classList.contains("remove-one")) {
    const name = e.target.dataset.name
    removeItem(name, 1);
  }

}

//function to be called when any changes happen to itemlist
itemList.onchange = function(e){
    if(e.target && e.target.classList.contains('update')){
        const name = e.target.getAttribute('name');
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}

//Add Item
function addItem(name, price) {
    console.log("called addItem")
    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            cart[i].qty++
            showItems()
            return
        }
    }

    const item = {name, price, qty: 1}
    cart.push(item)
    showItems()
}

//Show items
function showItems() {
    console.log("called showItems")
    const qty = getQty()
    //console.log(`you have ${qty} items in your cart.`)
    cartQty.innerHTML = `you have ${qty} items in your cart.`
    
    let itemStr = ''
    for(let i = 0; i < cart.length; i++){
        //console.log(`-${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        const {name, price, qty} = cart[i]

        itemStr += `<li> 
        ${name} $${price} x ${qty} = ${qty * price}
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}">+</button>
        <button class="remove-one" data-name="${name}">-</button>
        <input class="update" type="number" name="${name}">
        </li>`
    }
    itemList.innerHTML = itemStr

    const total = getTotal()
    //console.log(`Total in cart: $${total}`)
    cartTotal.innerHTML = `Total in cart: $${total}`
}

//Get Qty
function getQty(){
    let qty = 0;
    for (let i = 0; i < cart.length; i++) {
        qty += cart[i].qty
    }
    return qty
}

//Get Total
function getTotal(){
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

//Remove item
function removeItem(name, qty = 0){
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if(qty > 0){
                cart[i].qty -= qty
            }
            if (cart[i].qty < 1 || qty === 0){
                cart.splice(i, 1)
            }
            showItems();
            return;
        }
    }
}

function updateCart(name, qty){
    for (let i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            if(qty<1){
               removeItem(name, qty)
               return 
            }
            cart[i].qty = qty
            showItems()
            return

        }
    }
}