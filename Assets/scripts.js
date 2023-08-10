// scripts.js
$(document).ready(function() {

    function addToCartFunctionality() {
        const buyButtons = document.querySelectorAll('.buy-button');
        const cartItemsList = document.getElementById('cart-items');
        const cartList = document.getElementById('cart-list');
        const cartOverviews = document.querySelectorAll('.cart-overview'); //show number of items added to cart
        const closeCartButton = document.querySelector('.close-cart'); //close cart overview popup
        const productDataUrl = 'Config/products.json';
      
        // Fetch product data from JSON file
        async function fetchProductData() {
          try {
            const response = await fetch(productDataUrl);
            const data = await response.json();
            console.log('Product data fetched successfully!');
            return data;
          } catch (error) {
            console.error('Error fetching product data:', error);
            return {}; // Return an empty object if an error occurs
          }
        }
      
        buyButtons.forEach(button => {
          button.addEventListener('click', addToCart);
        });
      
        async function addToCart(event) {
          const productId = event.target.getAttribute('data-product-id');
          const productData = await fetchProductData();
          const productName = productData[productId]?.name || 'Unknown Product';
      
          // Get cart data from local storage or create an empty object
          var cartData = JSON.parse(localStorage.getItem('cart')) || {};
      
          // Increment the quantity of the product in the cart
          cartData[productId] = (cartData[productId] || 0) + 1;
      
          // Save the updated cart data back to local storage
          localStorage.setItem('cart', JSON.stringify(cartData));
      
          // Update the cart overview in the navigation bar
          updateCartOverview();

          updateCartUI()

        }



        async function updateCartUI() {
          const productData = await fetchProductData();
                    // Update the cart items in the cart list
                    var cartData = JSON.parse(localStorage.getItem('cart')) || {};
                    cartList.innerHTML = ''; // Clear previous cart items

                    // Initialize total subtotal
  let totalSubtotal = 0;
                
                    // Display cart items with quantity and remove option
                    for (const productId in cartData) {
                      const product = productData[productId];
                      const cartItem = document.createElement('li');
                      cartItem.classList.add('cart-item');
    
                      // Calculate and update the subtotal for the current item
    const subtotal = (cartData[productId] * product.price).toFixed(2);
    totalSubtotal += parseFloat(subtotal); // Accumulate the subtotal

                      cartItem.innerHTML = `
                      <div class="cart__image"><img src="${product.image}"></div>
                      <div class="cart__item-details">
                      <div class="name">${product.name}</div>
        
                      
        
                        <div class="actions">
                        <div>
                          <div class="js-qty__wrapper">
                            <label for="cart_updates_40656992108641:545eaa14d3615f715f77e14ed817bab9" class="hidden-label">Quantity</label>
                            <input type="text" id="cart_updates_40656992108641:545eaa14d3615f715f77e14ed817bab9" name="updates[]" class="js-qty__num" value="${cartData[productId]}" min="0" pattern="[0-9]*" data-id="40656992108641:545eaa14d3615f715f77e14ed817bab9">
                            <button type="button" class="js-qty__adjust js-qty__adjust--minus" aria-label="Reduce item quantity by one" data-id="${productId}">-</button>
                            <button type="button" class="js-qty__adjust js-qty__adjust--plus" aria-label="Increase item quantity by one" data-id="${productId}">+</button>
                          </div>
                  
                          <div class="cart__remove">
                            <a href="#" data-id="${productId}" class="text-link remove-cart-item">
                              Remove
                            </a>
                          </div>
                        </div>
                  
                        <div class="price"><span>$</span>${product.price}</div>
        
                        </div>
                      `;
        
                      // Attach event listeners for remove actions
                      const removeLink = cartItem.querySelector('.remove-cart-item');
              removeLink.addEventListener('click', (event) => {
                event.preventDefault();
                removeFromCart(`${productId}`);
              });

              // Attach event listeners for quantity adjustment
      const minusButton = cartItem.querySelector('.js-qty__adjust--minus');
      const plusButton = cartItem.querySelector('.js-qty__adjust--plus');
      minusButton.addEventListener('click', () => adjustQuantity(productId, -1));
      plusButton.addEventListener('click', () => adjustQuantity(productId, 1));

         
                     cartList.appendChild(cartItem);
                    }

                    // Update the UI to display the total subtotal
  const totalSubtotalElement = document.getElementById('cartSubtotal');
  totalSubtotalElement.textContent = `$${totalSubtotal.toFixed(2)}`;
                
                    // Show the cart items
                    cartItemsList.style.display = 'block';
      
        }
      
        function removeFromCart(productId) {
          const cartData = JSON.parse(localStorage.getItem('cart')) || {};
      
          // Remove the item from the cart data
          delete cartData[productId];
      
          // Save the updated cart data back to local storage
          localStorage.setItem('cart', JSON.stringify(cartData));
      
          // Update the UI to reflect the removal
          updateCartUI();
        }

        function adjustQuantity(productId, change) {
          const cartData = JSON.parse(localStorage.getItem('cart')) || {};
          const currentQuantity = cartData[productId] || 0;
      
          // Calculate the new quantity after adjustment
          const newQuantity = Math.max(0, currentQuantity + change);
      
          // Update the cart data with the new quantity
          cartData[productId] = newQuantity;

          if(newQuantity == 0){
            removeFromCart(productId);
            return;
          }
      
          // Save the updated cart data back to local storage
          localStorage.setItem('cart', JSON.stringify(cartData));
      
          // Update the UI to reflect the changes
          updateCartUI();

          // Update the cart overview in the navigation bar
          updateCartOverview();
        }




        function updateCartOverview() {
            const cartData = JSON.parse(localStorage.getItem('cart')) || {};
            let cartItemCount = 0;
        
            // Calculate the total number of items in the cart
            for (const productId in cartData) {
              cartItemCount += cartData[productId];
            }
        
            // Update the cart overview in the navigation bar
            cartOverviews.forEach(cartOverview => {
                cartOverview.textContent = `${cartItemCount}`;
              });
          }

          // Close the cart items list container when "x" button is clicked
  closeCartButton.addEventListener('click', () => {
    cartItemsList.style.display = 'none';
  });

        // Initial update of cart overview
        updateCartOverview();

        // Initial update of cart UI on cart page load
        // Check if the current URL contains "/cart"
if (window.location.href.includes('/cart')) {
  // Run the updateCartUI code here
  updateCartUI();
}

    }


    $('#navigation').load('Sections/navigation.html', function() {
        // This callback runs after the content is loaded
        // Add event listeners or other code that relies on the loaded content
        const hamburger = document.querySelector('.hamburger');
        const mainMenu = document.querySelector('.main-menu');

        if (hamburger && mainMenu) {
            hamburger.addEventListener('click', () => {
                mainMenu.classList.toggle('active');
            });
        }
    });
    $('#benefits').load('Sections/benefits.html');
    $('#hero').load('Sections/hero.html');
    $('#sitewideDeals').load('Sections/sitewideDeals.html');
    $('#vipExclusive').load('Sections/vipExclusive.html');
    $('#trending').load('Sections/trending.html');
    $('#newIn').load('Sections/newIn.html');
    $('#recentlyBought').load('Sections/recentlyBought.html', addToCartFunctionality);
    $('#insta').load('Sections/insta.html');
    $('#newsletter').load('Sections/newsletter.html');
    $('#footer').load('Sections/footer.html');

    /* cart template */
    $('#cartItemsDetails').load('/Sections/cart.html', addToCartFunctionality);
    
});
