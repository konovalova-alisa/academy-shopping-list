const shoppingList = [];


// 1. the functions:

// sorts the price (a = show the highest fist / b = show the lowest price first) ----> oisko jotain elegantimpaa tapaa?
function sortList (shoppingList, sortOrdA = -1, sortOrdB = 1) {
    shoppingList.sort(function (a, b) {
        if (a.price > b.price) {
            return sortOrdA;
        } else if (b.price > a.price) {
            return sortOrdB;
        } else {
            return 0;
        }
    })
}

// sums up the total price 
function sumUp () {
    let total = 0;
    shoppingList.forEach(function (product) {
        total += product.price;
    })
    return total;
}

// renders total price
function renderTotal (sortOrdA, sortOrdB) {
    // we want to "push" total to html
    let total = document.querySelector("#total-price");
    total.innerHTML = `${sumUp()} €`;
}


//remove an item (this should be added as a functionality when adding each product.. at the moment not working completely; if the input is something other than text)

const removeItem = function (productName) {
    const index = shoppingList.findIndex(function (product) {
        return product.name.toLowerCase() === productName.toLowerCase()
    })
    if (index > -1) {
        shoppingList.splice(index, 1)
        document.querySelector(`#${productName}`).remove();
            //change this: 

        sumUp()
        renderTotal()
    }
}


//render the list in chosen order



const renderList = function  (sortOrdA, sortOrdB) {
    document.querySelector('#list-items').innerHTML = "";
    sortList(shoppingList, sortOrdA, sortOrdB) 
    shoppingList.forEach(function (product) {
        let listItem = document.createElement("li")
        listItem.id = `${product.name}`
        listItem.innerHTML = `<span class="product">${product.name}</span> -  <span class="price">${product.price} €</span></span>`
        document.querySelector("#list-items").appendChild(listItem)
        document.getElementById(`${product.name}`).addEventListener("click", function () {
            removeItem(product.name);
        });
        sumUp();
        renderTotal();
        });
};

// 2. the eventListeners 

//create an item from user input

document.querySelector('#enter-item').addEventListener("submit", function (e) {
    e.preventDefault(),
    name = e.target.elements.productName.value
    price = Number(e.target.elements.productPrice.value)
    if (name !== "" && price !== "") {
        shoppingList.push({ name: name, price: price })
        e.target.elements.productName.value = ""
        e.target.elements.productPrice.value = ""
    } else {
        alert ("Not a valid name and/or price, please try again.")
    };
    renderList();
})

//sorting the list according to user's wish

sortOrder = document.getElementsByName('order')  
sortOrder.forEach(function (par) {
    par.addEventListener("change", function (e) {
        let sortOrder = e.target.value
        if (sortOrder === "hight-to-low") {
            sortOrdA = -1
            sortOrdB = 1
        } else if (sortOrder === "low-to-high") {
            sortOrdA = 1
            sortOrdB = -1
        }
        renderList(sortOrdA, sortOrdB)
    })
    
    
})

document.querySelector('#remove-all-items').addEventListener("click", function (e) {
    
    location.reload();
})