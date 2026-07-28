// script.js
document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { 
        id: 1, 
        name: "product 1", 
        image: "image/photo_1.jpeg", 
        price: 29.99 
    },
    {
      id: 2,
      name: "product 2",
      image: "image/photo_2.jpeg",
      price: 19.99,
    },
    {
      id: 3,
      name: "product 3",
      image: "image/photo_3.jpeg",
      price: 59.999,
    },
  ];

  const cart = [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-item");
  const emptyCartmessage = document.getElementById("empty-cart");
  const cartTotalmessage = document.getElementById("cart-total");
  const totalPricedisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  // add product using for loop.....
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-img">

    <h3>${product.name}</h3>

    <p>$${product.price.toFixed(2)}</p>

    <button data-id="${product.id}">
        Add to Cart
    </button>
`;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart(cart);
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartmessage.classList.add("hidden");
      cartTotalmessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="cart-img">

    <div class="cart-details">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
    </div>

    <button class="remove-btn" data-index="${index}">
        Remove
    </button>
`;

        cartItems.appendChild(cartItem);
      });

      totalPricedisplay.textContent = totalPrice.toFixed(2);
    } else {
      emptyCartmessage.classList.remove("hidden");
      cartTotalmessage.classList.add("hidden");
      totalPricedisplay.textContent = "0.00";
    }
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("checkout successfully");
    renderCart();
  });

  // add remove option..............
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      renderCart();
    }
  });
});
