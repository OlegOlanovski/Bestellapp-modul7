function getDishTemplateFromObject(dish) {
  return `
      <div class="dish_box">
        <h2>${dish.name}</h2>
        <div class="dish_description">
          <div class="dish_img">
            <img src="${dish.image}">
          </div>
          <h3>${dish.description}</h3>
          <p>${formatPrice(dish.price)}</p>
          <img onclick="addDishByName('${
            dish.name
          }')" class="add_btn" src="./Favicon/add_button.png" alt="add">
        </div>
      </div>
    `;
}
function getDishTemplate(indexDish) {
  return `
      <div class="dish_box">
       <h2>${dishes[indexDish].name}</h2> 
       <div class="dish_description">
       <div class="dish_img">
       <img src="${dishes[indexDish].image}">
       </div>
      
       <h3>${dishes[indexDish].description}</h3>
  
       <p>${formatPrice(dishes[indexDish].price)}<p>
       
        <img onclick="addDishes(${indexDish})" class="add_btn" src="./Favicon/add_button.png" alt="add">
       
       </div>
         
      </div>
      `;
}

function getBasketDishTemplate(indexDish) {
  return `
       
      <div class="basket_item">
        <h2>${cart[indexDish].name}</h2>
        <h3>${formatPrice(cart[indexDish].price * cart[indexDish].amount)}</h3>
        <div class="cart_control">
         <div class="set_quantity">
            <button class="btn-cart-item-controls" onclick="decreaseQuantity(${indexDish})">&minus;</button>
         <span>Menge: ${cart[indexDish].amount}</span>
            <button class="btn-cart-item-controls" onclick="increaseQuantity(${indexDish})">+</button>
           <img onclick="deleteDish(${indexDish})" src="./Favicon/trash.png" class="trash_icon">
         </div>
         
        </div>
        
      </div> 
        
    `;
}
