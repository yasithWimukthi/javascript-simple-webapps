const cartInfo = document.getElementById("cart-info");
const cart = document.getElementById("cart");
const cartBtn = document.querySelectorAll(".store-item-icon");
const total = document.querySelector(".cart-total-container");
const cartTotal = document.getElementById("cart-total");
const itemTotal = document.querySelector(".item-total");
const itemCount = document.getElementById("item-count");
const clearCartBtn = document.getElementById("clear-cart");

let finalTotalPrice = 0.00;
let numOfSelelectedItemns = 0;


                            // SHOW CART
cartInfo.addEventListener("click",()=>{
    cart.classList.toggle("show-cart");
});

                        // ADD ITEMS TO THE CART
cartBtn.forEach(button=>{
    button.addEventListener("click",e=>{
        if(e.target.parentElement.classList.contains("store-item-icon")){
            let path = (e.target.parentElement.previousElementSibling.src);
            let position = path.indexOf("img")+3;
            let pathPart = path.slice(position);
            let name = e.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
            let price =  e.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
            let finalPrice = price.slice(1).trim();

            const item = {};
            item.img = `img-cart${pathPart}`;
            item.name = name;
            item.price = finalPrice;

            // CREATE A CART ITEM
            const cartItem = document.createElement("div");
            cartItem.classList.add(
                "cart-item",
                "d-flex",
                "justify-content-between",
                "text-capitalize",
                "my-3"
            );

            cartItem.innerHTML = `
                <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                <div class="item-text">
                    <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                    <span>$</span>
                    <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                </div>
                <a href="#" id='cart-item-remove' class="cart-item-remove" onclick="removeItem(this)">
                    <i class="fas fa-trash"></i>
                </a>
            </div>
            `;

            cart.insertBefore(cartItem,total);
            alert("Item added to the cart");

            calculateTotal();
                 
        }

    });
});

const calculateTotal = ()=>{
    let totalPrice = 0.0;
    const prices = [];
    const cartItems = document.querySelectorAll(".cart-item-price");

    cartItems.forEach(item=>{
        prices.push(parseFloat(item.textContent));
    });

    for(price of prices){
        totalPrice += price;
    }

    finalTotalPrice = totalPrice.toFixed(2);

    cartTotal.textContent = finalTotalPrice;
    itemTotal.textContent = finalTotalPrice;
    itemCount.textContent = prices.length;

    
    
    numOfSelelectedItemns = prices.length;
};


                    // REMOVE ITEMS FROM THE CART

const removeItem = trashBin =>{
    let price = parseFloat(trashBin.previousElementSibling.querySelector(".cart-item-price").textContent);
    //console.log(price+ ","+finalTotalPrice);
    trashBin.parentElement.remove();
    finalTotalPrice -= price;
    numOfSelelectedItemns--;
    cartTotal.textContent = finalTotalPrice;
    itemTotal.textContent = finalTotalPrice;
    itemCount.textContent = numOfSelelectedItemns;

    
}


                // ADD AN EVENT LISTNER TO CLEAR CART BUTTON
clearCartBtn.addEventListener("click",()=>{
    const cartItems = Array.from(document.querySelectorAll(".cart-item"));
    console.log(cartItems);
    for(cartItem of cartItems){
        cartItem.remove();
    }

    finalTotalPrice = 0.00;
    numOfSelelectedItemns = 0;

    cartTotal.textContent = finalTotalPrice;
    itemTotal.textContent = finalTotalPrice;
    itemCount.textContent = numOfSelelectedItemns;

});
