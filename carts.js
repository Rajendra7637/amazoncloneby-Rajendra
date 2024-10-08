document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateTotalPrice() {
        const totalPrice = cart.reduce((sum, item) => sum + (item.quantity * parseFloat(item.price)), 0);
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function displayCart() {
        cartItemsList.innerHTML = ''; 

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<h2><b><li>Your Amazon Cart is empty</li><b><h2>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('li');
                cartItem.classList.add('cart-item');
                cartItem.setAttribute('data-id', item.id);
                cartItem.innerHTML = `
                 
                        <div>
                            <h4>${item.name}</h4>
                            <p>$${item.price} x ${item.quantity}</p>
                          
                        </div>
                    </div>
                    <button class="remove-from-cart" style="background-color: #ffa41c; 
                    color: #111; 
                    border: 1px solid #ffa41c; 
                    border-radius: 8px;
                    padding: 10px 20px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: normal;
                    text-transform: uppercase;
                    transition: background-color 0.3s ease;
                    margin-top: 10px;
                    display: inline-block;
                    text-decoration: none;">Remove</button>
                `;

                cartItemsList.appendChild(cartItem);

                cartItem.querySelector('.remove-from-cart').addEventListener('click', () => {
                    removeItemFromCart(item.id);
                    cartItem.remove();
                    updateTotalPrice();
                    if (cart.length === 0) {
                        cartItemsList.innerHTML = '<h2><b><li>Your Amazon Cart is empty</li><b><h2>';
                    }
                });
            });
        }

        updateTotalPrice();
    }

    function removeItemFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    displayCart();
});

