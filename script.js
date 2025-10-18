function init() {
  renderDishes();
  renderBasketDishes();
}

function renderDishes(filteredCountry = "all") {
  let contentRef = document.getElementById("dish_container");
  contentRef.innerHTML = "";
  // länder sortieren
  let visibleDishes =
    filteredCountry === "all"
      ? dishes
      : dishes.filter((dish) => dish.country === filteredCountry);
  if (visibleDishes.length === 0) {
    contentRef.innerHTML = "<p>Keine Gerichte gefunden.</p>";
    return;
  }
  for (let indexDish = 0; indexDish < visibleDishes.length; indexDish++) {
    contentRef.innerHTML += getDishTemplateFromObject(visibleDishes[indexDish]);
  }
}

function addDishByName(name) {
  let product = dishes.find((d) => d.name === name);
  if (!product) return;

  let itemInCart = cart.find((item) => item.name === product.name);
  if (itemInCart) {
    itemInCart.amount++;
  } else {
    cart.push({ name: product.name, price: product.price, amount: 1 });
  }
  renderBasketDishes();
}

function filterDishes(country) {
  renderDishes(country);
}

function renderBasketDishes() {
  let dishesBasketRef = document.getElementById("basket");
  let subDishes = document.getElementById("sub_dishes");
  let subTotal = document.getElementById("sub_total");
  dishesBasketRef.innerHTML = "";
  subDishes.innerHTML = "";
  subTotal.innerHTML = "";
  let subtotal = 0;
  if (cart.length == 0) {
    dishesBasketRef.innerHTML = "<i>Warenkorb ist leer...</i>";
    return;
  }
  for (let i = 0; i < cart.length; i++) {
    dishesBasketRef.innerHTML += getBasketDishTemplate(i);
    subtotal += cart[i].price * cart[i].amount;
  }
  subDishes.innerText = formatPrice(subtotal);
  subTotal.innerText = formatPrice(subtotal + deliveryCost);
  updateBasketCount();
}

function addDishes(indexDish) {
  let product = dishes[indexDish];
  let itemInCart = cart.find(function (element) {
    return element.name === product.name;
  });
  if (itemInCart) {
    itemInCart.amount++;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      amount: 1,
    });
  }
  renderBasketDishes();
}

function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " €";
}

function increaseQuantity(index) {
  cart[index].amount++;
  renderBasketDishes();
}

function decreaseQuantity(index) {
  if (cart[index].amount > 1) {
    cart[index].amount--;
  } else {
    cart.splice(index, 1);
  }
  renderBasketDishes();
  updateBasketCount();
}

function toggleBasket() {
  let cartRef = document.getElementById("basket_wrapper");
  cartRef.classList.toggle("d_none");
}

function updateBasketCount() {
  let basketCount = document.getElementById("quantity_basket");
  let totalItems = 0;

  for (let i = 0; i < cart.length; i++) {
    totalItems += cart[i].amount;
  }

  basketCount.innerText = totalItems;
  if (totalItems === 0) {
    basketCount.style.display = "none";
  } else {
    basketCount.style.display = "flex";
  }
}

function deleteDish(index) {
  cart.splice(index, 1);
  renderBasketDishes();
  updateBasketCount();
}

function orderBtn() {
  let thankYou = document.getElementById("body_overlay");
  let container = document.getElementById("basket");
  let subDishes = document.getElementById("sub_dishes");
  let subTotal = document.getElementById("sub_total");
  let quantityBasket = document.getElementById("quantity_basket");
  if (!cart || cart.length === 0) {
    container.innerHTML = `<p class="empty_cart_text"> Dein Warenkorb ist leer!</p>`;
    return;
  }

  thankYou.classList.remove("d_none");
  setTimeout(() => {
    thankYou.classList.add("d_none");
    container.innerHTML = "";
    subDishes.innerHTML = "";
    subTotal.innerHTML = "";
    quantityBasket.innerHTML = "";

    if (typeof cart !== "undefined") {
      cart = [];
    }

    if (typeof updateBasketCount === "function") {
      updateBasketCount();
    }
  }, 3000);
}
