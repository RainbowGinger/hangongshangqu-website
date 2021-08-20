let products=[
    {
    name:"tang dynasty costume1",
    tag:"tang/product1/tang1-1",
    price:69.99,
    inCart:0
    },
    {
    name:"tang dynasty costume1",
    tag:"tang/product2/tang2-1",
    price:59.99,
    inCart:0
    },
    {
    name:"tang dynasty costume1",
    tag:"tang/product3/tang3-1",
    price:49.99,
    inCart:0
    },
    {
    name:"tang dynasty costume1",
    tag:"tang/product4/tang4-1",
    price:89.99,
    inCart:0
    },
    {
    name:"tang dynasty costume1",
    tag:"tang/product5/tang5-1",
    price:59.99,
    inCart:0
    },
    {
    name:"tang dynasty costume1",
    tag:"tang/product6/tang6-1",
    price:69.99,
    inCart:0
    },
    {
    name:"tang dynasty costume1",
    tag:"tang/product6/tang6-1",
    price:79.99,
    inCart:0
    }

]

let carts=document.querySelectorAll('.add-to-cart');

for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
                        cartNumbers(products[i]);
                        totalCost(products[i]);
                        });
}
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('#shopping-cart-number').textContent = productNumbers;
    }
}


function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('#shopping-cart-number').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('#shopping-cart-number').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('#shopping-cart-number').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;

        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseFloat(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {

        cart = parseFloat(cart);
        localStorage.setItem("totalCost", cart + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }
}


function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseFloat(cart).toFixed(2);

    let productContainer = document.querySelector('.products');

    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( item => {
            productContainer.innerHTML +=
            `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="hangongshangqu/costume/${item.tag}.jpg" />
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">$${item.price}</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">$${(item.inCart * item.price).toFixed(2)}</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cart}</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();

            localStorage.setItem('cartNumbers', productNumbers - (cartItems[productName].inCart));
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();



function total(){
    document.querySelector('.form2 .subtotal').textContent=parseFloat(localStorage.getItem('totalCost')).toFixed(2);
    console.log(localStorage.getItem('totalCost'))
    document.querySelector('.form2 .tax').textContent=parseFloat(localStorage.getItem('totalCost')*0.1).toFixed(2);
    document.querySelector('.form2 .total').textContent=(parseFloat(document.querySelector('.subtotal ').textContent)+parseFloat(document.querySelector('.tax ').textContent)).toFixed(2);
}

total();